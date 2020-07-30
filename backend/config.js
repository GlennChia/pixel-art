const configurations = {
    'local': {
        'port': process.env.PORT_LOCAL || 80
    },
    'development': {
        'port': process.env.PORT_DEV  || 80
    },
    'production': {
        'port': process.env.PORT_PROD  || 80
    }
}

module.exports = configurations;