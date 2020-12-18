#!/bin/bash
python manage.py makemigrations store

python manage.py migrate store
python manage.py migrate 

python manage.py seed data.json
cp -r tmp uploads

