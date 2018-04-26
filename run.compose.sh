cd server
echo "Building server pack with mongo container"
echo "Starting server container"
docker-compose up -d
cd ../client
echo "Building client image"
docker build -t client-image .
echo "Starting client container"
docker container run -p 5000:5000 -d --name client-app client-image
echo "Everything started"