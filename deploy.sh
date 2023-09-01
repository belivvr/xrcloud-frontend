cd /home/benny/xrcloud-frontend

git pull
docker build -t frontend .
docker system prune -f
if ! docker network ls | grep -q xrcloud; then
   docker network create xrcloud
fi
docker rm -f frontend
docker run -d --restart=always --name frontend --network xrcloud frontend
docker logs frontend -f