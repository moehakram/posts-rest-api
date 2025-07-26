import * as postRepository from "../repositories/post-repository.js";


/**
 * @desc get all posts
 * @route GET /api/posts
 */
export async function getPosts({ res }) {
    res.statusCode = 200;
    const posts = await postRepository.findAll();
    res.end(JSON.stringify(posts));
}
/**
 * @desc get single posts
 * @route GET /api/posts/:id
 */
export async function getPost({ res, id }) {
    try {
        res.statusCode = 200;
        const post = await postRepository.findById(id);
        res.end(JSON.stringify(post));
    } catch {
        res.statusCode = 404;
        res.end(JSON.stringify({ data: 'Post not found' }));
    }
}

export async function createPost(req, res) {

    const errors = {};
    const body = await getReqData(req);

    try {
        const { image, title, content } = JSON.parse(body);
        if (!title) {
            errors.title = 'required';
        }

        if (!content) {
            errors.content = 'required';
        }

        if (Object.keys(errors) > 0) {
            res.statusCode = 400;
            return res.end(JSON.stringify(errors));
        }

        const post = await postRepository.save({
            id: Date.now(),
            image: image,
            title: title,
            slug: slugify(title),
            content: content,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });

        res.statusCode = 201;
        res.end(JSON.stringify(post));
    } catch (error) {
        res.statusCode = 500;
        console.log(error);
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

function getReqData(req) {

    return new Promise((resolve, reject) => {
        let body = '';

        req.addListener('data', chunk => {
            body += chunk.toString();
        });

        req.addListener('end', () => {
            resolve(body);
        })
    })
}