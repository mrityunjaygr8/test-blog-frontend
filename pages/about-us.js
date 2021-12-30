import Image from 'next/image';

export default function About({ about }) {
  return (
    <>
      <h1>About Us</h1>
      <div>qwe123</div>
      {about.data.attributes.images.data.map((image) => {
        return (
          <Image
            key={image.id}
            alt={`http://localhost:1337${image.attributes.formats.thumbnail.url}`}
            src={`http://localhost:1337${image.attributes.formats.thumbnail.url}`}
            height={image.attributes.formats.thumbnail.height}
            width={image.attributes.formats.thumbnail.width}
          />
        );
      })}
      <pre>{JSON.stringify(about.data, null, '\t')}</pre>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'http://localhost:1337/api/about-us?populate[images][fields][0]=url&populate[images][fields][1]=formats'
  );
  const about = await res.json();

  return {
    props: { about },
  };
}