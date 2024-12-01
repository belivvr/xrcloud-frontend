#!/bin/bash
set -e
cd "$(dirname "$0")"

. $ENV

DOCKER_CONTAINER=$(basename "$PWD")
DOCKER_IMAGE="$DOCKER_CONTAINER:$(date +%s)"

docker build -t "$DOCKER_IMAGE" .
docker rm -f "$DOCKER_CONTAINER"
docker run -d --restart=always --log-opt max-size=10m --log-opt max-file=3 \
    --name "$DOCKER_CONTAINER" \
    --network xrcloud \
    --env-file "$ENV" \
    "$DOCKER_IMAGE"
