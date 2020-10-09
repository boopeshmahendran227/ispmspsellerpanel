import { SRLWrapper } from "simple-react-lightbox";
import { ImageType } from "react-images-uploading";
import { Box, Image, Link } from "@chakra-ui/core";

interface LightboxProps {
  images: ImageType[];
}

const Lightbox = (props: LightboxProps): JSX.Element => {
  const { images } = props;

  return (
    <SRLWrapper>
      <Box>
        {images.map((image) => (
          <Link key={image.key}>
            <Image src={image.dataURL} style={{ display: "none" }} />
          </Link>
        ))}
      </Box>
    </SRLWrapper>
  );
};

export default Lightbox;
