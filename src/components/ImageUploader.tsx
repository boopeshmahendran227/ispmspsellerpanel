import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import styled from "styled-components";
import CSSConstants from "../constants/CSSConstants";
import EditButton from "./atoms/EditButton";
import DeleteButton from "./atoms/DeleteButton";
import Lightbox from "./Lightbox";
import { useLightbox } from "simple-react-lightbox";
import { Maximize2 } from "react-feather";
import { useState } from "react";
import ImageUploadErrorContainer from "./ImageUploadErrorContainer";
import { ErrorsType } from "react-images-uploading";
import SectionHeader from "./atoms/SectionHeader";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";
import api from "../../src/api";
import Loader from "components/Loader";
import { EditImageInterface } from "types/product";

const MAX_NUMBER = 10;
const MAX_MB_FILESIZE = 5 * 1024 * 1024; // 5Mb
const ACCEPT_TYPES = ["jpg", "png", "webp"];

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AddImageButton = styled.button`
  display: inline-block;
  border: 3px dashed ${CSSConstants.borderColor};
  width: 150px;
  height: 150px;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  border-radius: 0.7em;
  transition: all 0.3s;
  &:hover {
    background: ${CSSConstants.backgroundColor};
    border: 3px dashed ${CSSConstants.secondaryColor};
  }
`;

const AddImageHeader = styled.div`
  font-size: 1.1rem;
  color: ${CSSConstants.secondaryColor};
  &:hover {
    text-decoration: underline;
  }
`;

const AddImageSubHeader = styled.div`
  font-size: 0.9rem;
  color: ${CSSConstants.secondaryTextColor};
  margin-top: 0.2em;
`;

const ImageContainer = styled.div`
  background: ${CSSConstants.backgroundColor};
  width: 150px;
  height: 150px;
  overflow: hidden;
  border: 2px solid ${CSSConstants.borderColor};
  position: relative;
  border-radius: 0.7em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
`;

const StyledImageOverlay = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(33, 43, 54, 0.55),
    hsla(0, 0%, 100%, 0)
  );
  text-align: right;
  opacity: 0;
  transition: opacity 0.1s cubic-bezier(0, 0, 0.42, 1);
  pointer-events: none;
  ${ImageContainer}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ExpandIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  padding: 0.5em 0;
`;

interface ImageProps {
  image: ImageType;
  onClick: (image: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Image = (props: ImageProps): JSX.Element => {
  const { image } = props;
  return (
    <ImageContainer onClick={() => props.onClick(image.dataURL as string)}>
      <StyledImg src={image.dataURL} />
      {image.isUploading && (
        <LoadingOverlay>
          <Loader />
        </LoadingOverlay>
      )}
      <StyledImageOverlay>
        <ButtonContainer>
          <EditButton onClick={props.onEdit} color="#fff" size="1.2rem" />
          <DeleteButton onClick={props.onDelete} color="#fff" size="1.2rem" />
        </ButtonContainer>
        <ExpandIconContainer>
          <Maximize2 />
        </ExpandIconContainer>
      </StyledImageOverlay>
    </ImageContainer>
  );
};

const RemoveAllButton = styled.button`
  color: ${CSSConstants.dangerColor};
  text-decoration: underline;
  padding: 0.3em;
  text-transform: capitalize;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2em;
`;

interface ImageUploadInterface {
  value: EditImageInterface[];
  onChange: (images: EditImageInterface[]) => void;
}

type ImageUploaderProps = ImageUploadInterface;

const ImageUploader = (props: ImageUploaderProps): JSX.Element => {
  const { value } = props;

  const setInitUploadState = (
    imageList: ImageListType,
    addUpdateIndex: number[]
  ) => {
    const newImagesList = [...value];
    addUpdateIndex.forEach((index) => {
      newImagesList[index] = {
        ...imageList[index],
        url: null,
        isUploading: true,
        isUploadSuccess: false,
      };
    });
    props.onChange(newImagesList as EditImageInterface[]);
  };

  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setErrorStrings([]);

    if (!addUpdateIndex) {
      props.onChange(imageList as EditImageInterface[]);
      return;
    }

    setInitUploadState(imageList, addUpdateIndex);

    const results = await Promise.all(
      addUpdateIndex.map(async (index) => {
        const formData = new FormData();

        formData.append("file", imageList[index].file as File);

        return api("/users/image/mpl", {
          method: "POST",
          data: formData,
          headers: { "content-Type": "multipart/form-data" },
        })
          .then((url) => {
            return {
              url,
              isSuccess: true,
            };
          })
          .catch(() => {
            return {
              url: null,
              isSuccess: false,
            };
          });
      })
    );

    // Set url and status after upload
    const newImagesList = [...value];
    addUpdateIndex.forEach((updatedIndex, index) => {
      newImagesList[updatedIndex] = {
        ...imageList[updatedIndex],
        url: results[index].url,
        isUploading: false,
        isUploadSuccess: results[index].isSuccess,
      };
    });
    props.onChange(newImagesList as EditImageInterface[]);
  };

  const onError = (errors: ErrorsType) => {
    if (errors == null) {
      return;
    }
    const errorStrings: string[] = [];

    if (errors.acceptType) {
      errorStrings.push(
        "Unsupported File Type. Upload files ending in " +
          ACCEPT_TYPES.map((type) => "." + type).join(", ")
      );
    }
    if (errors.maxNumber) {
      errorStrings.push(
        "Number of Selected Images exceed " +
          MAX_NUMBER +
          ". Maximum number of images allowed is " +
          MAX_NUMBER
      );
    }
    if (errors.maxFileSize) {
      errorStrings.push(
        "Selected File Size exceeds 5 mb. Maximum size allowed for single image is 5mb."
      );
    }
    if (errors.resolution) {
      errorStrings.push("Selected File does not match desired resolution");
    }

    setErrorStrings(errorStrings);
  };

  const { openLightbox } = useLightbox();
  const [errorStrings, setErrorStrings] = useState<string[]>([]);

  return (
    <ImageUploading
      onChange={onChange}
      maxNumber={MAX_NUMBER}
      multiple
      maxFileSize={MAX_MB_FILESIZE}
      acceptType={ACCEPT_TYPES}
      onError={onError}
      value={props.value}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        dragProps,
      }) => (
        <div>
          <HeaderContainer>
            <SectionHeaderContainer>
              <SectionHeader>Images</SectionHeader>
            </SectionHeaderContainer>
            {imageList.length > 0 && (
              <RemoveAllButton
                type="button"
                onClick={() => {
                  onImageRemoveAll();
                }}
              >
                Delete All
              </RemoveAllButton>
            )}
          </HeaderContainer>
          <ImageUploadErrorContainer
            errorStrings={errorStrings}
            onClose={() => setErrorStrings([])}
          />
          <Lightbox images={imageList} />
          <FlexContainer>
            {imageList.map((image: EditImageInterface, index) => (
              <Image
                key={image.key}
                image={image}
                onClick={() => openLightbox(index)}
                onEdit={() => {
                  onImageUpdate(index);
                }}
                onDelete={() => {
                  onImageRemove(index);
                }}
              />
            ))}
            <AddImageButton
              {...dragProps}
              type="button"
              onClick={onImageUpload}
            >
              <AddImageHeader>Add Images</AddImageHeader>
              <AddImageSubHeader>or drop images to upload</AddImageSubHeader>
            </AddImageButton>
          </FlexContainer>
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;
