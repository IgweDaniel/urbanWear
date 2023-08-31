#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install

python manage.py collectstatic --no-input

python manage.py makemigrations store
python manage.py migrate store
python manage.py migrate

python manage.py seed data.json