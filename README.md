# NewsTailor

## Code First approach

We decided to use code first approach meaning that our database will be created based on migrations.

### How to use migrations - Migrate the table to the PostgreSQL database

### makemigrations
To update database models (We have to run this command every time when something changes in models.py e.g. adding a new table, changing a field name, etc)

command: python manage.py makemigrations

### migrate
The last step to submit or sent out our table into the database server

command: python manage.py migrate



