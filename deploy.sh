git pull
docker build -t frontend .
docker rm -f frontend
docker run -d --restart=always --name frontend --network xrcloud frontend
docker logs frontend -f