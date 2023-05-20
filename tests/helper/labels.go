package helper

import (
	"github.com/onsi/ginkgo/v2"
)

const (
	LabelNoCluster      = "nocluster"
	LabelUnauth         = "unauth"
	LabelPodman         = "podman"
	LabelPodmanIsolated = "podman-isolated"
)

func NeedsCluster(labels []string) bool {
	for _, label := range labels {
		if label == LabelNoCluster {
			return false
		}
		if label == LabelPodman || label == LabelPodmanIsolated {
			return false
		}
	}
	return true
}

func NeedsPodman(labels []string) bool {
	for _, label := range labels {
		if label == LabelPodman || label == LabelPodmanIsolated {
			return true
		}
	}
	return false
}

func NeedsPodmanIsolation(labels []string) bool {
	for _, label := range labels {
		if label == LabelPodmanIsolated {
			return true
		}
	}
	return false
}

func IsAuth(labels []string) bool {
	for _, label := range labels {
		if label == LabelUnauth {
			return false
		}
	}
	return true
}

// LabelPodmanIf adds the Podman label to the spec if value is true.
// Deprecated. Use LabelWithIf instead
func LabelPodmanIf(value bool, args ...interface{}) []interface{} {
	return LabelWithIf(value, []string{LabelPodman}, args)
}

// LabelWithIf adds the specified labels to the spec if value is true.
func LabelWithIf(value bool, labels []string, args ...interface{}) []interface{} {
	var res []interface{}
	if value {
		res = append(res, ginkgo.Label(labels...))
	}
	res = append(res, args...)
	return res
}
