# AlkemyChallenge
Disney Api for discover the world of Disney.

## Description

This is a NodeJS and Express API that allows you to search a database of characters and movies from the world of Disney. As well as adding new records to a database created with mysql.

### Getting started 🚀 

These instructions will allow you to get a working copy of the project on your local machine for development and testing purposes.
See Deployment to learn how to deploy the project.

### Pre requirements 📋  

***NODE:***

Download and install [nodejs](https://nodejs.org/es/).

***MYSQL:***

Download and install [Mysql](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/).
Create a database connection.
Create a database.

***SENDGRID:***

Create an account on [Sendgrid](https://signup.sendgrid.com/).  

## Instalación 🔧  

A series of step-by-step examples that tells you what you need to run to have a developed development environment.
  

1. Clone the repository

```sh
git clone https://github.com/Vogeln7/alkemyChallenge.git
cd alkemyChallenge
```

2. Install NPM packages
```sh
npm install
```
3. Enter you configuration in `config.js`

```js

module.exports={

mysql:{

username:  "YOUR MYSQL USERNAME",
password:  "YOUR MYSQL PASSWORD",
dialect:  "MYSQL",
host:  "YOUR MYSQL HOST"

},
mail_service:{

apiKey:"The API key from SendGrid",
from:"The email you configured and verified as the sender",
templateId:"The templateId you created on Dynamic Templates"

}
};
```
# Deployment 📦	

 1. Populate the DB (optional)
	```sh
	node populate-db.js
	```
 2. Run the server.
	```sh
	npm start
	```
### Usage 🏁

For a detailed explanation on how to use the API please refer to the _[Documentation](https://documenter.getpostman.com/view/9086532/UVeGrmWw)_

  

<p  align="right">(<a  href="#top">back to top</a>)</p>

### Built with🛠️  

**Express** - Web framework

**Mysql** - Database

**Sequelize** - Node ORM for mysql

**SendGrid** - Mail manager to developers

### Autor✒️  

 - [Vogel David](https://github.com/Vogeln7)
 

🎁 Expresiones de Gratitud a: 

 1. [Avalo Juan](https://github.com/JuanAvalo). 
 2. [Agustín Favoretti](https://github.com/Modulariz). 



> Written with [StackEdit](https://stackedit.io/).