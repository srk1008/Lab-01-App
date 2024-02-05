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
kubectl scale --replicas=1 deployment backend -n default

kubectl delete deploy frontend -n default
kubectl delete deploy backend -n default
kubectl delete service frontend-service -n default
kubectl delete service backend-service -n default

http://node-ip:30000 # react app
http://node-ip:30001 # express api

-Kubernetes Dashboard
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
kubectl get pods -n kubernetes-dashboard
kubectl proxy
kubectl -n kubernetes-dashboard create token admin-user


----how to expose service to internet
There are different ways to expose your Kubernetes service to the internet, depending on your needs and preferences. Here are some common methods:

NodePort: This type of service assigns a port from a range (default 30000-32767) on each node, and forwards the traffic from that port to the target port on the pod. You can access the service from outside the cluster using the node IP and the node port. For example, http://node-ip:30000. This method is simple and easy to set up, but it requires you to know the node IP and port, and it may not be scalable or secure.
LoadBalancer: This type of service creates an external load balancer in the current cloud provider (if supported) and assigns a fixed, external IP to the service. You can access the service from outside the cluster using the external IP and the service port. For example, http://external-ip:80. This method is more convenient and reliable, but it may incur additional costs and dependencies on the cloud provider.
Ingress: This is a Kubernetes resource and controller that defines rules to route external HTTP(S) traffic to internal services. You can use an ingress to expose multiple services under the same IP address and hostname, with features such as SSL termination, name-based virtual hosting, and path-based routing. For example, http://example.com/service1 and http://example.com/service2. This method is more flexible and powerful, but it requires you to install and configure an ingress controller, and it may not support non-HTTP protocols.


kubectl apply -f ks8-service-account-role-binding-deployment.yaml
kubectl apply -f ks8-service-account-deployment.yaml


#create an Ingress resource
  kubectl apply -f ingress.yaml
#install ingress implementation (istio,NgiNX etc.)
#deploy an Ingress controller. The Ingress controller is responsible for implementing the rules set in your Ingress resource.
  deploy an Istio Ingress Gateway pod to handle the Ingress rules. Deploy Istio Gateway and VirtualService:

kubectl describe ingress my-ingress

#download helm from official site and extract it on local machine, add PATh variable
#install one of the ingress implementation ngnix ingress controller, can install istio too
  helm upgrade --install ingress-nginx ingress-nginx  --repo https://kubernetes.github.io/ingress-nginx   --namespace ingress-nginx -create-namespace
#deploy a pod containing nginx xontroller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

kubectl get pods --namespace=ingress-nginx
kubectl get svc -n ingress-nginx
#because we dont have loadbalancer in local env, port forword
kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 8080:80
  another e.g. kubectl -n default port-forward svc/backend-service 3000:3000 #forward local host :3000 to service :3000
http://localhost:8080

kubectl -n ingress-nginx logs -l app.kubernetes.io/instance=ingress-nginx
