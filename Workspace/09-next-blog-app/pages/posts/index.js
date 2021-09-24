import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';

function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name='description' content='A list of all programming-related tutorials and posts!' />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
}

export default AllPostsPage;

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    //revalidate: 1800, // regenerate at most after 30min, though not required
  };
}
