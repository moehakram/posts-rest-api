import { request } from 'http';

function main(id) {
    const option = {
        host: 'localhost',
        method: 'PATCH',
        port: 3000,
        path: '/api/posts/' + id
    };

    const client = request(option, function (res) {
        res.addListener('data', data => {
            console.info({ statusCode: res.statusCode });
            console.info(JSON.parse(data));
        });
    });

    client.write(JSON.stringify({
        title: 'Do you know JavaScript or Node.js?',
        image: null,
        content: 'This post is about Node.js',
    }));

    client.end();
}

try {
    const id = process.argv.slice(2)[0] || 81;
    console.log(id);
    main(id);
} catch (error) {
    console.error(error);
}