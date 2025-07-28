import { request } from 'http';

const method = 'DELETE';
const id = 3;

if (method === 'POST') { // create

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
        title: 'you know javascript or nodejs ?',
        image: null,
        content: 'About is nodejs'
    }));

    client.end();

} else if (method === 'PATCH') {  // update
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
        title: 'you know javascript or nodejs ?',
        image: null,
        content: 'About is nodejs'
    }));

    client.end();
} else if (method === 'DELETE') { // delete
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

} else if (method === 'GET') { // get single
    const option = {
        host: 'localhost',
        method: 'GET',
        port: 3000,
        path: '/api/posts/' + id
    };

    const client = request(option, function (res) {
        res.on('data', data => {
            console.info({ statusCode: res.statusCode });
            console.info(JSON.parse(data));
        });
    });

    client.end();
} else { // get all
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




