import { request } from 'http';

function main(id) {
    const option = {
        host: 'localhost',
        method: 'DELETE',
        port: 3000,
        path: '/api/posts/' + id
    };

    const client = request(option, function (res) {
        res.addListener('data', data => {
            console.info({ statusCode: res.statusCode });
            console.info(JSON.parse(data));
        });
    });

    client.end();
}

try {
    const id = process.argv.slice(2)[0];
    main(id);
} catch (error) {
    console.error(error)
}