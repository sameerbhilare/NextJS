import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts'); // process.cwd() points to project root folder

// input as either slug for markdown file name with extension
export function getPostData(postIdentifier) {
  // create slug name by just removing markdown file extension
  const postSlug = postIdentifier.replace(/\.md$/, '');

  // read file
  const filePath = path.join(postsDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // matter() return an object with two properties,
  // - 'data' property, which contains the metadata as a JavaScript object and
  // - 'content' property which contains the actual content
  const { data, content } = matter(fileContent);

  // create post data
  const postData = {
    slug: postSlug,
    ...data, // title, date, image, excerpt, isFeatured
    content: content,
  };

  return postData;
}

export function getPostFiles() {
  return fs.readdirSync(postsDir);
}
export function getAllPosts() {
  // get files
  const postFiles = getPostFiles();

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
