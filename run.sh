cd server
echo "Building server image"
docker build -t server-image .
echo "Starting server container"
docker container run -p 3000:3000 -d --name server-app server-image
cd ../client
echo "Building client image"
docker build -t client-image .
echo "Starting client container"
docker container run -p 5000:5000 -d --name client-app client-image
echo "Everything started"