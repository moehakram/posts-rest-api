import { request } from 'http';

function main() {
    const option = {
        host: 'localhost',
        method: 'POST',
        port: 3000,
        path: '/api/posts'
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
    main();
} catch (error) {
    console.error(error)
}

