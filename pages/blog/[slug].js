import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { STRAPI_URL } from '../../config/settings';
export default function Blog({ post }) {
  return (
    <>
      <h2>{post.attributes.title}</h2>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <ReactMarkdown>{post.attributes.body}</ReactMarkdown>
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
    </>
  );
}

export const getStaticProps = async (context) => {
  const res = await fetch(
    `${STRAPI_URL}/api/posts?populate[author][fields][0]=username&populate[images][fields][1]=url&populate[images][fields][2]=formats&filters[slug][$eq]=${context.params.slug}&populate[images][fields][3]=provider`
  );
  const data = await res.json();
  const post = data.data[0];

  return {
    props: { post },
  };
};

export async function getStaticPaths() {
  const res = await fetch(`${STRAPI_URL}/api/posts`);
  const { data: posts } = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.attributes.slug.toString() },
  }));

  return { paths, fallback: false };
}
