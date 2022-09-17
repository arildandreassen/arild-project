container="local-db"
docker rm -f "$container"
docker run --name "$container" -it -d -p 5432:5432 -e POSTGRES_PASSWORD='password' -e POSTGRES_USER='postgres' postgres:13.6-alpine