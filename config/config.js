require('dotenv').config()
module.exports = {
  development: {
    database: 'foliage_friend_development',
    dialect: 'postgres'
  },
  test: {
    database: 'foliage_friend_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
