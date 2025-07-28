# POSTS REST API

Just a simple REST API made with plain old Node.js — no frameworks, no fancy stuff.
Supports full CRUD for posts: create, read, update, delete.

Made this mainly to mess around and learn how REST APIs work from scratch.

---

## Installation

```bash
git clone https://github.com/moehakram/posts-rest-api.git
cd posts-rest-api
```
### Running the server

To start the server:

```
npm start
```
Or manually run:

```
node src/server.js
```

The server will be available at: http://localhost:3000

---

## API Endpoints

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/posts`     | Retrieve all posts           |
| GET    | `/api/posts/:id` | Retrieve a single post by ID |
| POST   | `/api/posts`     | Create a new post            |
| PATCH  | `/api/posts/:id` | Update a post by ID          |
| DELETE | `/api/posts/:id` | Delete a post by ID          |

---

## Sample Request – Get a Post

Here’s an example using Node's http module:

```js
import { request } from 'http';

function main(id) {
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
}


try {
    const id = process.argv.slice(2)[0];
    main(id);
} catch (error) {
    console.error(error)
}
```
## Running HTTP Client Scripts
Once the server is running at http://localhost:3000, you can try out the built-in client scripts:

```
node http-client/get.js 1753707641655
```
output:
```
{ statusCode: 200 }
{
  id: 1753707641655,
  image: '/posts/null',
  title: 'Do you know JavaScript or Node.js?',
  slug: 'do-you-know-javascript-or-nodejs',
  content: 'This post is about Node.js',
  created_at: '2025-07-28T13:00:41.655Z',
  updated_at: '2025-07-28T13:00:41.655Z'
}

```
More examples are available inside the http-client/ folder:

- gets.js — get all posts

- get.js — get post by ID

- post.json — create post

- patch.json — update post

- delete.json — delete post
---