package helper

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"

	. "github.com/onsi/gomega"

	"github.com/redhat-developer/odo/pkg/podman"
)

func generateAndSetContainersConf(dir string) {

	podmanDir := filepath.Join(dir, "podman")
	containersStorageDir := filepath.Join(podmanDir, "storage")
	runrootDir := filepath.Join(containersStorageDir, "runroot")
	graphrootDir := filepath.Join(containersStorageDir, "graphroot")
	rootlessDir := filepath.Join(containersStorageDir, "rootless")
	var imagestoreDir string
	userCacheDir, err := os.UserCacheDir()
	if err != nil {
		// Default to a dir in our custom containersStorageDir
		fmt.Fprintln(GinkgoWriter, "[warn]", err)
		imagestoreDir = filepath.Join(containersStorageDir, "imagestore")
	} else {
		// Shared path so tests could share images (resulting in faster pulls)
		imagestoreDir = filepath.Join(userCacheDir, "odo", "podman-integration-tests", "images")
	}
	for _, d := range []string{runrootDir, graphrootDir, imagestoreDir, rootlessDir} {
		MakeDir(d)
	}

	containersStorageConfPath := filepath.Join(podmanDir, "storage.conf")
	err = CreateFileWithContent(containersStorageConfPath, fmt.Sprintf(`
# See man 5 containers-storage.conf or https://github.com/containers/storage/blob/main/docs/containers-storage.conf.5.md for more information

[storage]
driver="overlay"

## Default directory to store all temporary writable content created by container storage programs.
runroot=%q

# Primary Read/Write location of container storage
graphroot=%q

# Storage path for rootless users
rootless_storage_path=%q

## /!\ Commented out because it is new, since Podman > v4.5.0
## Path of imagestore different from graphroot, by default storage library stores all images in graphroot
## but if imagestore is provided it will store newly pulled images in provided imagestore but will keep using 
## graphroot for everything else.
## Same value so that all tests can share images pulled.
# imagestore=%q

# Transient store mode makes all container metadata be saved in temporary storage (i.e. runroot above).
# This is faster, but doesn't persist across reboots.
# Additional garbage collection must also be performed at boot-time, so this option should remain disabled in most configurations. (default: false).
# Commented because of an error: Failed to decode the keys [\"storage.transient_store\"]
# transient_store=true

[storage.options.overlay]

# ignore_chown_errors can be set to allow a non privileged user running with a single UID within a user namespace
# to run containers. The user can pull and use any image, even those with multiple uids.
# Note multiple UIDs will be squashed down to the default uid in the container.
ignore_chown_errors="true"

`, runrootDir, graphrootDir, rootlessDir, imagestoreDir))
	Expect(err).ShouldNot(HaveOccurred())
	os.Setenv("CONTAINERS_STORAGE_CONF", containersStorageConfPath)
}

// ExtractK8sAndOcComponentsFromOutputOnPodman extracts the list of Kubernetes and OpenShift components from the "odo" output on Podman.
func ExtractK8sAndOcComponentsFromOutputOnPodman(out string) []string {
	lines, err := ExtractLines(out)
	Expect(err).ShouldNot(HaveOccurred())

	var handled []string
	// Example lines to match:
	// ⚠ Kubernetes components are not supported on Podman. Skipping: k8s-deploybydefault-true-and-referenced, k8s-deploybydefault-true-and-not-referenced.
	// ⚠ OpenShift components are not supported on Podman. Skipping: ocp-deploybydefault-true-and-referenced.
	// ⚠  Apply OpenShift components are not supported on Podman. Skipping: k8s-deploybydefault-true-and-referenced.
	// ⚠  Apply OpenShift components are not supported on Podman. Skipping: k8s-deploybydefault-true-and-referenced.
	re := regexp.MustCompile(`(?:Kubernetes|OpenShift) components are not supported on Podman\.\s*Skipping:\s*([^\n]+)\.`)
	for _, l := range lines {
		matches := re.FindStringSubmatch(l)
		if len(matches) > 1 {
			handled = append(handled, strings.Split(matches[1], ", ")...)
		}
	}

	return handled
}

// Returns version of installed podman
func GetPodmanVersion() string {
	cmd := exec.Command("podman", "version", "--format", "json")
	out, err := cmd.Output()
	Expect(err).ToNot(HaveOccurred(), func() string {
		if exiterr, ok := err.(*exec.ExitError); ok {
			err = fmt.Errorf("%s: %s", err, string(exiterr.Stderr))
		}
		return err.Error()
	})
	var result podman.SystemVersionReport
	err = json.Unmarshal(out, &result)
	Expect(err).ToNot(HaveOccurred())
	return result.Client.Version
}
