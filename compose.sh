docker compose stop
docker system prune -a
cd NewsTailorBE
docker build -t newstailor_be .
cd ../NewsTailorFE/NewsTailorReactApplication
docker build -t newstailor_fe .
cd ../../
docker compose up -d