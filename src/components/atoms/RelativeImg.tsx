import { getProductImageUrl } from "utils/url";
import { Image } from "@chakra-ui/core";

interface RelativeImgProps {
  src: string;
}

const RelativeImg = (props: RelativeImgProps) => {
  const src = getProductImageUrl(props.src);

  return (
    <Image
      display="inline-block"
      maxW="100%"
      maxH="100%"
      objectFit="contain"
      src={src}
    />
  );
};

export default RelativeImg;
