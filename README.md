https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-with-nginx-on-ubuntu-20-04

Deploy CWA-APIs fronting AppGw-APIM in VNET-Firewall
0. Connect your Azure account
    az login
1. Create a Linux VM in Azure store its public IP
    $location="westus"
    $rgName="rglab01"

    New-AzResourceGroup -Name $rgName -Location $location

    $VMNAME="vmlab01"

    export publicIP=$(az vm create --name $VMNAME --resource-group $rgName --image Ubuntu2204 --generate-ssh-keys --output tsv --query "publicIpAddress")

    $publicIP="104.42.52.97"

    ssh $publicIP
    sudo apt-get update
    sudo apt-get install npm
    sudo ufw enable
    sudo ufw status | grep 3000 //if output blanck the port is closed
    sudo apt update
    sudo apt install nodejs
    sudo apt install npm


// https://40.118.144.52:3000

2. Setup and run CWA and backend service
    1. git clone https://github.com/srk1008/Lab-01-App.git
    2. cd frontend
    npm install
    npm run build
    npm install -g serve
    sudo serve -s build -l 80

az network nsg rule create --resource-group "rglab01" --nsg-name "vmlab01NSG" --name "Allowhttpinbound" --priority 100 --protocol Tcp --direction Inbound --source-address-prefix "*" --source-port-range "*" --destination-address-prefix "*" --destination-port-range 80 --access Allow

sudo ufw allow 80/tcp



    4. cd..
    5. cd backend
    6. node index.js


    Remove-AzureRmResourceGroup $rgName
