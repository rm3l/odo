package helper

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/redhat-developer/odo/pkg/podman"
)

func getPodmanDir(configDir string) string {
	return filepath.Join(configDir, "podman")
}

func beforeEachPodmanTest(configDir string) {
	podmanDir := getPodmanDir(configDir)
	rootDir := filepath.Join(podmanDir, "root")
	runrootDir := filepath.Join(podmanDir, "run")
	tmpDir := filepath.Join(podmanDir, "tmp")
	for _, d := range []string{rootDir, runrootDir, tmpDir} {
		MakeDir(d)
	}

	extraArgs := []string{
		//// Storage root dir in which data, including images, is stored
		//// (default: “/var/lib/containers/storage” for UID 0, “$HOME/.local/share/containers/storage” for other users).
		//"--root=" + rootDir,

		// Storage state directory where all state information is stored
		// (default: “/run/containers/storage” for UID 0, “/run/user/$UID/run” for other users).
		"--runroot=" + runrootDir,

		// Path to the tmp directory, for libpod runtime content. Defaults to $XDG_RUNTIME_DIR/libpod/tmp as rootless and /run/libpod/tmp as rootful.
		// NOTE --tmpdir is not used for the temporary storage of downloaded images.
		"--tmpdir=" + tmpDir,
	}
	//podmanVersion := GetPodmanVersion()
	//podmanSemVer, err := semver.Make(podmanVersion)
	//if err == nil {
	//	versionWithTransientStore, err2 := semver.Make("4.5.0")
	//	if err2 == nil && podmanSemVer.GE(versionWithTransientStore) {
	//		volumeDir := filepath.Join(podmanDir, "vol")
	//		MakeDir(volumeDir)
	//
	//		extraArgs = append(extraArgs,
	//			// Enables a global transient storage mode where all container metadata is stored on non-persistent media
	//			// (i.e. in the location specified by --runroot).
	//			// This mode allows starting containers faster, as well as guaranteeing a fresh state on boot
	//			// in case of unclean shutdowns or other problems.
	//			// However it is not compatible with a traditional model where containers persist across reboots.
	//			// unknown flag on Podman v3
	//			"--transient-store=true",
	//
	//			// Volume directory where builtin volume information is stored
	//			// (default: “/var/lib/containers/storage/volumes” for UID 0, “$HOME/.local/share/containers/storage/volumes” for other users).
	//			// Does not seem to work with Podman v3 (or play kube command?)
	//			"--volumepath="+volumeDir,
	//		)
	//	}
	//}

	Expect(os.Setenv("ODO_CONTAINER_BACKEND_GLOBAL_ARGS", strings.Join(extraArgs, ";"))).ShouldNot(HaveOccurred())
}

// GetPodmanRootExtraArgs returns the extra flags to pass to Podman.
// Make sure this is called after common.BeforeEach()
func GetPodmanRootExtraArgs() []string {
	env, present := os.LookupEnv("ODO_CONTAINER_BACKEND_GLOBAL_ARGS")
	Expect(present).To(BeTrue(),
		"env var ODO_CONTAINER_BACKEND_GLOBAL_ARGS not found => make sure commonVar.BeforeEach was called before and that this test has the podman label")
	return strings.Split(env, ";")
}

// afterEachPodmanTest removes everything from Podman: this includes containers, volumes, images, and all storage created by Podman.
// /!\ This is intended to help remove the test directory (which also contains resources created via beforeEachPodmanTest);
// otherwise, the folders referenced in the storage.conf file (and managed by Podman) cannot be deleted by the current user.
func afterEachPodmanTest(configDir string) {
	// Initially wanted to use "podman --root=... --runroot=... system reset", but for some reason, this causes issues with other tests
	podmanDir := getPodmanDir(configDir)
	if _, err := os.Stat(podmanDir); os.IsNotExist(err) {
		fmt.Fprintf(GinkgoWriter, "[warn] Podman config directory not found at path %q\n", podmanDir)
		return
	}
	cmd := exec.Command("podman", "unshare", "rm", "-rf", podmanDir)
	fmt.Fprintln(GinkgoWriter, "Running command:", cmd.Args)
	out, err := cmd.Output()
	if err != nil {
		if exiterr, ok := err.(*exec.ExitError); ok {
			err = fmt.Errorf("%s: %s\n%s", err, string(exiterr.Stderr), string(out))
		}
		fmt.Fprintf(GinkgoWriter, "[warn] Error while trying to remove podman dir %q: %v.\n"+
			"You might need to remove it yourself by running %q\n%s", podmanDir, err.Error(), strings.Join(cmd.Args, " "), string(out))
		return
	}
	fmt.Fprintf(GinkgoWriter, "output of command '%v': %s\n", cmd, string(out))
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
