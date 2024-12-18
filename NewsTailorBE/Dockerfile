FROM python:3.9-slim


WORKDIR /app


COPY . .

EXPOSE 5273

CMD ["python", "manage.py", "runserver", "0.0.0.0:5273"]