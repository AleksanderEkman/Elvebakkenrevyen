# Variables
$IMAGE_NAME = "elvebakkenrevyen"
$TAG = "latest"

# Start timer
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

# Build the image
Write-Host "Building image..." -ForegroundColor Yellow
docker build --platform linux/amd64 -t ${IMAGE_NAME}:${TAG} .
Write-Host "Image built" -ForegroundColor Green

# Tag image
docker tag ${IMAGE_NAME} aleksanderekman133/${IMAGE_NAME}:${TAG}
Write-Host "Image tagged" -ForegroundColor Green

# Push image to Docker Hub
Write-Host "Pushing image to Docker Hub..." -ForegroundColor Yellow
docker push aleksanderekman133/${IMAGE_NAME}:${TAG}

# Stop timer and calculate elapsed time
$stopwatch.Stop()
$elapsedSeconds = [math]::Round($stopwatch.Elapsed.TotalSeconds, 2)

# Deploy complete
Write-Host "Docker Hub deploy complete! (finished in $elapsedSeconds s)" -ForegroundColor Green

