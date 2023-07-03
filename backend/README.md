# Backend

## Basic Setup

### Install requirements
* `$ pip install -r requirements.txt`
* All requirements are expected to work on linux server

### Database migration initialization
Run following steps to setup a Postgres Database
* `$ alembic current` # to check for proper connection
* `$ alembic revision --autogenerate` # to generate existing tables metadata in alembic
* `$ alembic upgrade head` # to create tables in postgres db

