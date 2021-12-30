import Image from 'next/image';
import Link from 'next/link';
export default function Home({ posts }) {
  return (
    <>
      <h1>yo</h1>
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>
            <strong>{post.attributes.title} </strong>
            <em>{post.attributes.author.data.attributes.username}</em>
            <br />
            -- {post.attributes.slug} <br />
            {post.attributes.images.data.map((image) => {
              if (image.attributes.formats) {
                return (
                  <Image
                    key={image.id}
                    src={`http://localhost:1337${image.attributes.formats.thumbnail.url}`}
                    alt={image.attributes.url}
                    width={image.attributes.formats.thumbnail.width}
                    height={image.attributes.formats.thumbnail.height}
                  />
                );
              } else {
                return <div key={image.id}>nope</div>;
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
    'http://localhost:1337/api/posts?populate[author][fields][0]=username&populate[images][fields][1]=url&populate[images][fields][2]=formats'
  );
  const posts = await res.json();
  console.log(posts);

  return {
    props: { posts },
  };
}
