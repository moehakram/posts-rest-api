import * as postRepository from "../repositories/post-repository.js";

/**
 * @route GET /api/posts
 * @description Get all post
 */
export async function getPosts(req, res) {
    try {
        res.statusCode = 200;
        const posts = await postRepository.findAll();
        res.end(JSON.stringify(posts));
    } catch (error) {
        console.error(error);
    }
}
/**
 * @route GET /api/posts/:id
 * @description Get single post
 */
export async function getPost(req, res, id) {
    try {
        const post = await postRepository.findById(id);

        if (!post) {
            res.statusCode = 404;
            res.end(JSON.stringify({ data: 'Post not found' }));
        } else {
            res.statusCode = 200;
            res.end(JSON.stringify(post));
        }

    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error }));
    }
}
/**
 * @route POST /api/posts
 * @description create post
 */
export async function createPost(req, res) {
    try {
        const errors = {};

        const { title = '', image = '', content = '' } = await getDataByReq(req);

        if (!title) {
            errors.title = 'required';
        }

        if (!content) {
            errors.content = 'required';
        }

        if (Object.keys(errors).length !== 0) {
            res.statusCode = 400;
            res.end(JSON.stringify(errors));
            return;
        }

        let post = await postRepository.findBySlug(slugify(title));

        if (post) {
            res.statusCode = 200;
            res.end(JSON.stringify({ data: 'Post already exist' }));
            return;
        }

        post = await postRepository.save({
            id: Date.now(),
            image: image ?? `/posts/${image}`,
            title,
            slug: slugify(title),
            content,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });

        res.statusCode = 201;
        const json = JSON.stringify(post);
        res.write(json);
        res.end();
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error }));
    }
}
/**
 * @route PATCH /api/posts/:id
 * @description Update post
 */
export async function updatePost(req, res, id) {
    try {
        const reqData = await getDataByReq(req);

        if (!reqData) {
            res.statusCode = 422;
            return res.end(JSON.stringify({ error: "Unprocessable Entity" }));
        }

        const oldData = await postRepository.findById(id);

        if (!oldData) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Not Found" }));
        }

        const updatedData = {
            id: oldData.id,
            image: reqData.image || oldData.image,
            title: reqData.title || oldData.title,
            slug: reqData.title ? slugify(reqData.title) : oldData.slug,
            content: reqData.content || oldData.slug,
            created_at: oldData.created_at,
            updated_at: new Date().toISOString()
        };

        console.log(updatedData);

        const post = await postRepository.update(updatedData);

        res.statusCode = 201;
        res.end(JSON.stringify(post));
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error }));
    }

}
/**
 * @route DELETE /api/posts/:id
 * @description Delete post
 */
export async function deletedPost(req, res, id) {
    try {

        const post = await postRepository.findById(id);

        if (!post) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Post Not Found' }));
            return;
        }

        await postRepository.remove(id);
        res.statusCode = 200;
        res.end(JSON.stringify({ data: `Post '${id}' deleted` }));
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error }));
    }

}

function slugify(text) {
    return text
        .toString()                    // Pastikan input berupa string
        .normalize('NFD')              // Pisahkan huruf dan tanda diakritik (é -> e + ́)
        .replace(/[\u0300-\u036f]/g, '') // Hapus tanda diakritik (accents)
        .toLowerCase()                 // Ubah ke huruf kecil
        .trim()                        // Hapus spasi depan-belakang
        .replace(/\s+/g, '-')          // Ganti spasi dengan tanda strip
        .replace(/[^\w\-]+/g, '')      // Hapus karakter non-alfanumerik kecuali strip
        .replace(/\-\-+/g, '-');       // Ganti multiple strip dengan satu strip
}

function getDataByReq(req) {

    return new Promise((resolve, reject) => {
        try {

            let body = '';

            req.addListener('data', chunk => {
                body += chunk.toString();
            });

            req.addListener('end', () => {
                if (body) {
                    resolve(JSON.parse(body));
                } else {
                    resolve(body)
                }
            });
        } catch (error) {
            reject(error);
        }
    })
}