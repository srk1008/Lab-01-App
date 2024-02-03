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
