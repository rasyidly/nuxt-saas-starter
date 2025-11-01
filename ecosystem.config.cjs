module.exports = {
    apps: [
        {
            name: 'app',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            node_args: '-r dotenv/config',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}
