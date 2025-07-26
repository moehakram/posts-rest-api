import http from 'http';

const client = http.request({
    host: 'localhost',
    method: "POST",
    // method: "GET",
    port: 3000,
    path: '/api/posts'
},
    function (res) {
        res.addListener('data', data => {
            console.info(JSON.parse(data));
            console.info(import.meta.filename);
        });
    });

client.write(JSON.stringify({
    title: 'coba lagi',
    image: null,
    content: new Date().toLocaleString()
}));

client.end();

