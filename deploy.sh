# Variables
IMAGE_NAME="elvebakkenrevyen"
TAG="latest"

# Build the image
echo -e "\033[0;33mBuilding image...\033[0m"
docker build --platform linux/amd64 -t $IMAGE_NAME:$TAG .
echo -e "\033[0;32mImage built\033[0m"

# Tag image
docker tag $IMAGE_NAME aleksanderekman133/$IMAGE_NAME:$TAG
echo -e "\033[0;33mImage tagged\033[0m"

# Push image to Docker Hub
echo -e "\033[0;33mPushing image to Docker Hub...\033[0m"
docker push aleksanderekman133/$IMAGE_NAME:$TAG

# Deploy complete
echo -e "\033[0;32mDocker Hub deploy complete!"