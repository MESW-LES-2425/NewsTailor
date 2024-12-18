# NewsTailor

NewsTailor is a smart, personalized news curator that tailors content to match the user’s interests and available time. Developed as part of the Software Engineering Lab course within the Master’s program in Software Engineering at the Faculty of Engineering, University of Porto.

## Deployment
To access the live deployment of NewsTailor, please visit:
[NewsTailor](https://newstailorreactapplication-prod.fly.dev/)

To access the live deployment staging of NewsTailor, please visit:
[NewsTailor Staging](https://newstailorreactapplication.fly.dev/)

## Testing Folder Location

#### Backend Tests
To access the backend tests folders, go to:
[Backend Tests](https://github.com/MESW-LES-2425/NewsTailor/tree/Iteration_3/NewsTailorBE/NewsTailorDjangoApplication/tests)

#### Selenium Tests
To access the Selenium tests folders, go to:
[Selenium Tests](https://github.com/MESW-LES-2425/NewsTailor/tree/Iteration_3/NewsTailorBE/NewsTailorDjangoApplication/tests/automated_tests)

#### Frontend Tests
To access the frontend test folders, go to:
[Frontend Tests](https://github.com/MESW-LES-2425/NewsTailor/tree/Iteration_3/NewsTailorFE/NewsTailorReactApplication/src/__tests__)

## Table of Contents

- Introduction
- Features
- Installation
- Running the Application
- Docker Setup
- Environment Variables
- Contributors
- License

## Introduction

NewsTailor was developed in the scope of the Laboratory in Software Engineering Class. The goal was to create an impactful product that follows the principles of software engineering. The team created a web application that provides users with personalized news curation based on their interests and available reading time.

## Features

- Personalized news curation based on user interests
- Adjustable news length to fit available reading time
- Selection of specific news categories
- Integration with various news sources

## Local Installation

To install the frontend dependencies, run the following commands in the frontend directory:

```sh
npm install
```

## Running the Application

To run the frontend locally, use the following command:

```sh
npm run dev
```

## Docker Setup

To run the application locally via Docker, use the following commands:

```sh
docker build -t newstailor_fe .
docker build -t newstailor_be .
docker compose up -d
```

These commands launch the application via Docker on port 5173. The PostgreSQL database instance and pgAdmin are also launched.

## Environment Variables

Create a `.env` file in the root directory of the backend and frontend with the necessary environment variables. Refer to the `.env.sample` files for the required variables.

### Backend `.env.sample`

```sample
# This is a sample file for .env, ask repository owners for the needed values.

NEWS_API_KEY=KEYVALUE
GUARDIAN_API_KEY=KEYVALUE
NEW_YORK_TIMES_API_KEY=KEYVALUE
SECRET_KEY=KEYVALUE
DB_NAME=KEYVALUE
DB_USER=KEYVALUE
DB_PASSWORD=KEYVALUE
DB_HOST=KEYVALUE
DB_PORT=KEYVALUE
```

### Frontend `.env.sample`

```sample
VITE_API_URL=EXAMPLEURL
```

## Contributors

- Duarte Caldas
- João Oliveira
- Maria Laranjeira
- Pedro Magalhães

## License

This project is licensed under the MIT License.