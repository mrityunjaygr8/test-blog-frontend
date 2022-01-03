import MyImage from '../components/image';
import ReactMarkdown from 'react-markdown';
import { STRAPI_URL } from '../config/settings';

export default function About({ about }) {
  return (
    <>
      <h1>About Us</h1>
      <div>qwe123</div>
      <ReactMarkdown>{about.data.attributes.body}</ReactMarkdown>
      {about.data.attributes.images.data.map((image) => {
        return <MyImage image={image} key={image.id} />;
      })}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${STRAPI_URL}/api/about-us?populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[images][fields][2]=provider`
  );
  const about = await res.json();

  return {
    props: { about },
  };
}
