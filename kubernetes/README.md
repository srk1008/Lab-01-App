To run your two containers in a Kubernetes cluster, you need to create two deployment objects and two service objects, one for each container. A deployment object defines how to create and manage a set of pods that run your container image, and a service object defines how to expose your pods to the network.

1. Write a YAML file for your react app deployment, specifying the image name, the number of replicas, and the labels for your pods. 
---
2. Write a YAML file for your react app service, specifying the type, the selector, and the port mapping. 

kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml

kubectl get pods
kubectl get services
kubectl get pods -n default
kubectl get pods -n kube-system
kubectl scale --replicas=2 deployment backend -n default

http://node-ip:30000 # react app
http://node-ip:30001 # express api

-Kubernetes Dashboard
C:\Users\Sharad\source\repos\Azure\Lab-01\Lab-01-App\backend>kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
namespace/kubernetes-dashboard created
serviceaccount/kubernetes-dashboard created
service/kubernetes-dashboard created
secret/kubernetes-dashboard-certs created
secret/kubernetes-dashboard-csrf created
secret/kubernetes-dashboard-key-holder created
configmap/kubernetes-dashboard-settings created
role.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrole.rbac.authorization.k8s.io/kubernetes-dashboard created
rolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
deployment.apps/kubernetes-dashboard created
service/dashboard-metrics-scraper created
deployment.apps/dashboard-metrics-scraper created

C:\Users\Sharad\source\repos\Azure\Lab-01\Lab-01-App\backend>kubectl get pods -n kubernetes-dashboard
NAME                                         READY   STATUS    RESTARTS   AGE
dashboard-metrics-scraper-5657497c4c-h7q8t   1/1     Running   0          57s
kubernetes-dashboard-78f87ddfc-rwv98         1/1     Running   0          57s

C:\Users\Sharad\source\repos\Azure\Lab-01\Lab-01-App\backend>kubectl proxy
-

----how to expose service to internet
There are different ways to expose your Kubernetes service to the internet, depending on your needs and preferences. Here are some common methods:

NodePort: This type of service assigns a port from a range (default 30000-32767) on each node, and forwards the traffic from that port to the target port on the pod. You can access the service from outside the cluster using the node IP and the node port. For example, http://node-ip:30000. This method is simple and easy to set up, but it requires you to know the node IP and port, and it may not be scalable or secure.
LoadBalancer: This type of service creates an external load balancer in the current cloud provider (if supported) and assigns a fixed, external IP to the service. You can access the service from outside the cluster using the external IP and the service port. For example, http://external-ip:80. This method is more convenient and reliable, but it may incur additional costs and dependencies on the cloud provider.
Ingress: This is a Kubernetes resource and controller that defines rules to route external HTTP(S) traffic to internal services. You can use an ingress to expose multiple services under the same IP address and hostname, with features such as SSL termination, name-based virtual hosting, and path-based routing. For example, http://example.com/service1 and http://example.com/service2. This method is more flexible and powerful, but it requires you to install and configure an ingress controller, and it may not support non-HTTP protocols.


kubectl apply -f ks8-service-account-role-binding-deployment.yaml
kubectl apply -f ks8-service-account-deployment.yaml
kubectl -n kubernetes-dashboard create token admin-user

