
import http from "http";
import { createPost, getPost, getPosts } from "./controllers/post-controller.js";

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    res.setHeader("Content-Type", "application/json");
    if (method === 'GET' && url === '/api/posts') {
        getPosts({ res });
    } else if (method === 'POST' && url === '/api/posts') {
        createPost(req, res);
    } else if (method === 'GET' && url.match(/\/api\/posts\/\w+/)) {
        getPost({ res, id: url.split('/')[3] })
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ data: 'Not Found' }));
    }
});

const port = 3000;
server.listen(port, () => {
    console.info(`server running on port ${port} http://localhost:${port}`);
});