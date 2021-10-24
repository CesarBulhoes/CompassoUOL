module.exports = {

    "_comment": ``,
  
    "dev": {
      "username": process.env.DB_USERNAME_DEV,
      "password": process.env.DB_PASSWORD_DEV,
      "database": process.env.DB_DATABASE_DEV,
      "host": process.env.DB_HOST_DEV,
      "dialect": "mysql",
      "logging": false
    }
  }
  