export const mariaDBOption = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3307,
        user: 'root',
        password: '',
        database: 'Clase_16',
    },
    pool: {
        min: 0,
        max: 7,
    },
}

export const sqliteOption = {
    client: 'sqlite3',
    connection: {
        filename: __dirname + 'ecommerce.sqlite',
    },
    useNullAsDefault: true,
}
