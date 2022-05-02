package devfile

import (
	"fmt"
	"path/filepath"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"github.com/redhat-developer/odo/tests/helper"
)

var _ = Describe("odo devfile build-images command tests", func() {

	var commonVar helper.CommonVar

	var _ = BeforeEach(func() {
		commonVar = helper.CommonBeforeEach()
		helper.Chdir(commonVar.Context)
	})

	// This is run after every Spec (It)
	var _ = AfterEach(func() {
		helper.CommonAfterEach(commonVar)
	})

	When("using a devfile.yaml containing an Image component", func() {

		BeforeEach(func() {
			helper.CopyExample(filepath.Join("source", "nodejs"), commonVar.Context)
			helper.Cmd("odo", "init", "--name", "aname", "--devfile-path", helper.GetExamplePath("source", "devfiles", "nodejs", "devfile-outerloop.yaml")).ShouldPass()
			helper.CreateLocalEnv(commonVar.Context, "aname", commonVar.Project)
		})
		It("should run odo build-images without push", func() {
			stdout := helper.Cmd("odo", "build-images").AddEnv("PODMAN_CMD=echo").ShouldPass().Out()
			Expect(stdout).To(ContainSubstring("build -t quay.io/unknown-account/myimage -f " + filepath.Join(commonVar.Context, "Dockerfile ") + commonVar.Context))
		})

		It("should run odo build-images --push", func() {
			stdout := helper.Cmd("odo", "build-images", "--push").AddEnv("PODMAN_CMD=echo").ShouldPass().Out()
			Expect(stdout).To(ContainSubstring("build -t quay.io/unknown-account/myimage -f " + filepath.Join(commonVar.Context, "Dockerfile ") + commonVar.Context))
			Expect(stdout).To(ContainSubstring("push quay.io/unknown-account/myimage"))
		})
	})

	When("using a devfile.yaml with no Image component", func() {
		BeforeEach(func() {
			helper.CopyExample(filepath.Join("source", "nodejs"), commonVar.Context)
			helper.Cmd("odo", "init", "--name", "aname",
				"--devfile-path",
				helper.GetExamplePath("source", "devfiles", "nodejs", "devfile.yaml")).ShouldPass()
			helper.CreateLocalEnv(commonVar.Context, "aname", commonVar.Project)
		})
		It("should not be able to run odo build-images", func() {
			stdout, stderr := helper.Cmd("odo", "build-images").AddEnv("PODMAN_CMD=echo").ShouldFail().OutAndErr()
			// Make sure no "{podman,docker} build -t ..." command gets executed
			imageBuildCmd := "build -t "
			Expect(stdout).ShouldNot(ContainSubstring(imageBuildCmd))
			Expect(stderr).ShouldNot(ContainSubstring(imageBuildCmd))
			Expect(stderr).To(ContainSubstring("no component with type \"Image\" found in Devfile"))
		})
	})

	When("using a devfile.yaml containing an Image component with Dockerfile args", func() {
		BeforeEach(func() {
			helper.CopyExample(filepath.Join("source", "nodejs"), commonVar.Context)
			helper.Cmd("odo", "init", "--name", "aname", "--devfile-path", helper.GetExamplePath("source", "devfiles", "nodejs", "devfile-outerloop-args.yaml")).ShouldPass()
			helper.CreateLocalEnv(commonVar.Context, "aname", commonVar.Project)
		})

		It("should use args to build image when running odo build-images", func() {
			stdout := helper.Cmd("odo", "build-images").AddEnv("PODMAN_CMD=echo").ShouldPass().Out()
			Expect(stdout).To(ContainSubstring("--unknown-flag value"))
		})

	})

	for _, testCtx := range []struct {
		title       string
		devfileName string
		setupFunc   func()
	}{
		{
			title:       "using a devfile.yaml containing an Image component with a build context",
			devfileName: "devfile-outerloop-project_source-in-docker-build-context.yaml",
			setupFunc: func() {
				helper.CopyExample(
					filepath.Join("source", "devfiles", "nodejs", "kubernetes", "devfile-outerloop-project_source-in-docker-build-context"),
					filepath.Join(commonVar.Context, "kubernetes", "devfile-outerloop-project_source-in-docker-build-context"))
			},
		},
		{
			title:       "using a devfile.yaml containing an Image component with a build context and Inlined Kubernetes components",
			devfileName: "devfile-outerloop-project_source-in-docker-build-context-and-k8s-inlined.yaml",
		},
	} {
		When(testCtx.title, func() {

			BeforeEach(func() {
				helper.CopyExample(filepath.Join("source", "nodejs"), commonVar.Context)
				helper.Cmd("odo", "init", "--name", "aname",
					"--devfile-path", helper.GetExamplePath("source", "devfiles", "nodejs", testCtx.devfileName)).
					ShouldPass()
				helper.CreateLocalEnv(commonVar.Context, "aname", commonVar.Project)
				if testCtx.setupFunc != nil {
					testCtx.setupFunc()
				}
			})

			for _, scope := range []struct {
				name    string
				envvars []string
			}{
				{
					name:    "Podman",
					envvars: []string{"PODMAN_CMD=echo"},
				},
				{
					name: "Docker",
					envvars: []string{
						"PODMAN_CMD=a-command-not-found-for-podman-should-make-odo-fallback-to-docker",
						"DOCKER_CMD=echo",
					},
				},
			} {
				It(fmt.Sprintf("should build image via %s if build context references PROJECT_SOURCE env var", scope.name), func() {
					stdout := helper.Cmd("odo", "build-images").AddEnv(scope.envvars...).ShouldPass().Out()
					lines, err := helper.ExtractLines(stdout)
					Expect(err).ShouldNot(HaveOccurred())
					nbLines := len(lines)
					Expect(nbLines).To(BeNumerically(">", 2))
					containerImage := "localhost:5000/devfile-nodejs-deploy:0.1.0" // from Devfile yaml file
					dockerfilePath := filepath.Join(commonVar.Context, "Dockerfile")
					buildCtx := commonVar.Context
					Expect(lines[nbLines-2]).To(BeEquivalentTo(
						fmt.Sprintf("build -t %s -f %s %s", containerImage, dockerfilePath, buildCtx)))
				})
			}
		})
	}

	for _, testCtx := range []struct {
		title       string
		devfileName string
		setupFunc   func()
	}{
		{
			title:       "using a devfile.yaml containing an Image component with no build context",
			devfileName: "issue-5600-devfile-with-image-component-and-no-buildContext.yaml",
			setupFunc: func() {
				helper.CopyExample(
					filepath.Join("source", "devfiles", "nodejs", "kubernetes", "issue-5600-devfile-with-image-component-and-no-buildContext"),
					filepath.Join(commonVar.Context, "kubernetes", "issue-5600-devfile-with-image-component-and-no-buildContext"))
			},
		},
		{
			title:       "using a devfile.yaml containing an Image component with no build context and Inlined Kubernetes components",
			devfileName: "issue-5600-devfile-with-image-component-and-no-buildContext-and-k8s-inlined.yaml",
		},
	} {
		When(testCtx.title, func() {

			BeforeEach(func() {
				helper.CopyExample(filepath.Join("source", "nodejs"), commonVar.Context)
				helper.CopyExampleDevFile(
					filepath.Join("source", "devfiles", "nodejs", testCtx.devfileName),
					filepath.Join(commonVar.Context, "devfile.yaml"))
				helper.CreateLocalEnv(commonVar.Context, "aname", commonVar.Project)
				if testCtx.setupFunc != nil {
					testCtx.setupFunc()
				}
			})

			for _, scope := range []struct {
				name    string
				envvars []string
			}{
				{
					name:    "Podman",
					envvars: []string{"PODMAN_CMD=echo"},
				},
				{
					name: "Docker",
					envvars: []string{
						"PODMAN_CMD=a-command-not-found-for-podman-should-make-odo-fallback-to-docker",
						"DOCKER_CMD=echo",
					},
				},
			} {
				It(fmt.Sprintf("should build image via %s by defaulting build context to devfile path", scope.name), func() {
					stdout := helper.Cmd("odo", "build-images").AddEnv(scope.envvars...).ShouldPass().Out()
					lines, err := helper.ExtractLines(stdout)
					Expect(err).ShouldNot(HaveOccurred())
					nbLines := len(lines)
					Expect(nbLines).To(BeNumerically(">", 2))
					containerImage := "localhost:5000/devfile-nodejs-deploy:0.1.0" // from Devfile yaml file
					dockerfilePath := filepath.Join(commonVar.Context, "Dockerfile")
					buildCtx := commonVar.Context
					Expect(lines[nbLines-2]).To(BeEquivalentTo(
						fmt.Sprintf("build -t %s -f %s %s", containerImage, dockerfilePath, buildCtx)))
				})
			}
		})
	}
})
