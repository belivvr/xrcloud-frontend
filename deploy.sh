cd /home/benny/xrcloud-frontend

git pull
docker build -t frontend .
docker system prune -f
if ! docker network ls | grep -q xrcloud; then
   docker network create --subnet=172.18.0.0/16 xrcloud
fi
docker rm -f frontend
docker run -d --restart=always --name frontend --network xrcloud frontend
docker logs frontend -f