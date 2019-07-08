module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'pass',
            database: 'mystore',
            port: 3306
        }
    },
    staging: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'admin',
            password: 'admin',
            database: 'mystore',
            port: 8500
        }
    },
    production: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'admin',
            password: 'admin',
            database: 'mystore',
            port: 8500
        }
    }
};
