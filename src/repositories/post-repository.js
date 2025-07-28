import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const file = new URL('../data.json', import.meta.url);
const buf = await readFile(file, 'utf-8');
const posts = JSON.parse(buf);


export function findAll() {
    return Promise.resolve(posts);
}

export function findById(id) {
    // const post = posts.find(post => post.id === Number(id));
    // return Promise.resolve(post);

    return new Promise((resolve, reject) => {
        const post = posts.find(post => post.id === Number(id));
        resolve(post);
    });


}

export function findBySlug(slug) {

    return new Promise((resolve, reject) => {
        const post = posts.find(post => post.slug === slug);
        resolve(post);
    });

}

export async function save(post) {
    return new Promise(async (resolve, reject) => {
        posts.push(post);
        await writeFile(file, JSON.stringify(posts, null, 2));
        resolve(post);
    });
}
export function update(post) {
    return new Promise(async (resolve, reject) => {
        const index = posts.findIndex(p => post.id === p.id);
        posts[index] = { ...post };
        await writeFile(file, JSON.stringify(posts, null, 2));
        resolve(post);
    })
}

export function drop(id) {
    // return new Promise(async (resolve, reject) => {
    //     const index = posts.findIndex(p => Number(id) === p.id);
    //     if (index !== -1) {
    //         const result = posts.splice(index, 1);
    //         await writeFile(file, JSON.stringify(posts, null, 2));
    //         console.log({ index, result });
    //         resolve(result);
    //     } else {
    //         resolve();
    //     }
    // });

    return new Promise(async (resolve, reject) => {
        const result = posts.filter(post => post.id !== Number(id));
        if (result.length !== 0) {
            await writeFile(file, JSON.stringify(result, null, 2));
        }
        resolve();
    });
}