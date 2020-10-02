import { SRLWrapper } from "simple-react-lightbox";
import { ImageType } from "react-images-uploading";

interface LightboxProps {
  images: ImageType[];
}

const Lightbox = (props: LightboxProps): JSX.Element => {
  const { images } = props;

  return (
    <SRLWrapper>
      <div>
        {images.map((image) => (
          <a key={image.key}>
            <img src={image.dataURL} style={{ display: "none" }} />
          </a>
        ))}
      </div>
    </SRLWrapper>
  );
};

export default Lightbox;
