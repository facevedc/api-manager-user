
docker run --name mongodb --restart=always -d -p 27017:27017 mongo mongod --auth

sudo docker exec -i -t mongodb bash