import Head from 'next/head';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostFiles } from '../../lib/posts-util';

// e.g. /posts/getting-started-with-nextjs
function PostDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
}

export default PostDetailPage;

export async function getStaticProps(context) {
  const { slug } = context.params;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600, // regenerate at most after 10 mins
  };
}

export async function getStaticPaths() {
  // in this case, data will be prepared on demand when requested
  /*
  return {
    paths: [],
    fallback: 'blocking',
  };*/

  const postFilenames = getPostFiles();
  const slugs = postFilenames.map((postFilename) => postFilename.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false, // false bcz getting all files
  };
}
