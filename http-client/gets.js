import { request } from 'http';

function main() {
    const option = {
        host: 'localhost',
        method: 'GET',
        port: 3000,
        path: '/api/posts'
    };

    const client = request(option, function (res) {
        res.on('data', data => {
            console.info({ statusCode: res.statusCode });
            console.info(JSON.parse(data));
        });
    });

    client.end();
}

try {
    main();
} catch (error) {
    console.error(error);
}