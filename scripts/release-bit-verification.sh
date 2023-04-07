#!/bin/bash

set -euo pipefail

############################################################################
#  PREREQUISITES FOR THIS SCRIPT
# 0. Download redistributable RPM file from the Errata Builds tab
# 1. Redistributable-binary(.rpm) should be passed as the first argument
# 2. Login to the cluster should be done prior to running this script
# 3. The cluster should be in a state where it can be used for testing
#   3.1. For example, you might need to run ./scripts/configure-cluster/common/setup-operators.sh to install the Operators (like SBO) for the tests
#
# USAGE:
# ./release-bit-verification.sh redistributable-binary
#
# Example: ./release-bit-verification.sh ~/Downloads/odo-redistributable-2.4.3-1.el8.x86_64.rpm
#

shout() {
  echo
  echo "--------------------------------${1:-}------------------------------------------"
  echo
}

uname_os() {
  os=$(uname -s | tr '[:upper:]' '[:lower:]')
  case "$os" in
  msys* | cygwin* | mingw*)
    os='windows'
    ;;
  esac
  echo "$os"
}

uname_arch() {
  arch=$(uname -m)
  case $arch in
  x86_64) arch="amd64" ;;
  aarch64) arch="arm64" ;;
  esac
  echo "$arch"
}

RPM="${1:-}"
[ -n "${RPM}" ] || (echo "Missing path to the redistributable RPM to verify. You can download it from the Errata Builds tab."; exit 1)

# Check SHASUM for all the binary files and there should be no difference

# Create a Temp directory
WORKING_DIR="$(mktemp -d)"
shout "WORKING_DIR=$WORKING_DIR"
export REPO_URL=${REPO_URL:-"https://github.com/redhat-developer/odo.git"}

# Extract from rpm file
rpm2cpio "$RPM" | cpio -idmvD "$WORKING_DIR"
pushd "$WORKING_DIR"/usr/share/odo-redistributable/

# Check sha256sum for all the files
while IFS= read -r line; do
    read -r SHA FILE <<<"$line"
    read -r SHATOCHECK FILE <<<"$(sha256sum "$FILE")"
    if [[ $SHA == "$SHATOCHECK" ]]; then
        # Print if the file is correct
        printf '%-50s\U0002705\n' $FILE
    fi
done <SHA256_SUM

shout

os="$(uname_os)"
if [[ "$os" == "windows" ]]; then
  echo "Not supported on Windows"
  exit 1
fi
arch="$(uname_arch)"
ODO_BINARY="$(pwd)/odo-${os}-${arch}"
[ -f "$ODO_BINARY" ] || (echo "Binary $ODO_BINARY not found for platform $os $arch" && exit 1)
# Copy binary for testing purposes
cp "$ODO_BINARY" "$(pwd)/odo"
PATH="$(pwd):$PATH"
export PATH

# Use a dedicated preferences file
export GLOBALODOCONFIG="$WORKING_DIR/preferences.yaml"
export ODO_TRACKING_CONSENT="no"

# Use a stable odo registry for testing
export DEVFILE_REGISTRY="https://devfile-registry-ci-devfile-registry.odo-test-kubernetes-clust-49529fc6e6a4a9fe7ebba9a3db5b55c4-0000.eu-de.containers.appdomain.cloud"

shout "Checking version"
odo version

# Check odo version and if it is correct
VERSION=$(cat VERSION)
# Clone repo for testing and checkout release tag.
# Needed to check the Git commit ID and run the tests.
pushd $WORKING_DIR
if [ -d "odo" ]; then
    rm -rf odo
fi
git -c advice.detachedHead=false clone --quiet --depth=1 -b "v$VERSION" "$REPO_URL" odo
pushd "$WORKING_DIR/odo"

ODOVERSIONCHECK=$(odo version --client)
GIT_SHA_SHORT="$(git rev-parse --short HEAD)"
EXPECTED_VERSION_WITH_SHA="v$VERSION ($GIT_SHA_SHORT"
if [[ "${ODOVERSIONCHECK#"odo "}" == "$EXPECTED_VERSION_WITH_SHA"* ]]; then
    echo "odo binary is installed correctly"
else
    echo "Version mismatch. Got ${ODOVERSIONCHECK#"odo "} from the redistributable RPM, but expected $EXPECTED_VERSION_WITH_SHA."
    exit 1
fi

# Run only E2E tests
make test-e2e

# Cleanup
popd
popd
popd
rm -rf "$WORKING_DIR"
