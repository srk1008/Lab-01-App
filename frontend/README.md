# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


---------------Custom------------------------------------------------------

docker ps -a
docker stop
cd C:\Users\Sharad\source\repos\Azure\Lab-01\Lab-01-App\frontend
docker build -t frontend .

//Nginx acts as a reverse proxy, forwarding requests from port 80 (Nginx) to port 3000 (React)
//host port 3000 mapped to port 80 in container, nginx maps port 80 to 3000 ^
docker run -d -p 3000:80 --name frontend frontend

docker build -t backend .
docker run -d -p 3001:3000 --name backend backend
-------------------------------------------------------------
To run your two containers in a Kubernetes cluster, you need to create two deployment objects and two service objects, one for each container. A deployment object defines how to create and manage a set of pods that run your container image, and a service object defines how to expose your pods to the network.

1. Write a YAML file for your react app deployment, specifying the image name, the number of replicas, and the labels for your pods. 
---
2. Write a YAML file for your react app service, specifying the type, the selector, and the port mapping. 

kubectl apply -f react-app-deployment.yaml
kubectl apply -f react-app-service.yaml
kubectl apply -f express-api-deployment.yaml
kubectl apply -f express-api-service.yaml

kubectl get pods
kubectl get services

http://node-ip:30000 # react app
http://node-ip:30001 # express api

----how to expose service to internet
There are different ways to expose your Kubernetes service to the internet, depending on your needs and preferences. Here are some common methods:

NodePort: This type of service assigns a port from a range (default 30000-32767) on each node, and forwards the traffic from that port to the target port on the pod. You can access the service from outside the cluster using the node IP and the node port. For example, http://node-ip:30000. This method is simple and easy to set up, but it requires you to know the node IP and port, and it may not be scalable or secure.
LoadBalancer: This type of service creates an external load balancer in the current cloud provider (if supported) and assigns a fixed, external IP to the service. You can access the service from outside the cluster using the external IP and the service port. For example, http://external-ip:80. This method is more convenient and reliable, but it may incur additional costs and dependencies on the cloud provider.
Ingress: This is a Kubernetes resource and controller that defines rules to route external HTTP(S) traffic to internal services. You can use an ingress to expose multiple services under the same IP address and hostname, with features such as SSL termination, name-based virtual hosting, and path-based routing. For example, http://example.com/service1 and http://example.com/service2. This method is more flexible and powerful, but it requires you to install and configure an ingress controller, and it may not support non-HTTP protocols.


docker  inspect frontend
docker info
docker inspect
docker run -it --privileged --pid=host debian nsenter -t 1 -m -u -i sh
docker exec -it c39e7edf11ad bash
docker image prune -a -f
docker container prune  -f

---------------------------------------------------------------------------
wsl --unregister Ubuntu
wsl -d docker-desktop
wsl -l -v
uname -a
wsl -d docker-desktop



https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-with-nginx-on-ubuntu-20-04

Deploy CWA-APIs fronting AppGw-APIM in VNET-Firewall
0. Connect your Azure account
    az login
1. Create a Linux VM in Azure store its public IP
    $location="westus"
    $rgName="rglab01"
    $VMNAME="vmlab01"

    New-AzResourceGroup -Name $rgName -Location $location

    az vm create --name $VMNAME --resource-group $rgName --image Ubuntu2204 --generate-ssh-keys

    //export publicIP=$(az vm create --name $VMNAME --resource-group $rgName --image Ubuntu2204 --generate-ssh-keys --output tsv --query  publicIpAddress")

    $publicIP="40.78.97.229"

    ssh $publicIP
    sudo apt-get update
    sudo apt-get install npm
    sudo apt install nodejs
    sudo npm install -g serve //static-file server

    //upgrade nodejs
        sudo apt update
        sudo npm cache clean -f
        sudo npm install -g n
        sudo n stable
    //

    // OPen vm firewall, not required.
    sudo ufw allow 80/tcp
    sudo ufw allow 3000/tcp



// http://40.78.97.229:3000

2. Setup and run CWA and backend service
    1. git clone https://github.com/srk1008/Lab-01-App.git
    2. cd frontend
    npm install
    npm run build
    sudo serve -s build -l 80

az network nsg rule create --resource-group "rglab01" --nsg-name "vmlab01NSG" --name "Allowhttpinbound" --priority 100 --protocol Tcp --direction Inbound --source-address-prefix "*" --source-port-range "*" --destination-address-prefix "*" --destination-port-range 80 --access Allow





    4. cd..
    5. cd backend
    6. node index.js


    Remove-AzureRmResourceGroup $rgName
