import { readFile, writeFile } from "fs/promises";

const file = new URL('../data/posts.json', import.meta.url);
const buf = await readFile(file, 'utf-8');
const posts = JSON.parse(buf);


export function findAll() {
    return Promise.resolve(posts);
}

export function findById(id) {
    const post = posts.find(post => post.id === Number(id));
    return Promise.resolve(post);
}

export function findBySlug(slug) {
    const post = posts.find(post => post.slug === slug);
    return Promise.resolve(post);
}

export async function save(post) {
    posts.push(post);
    await writeFile(file, JSON.stringify(posts, null, 2));
    return post;
}
export async function update(post) {
    const index = posts.findIndex(p => post.id === p.id);
    posts[index] = { ...post };
    await writeFile(file, JSON.stringify(posts, null, 2));
    return post;
}

export async function remove(id) {
    const index = posts.findIndex(p => Number(id) === p.id);
    if (index === -1) return null;

    const result = posts.splice(index, 1);
    await writeFile(file, JSON.stringify(posts, null, 2));
    return result;
}