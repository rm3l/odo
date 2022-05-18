package component

import (
	"context"
	"k8s.io/klog"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
)

type ReconcilePod struct {
	Client client.Client
}

func (r *ReconcilePod) Reconcile(ctx context.Context, request reconcile.Request) (reconcile.Result, error) {
	// TODO Your own logic here
	klog.Info("Reconcile: ", "namespace=", request.Namespace, ", name=", request.Name)
	return reconcile.Result{}, nil
}
