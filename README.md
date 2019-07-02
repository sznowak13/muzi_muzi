# Muzi Muzi Advert Service

Muzi Muzi is a service for musiscians where You can post musical adverts - 
maybe you are looking for a band in your location, or maybe you are a band
thats looking for a new musician to join You!

Either way Muzi Muzi is a place for You!

## Running server locally

If you are interested in running and testing the backend server located under 'web_app' root below is the short instruction 
how to do it. If you have experience handling virtualenvs and python pip dependencies, and you used postgres, you can skip it
and start playing immediately.

First you will need Python version 3.6+ instaled on your machine, you can download latest Python here:
https://www.python.org/downloads/

Next, you will need PostgreSQL database engine for handling database. You can download and setup it here:
http://www.postgresqltutorial.com/install-postgresql/ -- Windows

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04 -- Ubuntu


Having python installed, open the terminal and go to the directory you cloned the repository.
```
user@your_laptop: ~$ cd path/to/muzi_muzi
user@your_laptop: ~/path/to/muzi_muzi$ 
```

Next install virtualenv package using pip - the python package manager. Should look something like this:
```
user@your_laptop: ~/path/to/muzi_muzi$  pip install virtualenv
Collecting virtualenv
  Downloading https://files.pythonhosted.org/packages/ca/ee/8375c01412abe6ff462ec80970e6bb1c4308724d4366d7519627c98691ab/virtualenv-16.6.0-py2.py3-none-any.whl (2.0MB)
     |████████████████████████████████| 2.0MB 725kB/s 
Installing collected packages: virtualenv
Successfully installed virtualenv-16.6.0
```
Virtualenv will help us isolating all the python dependencies for this project so they wont mess up your global environment.
Let's create a virtual environment and call it 'venv':
```
user@your_laptop: ~/path/to/muzi_muzi$ virtualenv venv
```
Virtualenv will take a while to setup all the python libraries for this env.
After a while you can activate it using:
```
user@your_laptop: ~/path/to/muzi_muzi$ source venv/bin/activate
(venv) user@your_laptop: ~/path/to/muzi_muzi$
```
See the 'venv' before the command line input? That's a sign of virtualenv activated.
Lets install all the packages we need:
```
(venv) user@your_laptop: ~/path/to/muzi_muzi$ pip install -r requirements.txt
```
It will read the requirements file and install all it's content.

Next we need to perform some database magic. First we need to create database.
Having postgres installed, and superuser created we can use psql to access the postgres db.
```
(venv) user@your_laptop: ~/path/to/muzi_muzi$ psql postgres
psql (9.5.17)
Type "help" for help.

postgres=# create database muzi_muzi;
CREATE DATABASE
postgres=# \q
(venv) user@your_laptop: ~/path/to/muzi_muzi$
```
Thats all you need to do with psql. We need to add some environment variables to our system. 
How to:
Windows - https://www.computerhope.com/issues/ch000549.htm
Linux - https://askubuntu.com/questions/58814/how-do-i-add-environment-variables
We need 4 variables:
PSQL_USER_NAME,
PSQL_HOST,
PSQL_PASSWORD,
MUZI_MUZI_DB

After environment varibles are set next thing is to run migrations from the repository.
In the 'web_app' folder run:
```
(venv) user@your_laptop: ~/path/to/muzi_muzi$ cd web_app
(venv) user@your_laptop: ~/path/to/muzi_muzi/web_app$ python manage.py migrate
```
It will run all the migrations for the database.

After that you can start the server with
```
(venv) user@your_laptop: ~/path/to/muzi_muzi$ python manage.py runserver
```
Everything should be fine.

# (Optional) 
If you want to populate database with lots of records, you can use the test data generator module to do that.
NOTE: Before running the generator, you MUST create a dburi.py file in test_data_generator.connection module.
      Copy dburi.example.py and rename it to dburi.py, and replace dummy data with your own database credentials.
      It's because data generator its totally separate from django project, so it uses its own db credentials.
      For example:
  ```python
  class DBURI:
    user = "bob"
    password = "secret123"
    host = "localhost"
    name = "muzi_muzi"
    connection_string = f"postgresql://{user}:{password}@{host}/{name}"

  ```
      
 If your credentials are set, simply run:
 ```
(venv) user@your_laptop: ~/path/to/muzi_muzi$ cd test_data_generator
(venv) user@your_laptop: ~/path/to/muzi_muzi/test_data_generator$ python mocker.py```
```
And follow the prompts from the script.
