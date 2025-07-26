import { readFile, writeFile } from "fs/promises";

const file = new URL('../data.json', import.meta.url);
const buf = await readFile(file, 'utf-8');
const posts = JSON.parse(buf);


export function findAll() {
    return Promise.resolve(posts);
}

export function findById(id) {
    return new Promise((resolve, reject) => {
        const post = posts.find(post => post.id === Number(id));
        if (post) {
            resolve(post);
        } else {
            reject();
        }
    })
}

export async function save(post) {
    try {
        posts.push(post);
        await writeFile(file, JSON.stringify(posts, null, 2));
        Promise.resolve(post);
    } catch (error) {
        Promise.reject(error);
    }
}

export function update(post) {

}

