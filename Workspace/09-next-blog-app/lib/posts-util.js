import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts'); // process.cwd() points to project root folder

function getPostData(fileName) {
  // read file
  const filePath = path.join(postsDir, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // matter() return an object with two properties,
  // - 'data' property, which contains the metadata as a JavaScript object and
  // - 'content' property which contains the actual content
  const { data, content } = matter(fileContent);

  // create slug name by just removing markdown file extension
  const postSlug = fileName.replace(/\.md$/, '');

  // create post data
  const postData = {
    slug: postSlug,
    ...data, // title, date, image, excerpt, isFeatured
    content: content,
  };

  return postData;
}

export function getAllPosts() {
  // get files
  const postFiles = fs.readdirSync(postsDir);

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  // recent posts at top
  const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
