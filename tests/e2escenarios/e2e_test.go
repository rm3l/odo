package e2escenarios

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"path"
	"path/filepath"
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/redhat-developer/odo/tests/helper"
)

var _ = Describe("E2E Test", func() {
	var commonVar helper.CommonVar
	var componentName string

	var _ = BeforeEach(func() {
		componentName = helper.RandString(6)
		commonVar = helper.CommonBeforeEach()
	})

	var _ = AfterEach(func() {
		helper.CommonAfterEach(commonVar)
	})

	checkIfDevEnvIsUp := func(url, assertString string) {
		Eventually(func(g Gomega) {
			resp, err := http.Get(fmt.Sprintf("http://%s", url))
			g.Expect(err).NotTo(HaveOccurred(), fmt.Sprintf("error while trying to GET %q: %v", url, err))
			defer resp.Body.Close()
			g.Expect(resp).To(HaveHTTPBody(assertString))
		}, 120*time.Second, 15*time.Second).Should(Succeed())
	}

	Context("starting with empty Directory", func() {
		var _ = BeforeEach(func() {
			helper.Chdir(commonVar.Context)
			Expect(helper.ListFilesInDir(commonVar.Context)).To(BeEmpty())
		})

		It("should verify developer workflow from empty Directory", func() {
			deploymentName := "my-component"
			serviceName := "my-cs"
			getDeployArgs := []string{"get", "deployment", "-n", commonVar.Project}
			getSVCArgs := []string{"get", "svc", "-n", commonVar.Project}

			command := []string{"odo", "init"}
			_, err := helper.RunInteractive(command, nil, func(ctx helper.InteractiveContext) {

				helper.ExpectString(ctx, "Select language")
				helper.SendLine(ctx, "JavaScript")

				helper.ExpectString(ctx, "Select project type")
				helper.SendLine(ctx, "Node.js")

				helper.ExpectString(ctx, "Select container for which you want to change configuration?")
				helper.SendLine(ctx, "")

				helper.ExpectString(ctx, "Which starter project do you want to use")
				helper.SendLine(ctx, "nodejs-starter")

				helper.ExpectString(ctx, "Enter component name")
				helper.SendLine(ctx, componentName)

				helper.ExpectString(ctx, "Your new component '"+componentName+"' is ready in the current directory")

			})
			Expect(err).To(BeNil())
			Expect(helper.ListFilesInDir(commonVar.Context)).To(ContainElement("devfile.yaml"))
			Expect(helper.ListFilesInDir(commonVar.Context)).To(ContainElement("server.js"))

			// "execute odo dev and add changes to application"
			var devSession helper.DevSession
			var ports map[string]string

			devSession, _, _, ports, err = helper.StartDevMode(helper.DevSessionOpts{})
			helper.ReplaceString(filepath.Join(commonVar.Context, "server.js"), "from Node.js", "from updated Node.js")
			Expect(err).ToNot(HaveOccurred())
			_, _, _, err = devSession.WaitSync()
			Expect(err).ToNot(HaveOccurred())
			// "should update the changes"
			checkIfDevEnvIsUp(ports["3000"], "Hello from updated Node.js Starter Application!")

			// "changes are made to the applications"
			helper.ReplaceString(filepath.Join(commonVar.Context, "server.js"), "from updated Node.js", "from Node.js app v2")
			_, _, _, err = devSession.WaitSync()
			Expect(err).ToNot(HaveOccurred())
			// "should deploy new changes"
			checkIfDevEnvIsUp(ports["3000"], "Hello from Node.js app v2 Starter Application!")

			// "running odo list"
			stdout := helper.Cmd("odo", "list", "component").ShouldPass().Out()
			helper.MatchAllInOutput(stdout, []string{componentName, "Node.js", "Dev"})

			// "exit dev mode and run odo deploy"
			devSession.Stop()
			devSession.WaitEnd()

			// all resources should be deleted from the namespace
			services := commonVar.CliRunner.GetServices(commonVar.Project)
			Expect(services).To(BeEmpty())
			pvcs := commonVar.CliRunner.GetAllPVCNames(commonVar.Project)
			Expect(pvcs).To(BeEmpty())
			pods := commonVar.CliRunner.GetAllPodNames(commonVar.Project)
			Expect(pods).To(BeEmpty())

			// "run odo deploy"
			helper.CopyExampleDevFile(filepath.Join("source", "devfiles", "nodejs", "devfile-deploy.yaml"), path.Join(commonVar.Context, "devfile.yaml"))
			helper.ReplaceString(filepath.Join(commonVar.Context, "devfile.yaml"), "nodejs-prj1-api-abhz", componentName)

			stdout = helper.Cmd("odo", "deploy").AddEnv("PODMAN_CMD=echo").ShouldPass().Out()
			Expect(stdout).To(ContainSubstring("Your Devfile has been successfully deployed"))

			// should deploy new changes
			stdout = helper.Cmd("odo", "list", "component").ShouldPass().Out()
			helper.MatchAllInOutput(stdout, []string{componentName, "nodejs", "Deploy"})

			// start dev mode again
			devSession, _, _, ports, err = helper.StartDevMode(helper.DevSessionOpts{})
			Expect(err).ToNot(HaveOccurred())

			// making changes to the project again
			helper.ReplaceString(filepath.Join(commonVar.Context, "server.js"), "from Node.js app v2", "from Node.js app v3")
			_, _, _, err = devSession.WaitSync()
			Expect(err).ToNot(HaveOccurred())
			// "should update the changes"
			checkIfDevEnvIsUp(ports["3000"], "Hello from Node.js app v3 Starter Application!")

			// should list both dev,deploy
			stdout = helper.Cmd("odo", "list", "component").ShouldPass().Out()
			helper.MatchAllInOutput(stdout, []string{componentName, "nodejs", "Dev", "Deploy"})

			// "exit dev mode and run odo deploy"
			devSession.Stop()

			// "run odo deploy"
			stdout = helper.Cmd("odo", "deploy").AddEnv("PODMAN_CMD=echo").ShouldPass().Out()
			Expect(stdout).To(ContainSubstring("Your Devfile has been successfully deployed"))

			// "run odo delete and check if the component is deleted"
			command = []string{"odo", "delete", "component"}
			_, err = helper.RunInteractive(command, nil, func(ctx helper.InteractiveContext) {
				helper.ExpectString(ctx, "Are you sure you want to delete \""+componentName+"\" and all its resources?")
				helper.SendLine(ctx, "y")
				helper.ExpectString(ctx, "successfully deleted")
			})
			Expect(err).To(BeNil())
			Eventually(string(commonVar.CliRunner.Run(getDeployArgs...).Out.Contents()), 60, 3).ShouldNot(ContainSubstring(deploymentName))
			Eventually(string(commonVar.CliRunner.Run(getSVCArgs...).Out.Contents()), 60, 3).ShouldNot(ContainSubstring(serviceName))
		})
	})

	Context("starting with non-empty Directory", func() {
		var _ = BeforeEach(func() {
			helper.Chdir(commonVar.Context)
			helper.CopyExample(filepath.Join("source", "devfiles", "nodejs", "project"), commonVar.Context)
		})

		It("should verify developer workflow from non-empty Directory", func() {
			deploymentName := "my-component"
			serviceName := "my-cs"
			getDeployArgs := []string{"get", "deployment", "-n", commonVar.Project}
			getSVCArgs := []string{"get", "svc", "-n", commonVar.Project}

			command := []string{"odo", "init"}
			_, err := helper.RunInteractive(command, nil, func(ctx helper.InteractiveContext) {

				// helper.ExpectString(ctx, "Based on the files in the current directory odo detected")
				helper.ExpectString(ctx, "Language: JavaScript")
				helper.ExpectString(ctx, "Project type: Node.js")
				helper.ExpectString(ctx, "Is this correct")

				helper.SendLine(ctx, "")

				helper.ExpectString(ctx, "Select container for which you want to change configuration?")

				helper.SendLine(ctx, "")

				helper.ExpectString(ctx, "Enter component name")

				helper.SendLine(ctx, componentName)

				helper.ExpectString(ctx, "Your new component '"+componentName+"' is ready in the current directory")

			})
			Expect(err).To(BeNil())
			Expect(helper.ListFilesInDir(commonVar.Context)).To(ContainElement("devfile.yaml"))

			// "execute odo dev and add changes to application"
			var devSession helper.DevSession
			var ports map[string]string

			devSession, _, _, ports, err = helper.StartDevMode(helper.DevSessionOpts{})
			helper.ReplaceString(filepath.Join(commonVar.Context, "server.js"), "from Node.js", "from updated Node.js")
			Expect(err).ToNot(HaveOccurred())

			_, _, _, err = devSession.WaitSync()
			Expect(err).ToNot(HaveOccurred())

			// "should update the changes"
			checkIfDevEnvIsUp(ports["3000"], "Hello from updated Node.js Starter Application!")

			// "changes are made made to the applications"

			helper.ReplaceString(filepath.Join(commonVar.Context, "server.js"), "from updated Node.js", "from Node.js app v2")
			_, _, _, err = devSession.WaitSync()
			Expect(err).ToNot(HaveOccurred())

			// "should deploy new changes"
			checkIfDevEnvIsUp(ports["3000"], "Hello from Node.js app v2 Starter Application!")

			// "running odo list"
			stdout := helper.Cmd("odo", "list", "component").ShouldPass().Out()
			helper.MatchAllInOutput(stdout, []string{componentName, "Node.js", "Dev"})

			// "exit dev mode and run odo deploy"
			devSession.Stop()
			devSession.WaitEnd()

			// all resources should be deleted from the namespace
			services := commonVar.CliRunner.GetServices(commonVar.Project)
			Expect(services).To(BeEmpty())
			pvcs := commonVar.CliRunner.GetAllPVCNames(commonVar.Project)
			Expect(pvcs).To(BeEmpty())
			pods := commonVar.CliRunner.GetAllPodNames(commonVar.Project)
			Expect(pods).To(BeEmpty())

			// "run odo deploy"
			helper.CopyExampleDevFile(filepath.Join("source", "devfiles", "nodejs", "devfile-deploy.yaml"), path.Join(commonVar.Context, "devfile.yaml"))
			helper.ReplaceString(filepath.Join(commonVar.Context, "devfile.yaml"), "nodejs-prj1-api-abhz", componentName)
			stdout = helper.Cmd("odo", "deploy").AddEnv("PODMAN_CMD=echo").ShouldPass().Out()
			Expect(stdout).To(ContainSubstring("Your Devfile has been successfully deployed"))

			// should deploy new changes
			stdout = helper.Cmd("odo", "list", "component").ShouldPass().Out()
			helper.MatchAllInOutput(stdout, []string{componentName, "nodejs", "Deploy"})

			// start dev mode again
			devSession, _, _, ports, err = helper.StartDevMode(helper.DevSessionOpts{})
			Expect(err).ToNot(HaveOccurred())

			// making changes to the project again
			helper.ReplaceString(filepath.Join(commonVar.Context, "server.js"), "from Node.js app v2", "from Node.js app v3")

			// "should update the changes"
			checkIfDevEnvIsUp(ports["3000"], "Hello from Node.js app v3 Starter Application!")

			// should list both dev,deploy
			stdout = helper.Cmd("odo", "list", "component").ShouldPass().Out()
			helper.MatchAllInOutput(stdout, []string{componentName, "nodejs", "Dev", "Deploy"})

			// "exit dev mode and run odo deploy"
			devSession.Stop()

			// "run odo deploy"
			stdout = helper.Cmd("odo", "deploy").AddEnv("PODMAN_CMD=echo").ShouldPass().Out()
			Expect(stdout).To(ContainSubstring("Your Devfile has been successfully deployed"))

			command = []string{"odo", "delete", "component"}
			_, err = helper.RunInteractive(command, nil, func(ctx helper.InteractiveContext) {
				helper.ExpectString(ctx, "Are you sure you want to delete \""+componentName+"\" and all its resources?")
				helper.SendLine(ctx, "y")
				helper.ExpectString(ctx, "successfully deleted")
			})
			Expect(err).To(BeNil())
			Eventually(string(commonVar.CliRunner.Run(getDeployArgs...).Out.Contents()), 60, 3).ShouldNot(ContainSubstring(deploymentName))
			Eventually(string(commonVar.CliRunner.Run(getSVCArgs...).Out.Contents()), 60, 3).ShouldNot(ContainSubstring(serviceName))
		})
	})

	Context("starting with non-empty Directory add Binding", func() {
		type (
			user struct {
				Id       int    `json:"id,omitempty"`
				Name     string `json:"name"`
				Location string `json:"location"`
				Age      int    `json:"age"`
			}
			createUserResponse struct {
				Id      int    `json:"id,omitempty"`
				Message string `json:"message"`
			}
		)

		createUser := func(url string, u user) (createUserResponse, error) {
			jsonData, err := json.Marshal(u)
			if err != nil {
				return createUserResponse{}, err
			}
			resp, err := http.Post(fmt.Sprintf("http://%s/api/newuser", url), "application/json", bytes.NewBuffer(jsonData))
			if err != nil {
				return createUserResponse{}, err
			}
			defer resp.Body.Close()

			var res createUserResponse
			err = json.NewDecoder(resp.Body).Decode(&res)
			if err != nil {
				return createUserResponse{}, err
			}
			return res, nil
		}

		getUsers := func(url string) ([]user, error) {
			resp, err := http.Get(fmt.Sprintf("http://%s/api/user", url))
			if err != nil {
				return nil, err
			}
			defer resp.Body.Close()

			var res []user
			err = json.NewDecoder(resp.Body).Decode(&res)
			if err != nil {
				return nil, err
			}
			return res, nil
		}

		var _ = BeforeEach(func() {
			commonVar.CliRunner.EnsureOperatorIsInstalled("service-binding-operator")
			commonVar.CliRunner.EnsureOperatorIsInstalled("cloud-native-postgresql")
			Eventually(func() string {
				out, _ := commonVar.CliRunner.GetBindableKinds()
				return out
			}, 120, 3).Should(ContainSubstring("Cluster"))
			helper.Chdir(commonVar.Context)
			helper.CopyExample(filepath.Join("source", "devfiles", "go"), commonVar.Context)
			addBindableKind := commonVar.CliRunner.Run("apply", "-f", helper.GetExamplePath("source", "devfiles", "go", "cluster.yaml"))
			Expect(addBindableKind.ExitCode()).To(BeEquivalentTo(0))
		})

		It("should verify developer workflow of using binding as env in innerloop", func() {
			bindingName := helper.RandString(6)

			command := []string{"odo", "init"}
			_, err := helper.RunInteractive(command, nil, func(ctx helper.InteractiveContext) {

				helper.ExpectString(ctx, "Language: Go")
				helper.ExpectString(ctx, "Project type: Go")
				helper.ExpectString(ctx, "Is this correct")

				helper.SendLine(ctx, "")

				helper.ExpectString(ctx, "Select container for which you want to change configuration?")

				helper.SendLine(ctx, "")

				helper.ExpectString(ctx, "Enter component name")

				helper.SendLine(ctx, componentName)

				helper.ExpectString(ctx, "Your new component '"+componentName+"' is ready in the current directory")

			})
			Expect(err).To(BeNil())
			Expect(helper.ListFilesInDir(commonVar.Context)).To(ContainElement("devfile.yaml"))

			// // "execute odo dev and add changes to application"
			var devSession helper.DevSession
			var ports map[string]string

			devSession, _, _, ports, err = helper.StartDevMode(helper.DevSessionOpts{})
			Expect(err).ToNot(HaveOccurred())

			// "send data"
			_, err = getUsers(ports["8080"])
			Expect(err).ToNot(BeNil()) // should fail as application is not connected to DB

			//add binding information (binding as ENV)
			helper.Cmd("odo", "add", "binding", "--name", bindingName, "--service", "cluster-example-initdb", "--bind-as-files=false").ShouldPass()

			// Get new random port after restart
			Eventually(func(g Gomega) map[string]string {
				_, _, ports, err = devSession.GetInfo()
				g.Expect(err).ToNot(HaveOccurred())
				return ports
			}, 180, 10).ShouldNot(BeEmpty())

			// "send data"
			data, err := createUser(ports["8080"], user{Name: "joe", Location: "tokyo", Age: 23})
			Expect(err).To(BeNil())
			Expect(data.Id).NotTo(BeZero())
			Expect(data.Message).To(Equal("User created successfully"))

			// "get all data"
			uList, err := getUsers(ports["8080"])
			Expect(err).To(BeNil())
			Expect(uList).To(HaveLen(1))
			persistedUser := uList[0]
			Expect(persistedUser.Id).NotTo(BeZero())
			Expect(persistedUser.Name).To(Equal("joe"))
			Expect(persistedUser.Location).To(Equal("tokyo"))
			Expect(persistedUser.Age).To(Equal(23))

			// check odo describe to check for env
			stdout := helper.Cmd("odo", "describe", "binding").ShouldPass().Out()
			helper.MatchAllInOutput(stdout, []string{"Available binding information:", "CLUSTER_HOST", "CLUSTER_PASSWORD", "CLUSTER_USERNAME"})

			// "running odo list"
			stdout = helper.Cmd("odo", "list").ShouldPass().Out()
			helper.MatchAllInOutput(stdout, []string{componentName, "Go", "Dev", bindingName})

			// remove bindings and check devfile to not contain binding info
			helper.Cmd("odo", "remove", "binding", "--name", bindingName).ShouldPass()

			// Get new random port after restart
			Eventually(func(g Gomega) map[string]string {
				_, _, ports, err = devSession.GetInfo()
				g.Expect(err).ToNot(HaveOccurred())
				return ports
			}, 180, 10).ShouldNot(BeEmpty())

			// "get data"
			_, err = getUsers(ports["8080"])
			Expect(err).ToNot(BeNil()) // should fail as application is no longer connected to DB

			stdout = helper.Cmd("odo", "describe", "binding").ShouldPass().Out()
			Expect(stdout).To(ContainSubstring("No ServiceBinding used by the current component"))

			devSession.Stop()
			devSession.WaitEnd()

			// all resources should be deleted from the namespace
			services := commonVar.CliRunner.GetServices(commonVar.Project)
			Expect(services).NotTo(ContainSubstring(componentName))
			pvcs := commonVar.CliRunner.GetAllPVCNames(commonVar.Project)
			Expect(pvcs).NotTo(ContainElement(componentName)) //To(Not(ContainSubstring(componentName)))
			pods := commonVar.CliRunner.GetAllPodNames(commonVar.Project)
			Expect(pods).NotTo(ContainElement(componentName))
		})
	})
})
