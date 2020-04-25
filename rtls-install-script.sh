cd ~/
cd projects/workspace/rtls/tracktrail
#Building Image
sudo docker build -t rtls-node-image .
#Running Container
sudo docker run --name rtls-node-container -it rtls-node-image

#sudo docker run -d -p 4200:4200 --name rtls-node-container rtls-node-image
#sudo docker run -d -p 4200:4200 --name rtls-node-container -it rtls-node-image

