import Image from 'next/image';
import Link from 'next/link';
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
                if (image.attributes.provider === 'local') {
                  return (
                    <Image
                      key={image.id}
                      alt={`http://localhost:1337${image.attributes.formats.thumbnail.url}`}
                      src={`http://localhost:1337${image.attributes.formats.thumbnail.url}`}
                      height={image.attributes.formats.thumbnail.height}
                      width={image.attributes.formats.thumbnail.width}
                    />
                  );
                } else {
                  return (
                    <Image
                      key={image.id}
                      alt={image.attributes.formats.thumbnail.url}
                      src={image.attributes.formats.thumbnail.url}
                      height={image.attributes.formats.thumbnail.height}
                      width={image.attributes.formats.thumbnail.width}
                    />
                  );
                }
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
    'http://localhost:1337/api/posts?populate[author][fields][0]=username&populate[images][fields][1]=url&populate[images][fields][2]=formats&populate[images][fields][3]=provider'
  );
  const posts = await res.json();
  console.log(posts);

  return {
    props: { posts },
  };
}
