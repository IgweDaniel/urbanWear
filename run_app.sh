#!/bin/bash




start_python_server () {
pipenv run python  manage.py runserver
}

start_react_server () {
cd ./client
yarn start
}

start_python_server & start_react_server