import MyImage from '../components/image';
import Link from 'next/link';
import { STRAPI_URL } from '../config/settings';
export default function Home({ posts }) {
  return (
    <>
      <h1>yo</h1>
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.attributes.slug}`}>
              <a>{post.attributes.title} </a>
            </Link>
            -- <em>{post.attributes.author.data.attributes.username}</em>
            <br />
            {post.attributes.images.data.map((image) => {
              if (image.attributes.formats) {
                return <MyImage image={image} key={image.id} />;
              }
            })}
            {/* <pre>{JSON.stringify(post, null, '\t')}</pre> */}
          </li>
        ))}
      </ul>
      <Link href="/about-us">
        <a>About us</a>
      </Link>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${STRAPI_URL}/api/posts?populate[author][fields][0]=username&populate[images][fields][1]=url&populate[images][fields][2]=formats&populate[images][fields][3]=provider`
  );
  const posts = await res.json();

  return {
    props: { posts },
  };
}
