import { getProductImageUrl } from "../utils/misc";

interface RelativeImgProps {
  src: string;
}

const RelativeImg = (props: RelativeImgProps) => {
  const src = getProductImageUrl(props.src);

  return (
    <>
      <img src={src} />
      <style jsx>{`
        img {
          display: inline-block;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

export default RelativeImg;
