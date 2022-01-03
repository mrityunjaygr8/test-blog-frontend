import Image from 'next/image';
const loader = ({ src, width, quality }) => {
  return src;
};
export default function MyImage({ image }) {
  if (image.attributes.provider === 'local') {
    return (
      <Image
        loader={loader}
        alt={`http://localhost:1337${image.attributes.formats.thumbnail.url}`}
        src={`http://localhost:1337${image.attributes.formats.thumbnail.url}`}
        height={image.attributes.formats.thumbnail.height}
        width={image.attributes.formats.thumbnail.width}
      />
    );
  } else {
    return (
      <Image
        loader={loader}
        alt={image.attributes.formats.thumbnail.url}
        src={image.attributes.formats.thumbnail.url}
        height={image.attributes.formats.thumbnail.height}
        width={image.attributes.formats.thumbnail.width}
      />
    );
  }
}
