cd /home/benny/xrcloud-frontend

git pull
docker build -t frontend .
docker system prune -f
docker rm -f frontend
docker run -d --restart=always --name frontend --network suncheon frontend
docker logs frontend -f