/*
  This is Catch-All route.
  The spread operator (...) tells NextJS to treat this file in a special way (i.e. to catch all)
  and redirects all requests within ourdomain.com/blog/* to this function.
  e.g. 
    ourdomain.com/blog, 
    ourdomain.com/blog/some-blog-id,
    ourdomain.com/blog/2021/01
    etc.
*/
import { useRouter } from 'next/router';

function BlogPostsPage() {
  const router = useRouter();

  /*
    Here 'router.query' returns 'slug' property (name of this file) with
    value as array of string for different segments caught by it.
    e.g. 
      For ourdomain.com/blog/2021, => router.query = {slug: ["2021"]}
      For ourdomain.com/blog/2021/01, => router.query = {slug: ["2021","01"]}
  */
  console.log(router.query);

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}

export default BlogPostsPage;
