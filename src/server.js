import { createServer } from "http";
import { createPost, deletedPost, getPost, getPosts, updatePost } from "./controllers/post-controller.js";

const server = createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    res.setHeader("Content-Type", "application/json");
    if (method === 'GET' && url === '/api/posts') {
        getPosts(req, res);
    } else if (method === 'GET' && url.match(/\/api\/posts\/\w+/)) {
        getPost(req, res, url.split('/')[3])
    } else if (method === 'POST' && url === '/api/posts') {
        createPost(req, res);
    } else if (method === 'PATCH' && url.match(/\/api\/posts\/\w+/)) {
        updatePost(req, res, url.split('/')[3])
    } else if (method === 'DELETE' && url.match(/\/api\/posts\/\w+/)) {
        deletedPost(req, res, url.split('/')[3])
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ data: 'Not Found' }));
    }
});

const port = 3000;
server.listen(port, () => {
    console.info(`server running on port ${port} http://localhost:${port}`);
});