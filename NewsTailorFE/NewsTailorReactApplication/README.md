# NewsTailor

We are using ReactJS powered by Vite to build the frontend.

In order to run the frontend, you need to run the following commands:
- npm install
- npm run dev

This is solely a first step to build the frontend - next steps are to start implementing the created user stories.

Commands to run the frontend locally via docker:
- docker build -t newstailor_fe .
- docker compose up -d 
For now these commands launch the application via docker on the port 5173. The postgres database instance and pgadmin are also launched, but the database is empty.