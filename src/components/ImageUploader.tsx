import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import styled, { css } from "styled-components";
import CSSConstants from "../constants/CSSConstants";
import EditButton from "./atoms/EditButton";
import DeleteButton from "./atoms/DeleteButton";
import Lightbox from "./Lightbox";
import { useLightbox } from "simple-react-lightbox";
import { Maximize2 } from "react-feather";
import UIActions from "../actions/ui";
import { connect } from "react-redux";
import { useState } from "react";
import ImageUploadErrorContainer from "./ImageUploadErrorContainer";
import { ErrorsType } from "react-images-uploading";
import SectionCard from "./SectionCard";
import SectionHeader from "./atoms/SectionHeader";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";
import api from "../../src/api";
import Loader from "components/Loader";

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

const Container = styled.div`
  width: 820px;
  margin: 2em auto;
  padding: 1em;
  border: 1px solid #f0f0f0;
  position: relative;
`;

interface DropboxProps {
  show: boolean;
  active: boolean;
}

const Dropbox = styled.div<DropboxProps>`
  border: 2px dashed ${CSSConstants.borderColor};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${CSSConstants.secondaryTextColor};
  background: #fff;
  pointer-events: none;
  opacity: 0;
  transition: all 0.2s;
  z-index: 1;
  ${(props) =>
    props.show &&
    css`
      opacity: 1;
    `}
  ${(props) =>
    props.active &&
    css`
      border: 2px dashed ${CSSConstants.secondaryColor};
      color: ${CSSConstants.secondaryColor};
    `}
`;

interface ImageUploadInterface {
  setFieldValue: (addUpdateIndex: number, images, res) => void;
  onImageEdit: (addUpdateIndex: number) => void;
  onImageDelete: (imageList) => void;
  onDeleteAll: () => void;
}

type ImageUploaderProps = ImageUploadInterface;

const ImageUploader = (props: ImageUploaderProps): JSX.Element => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const imageUpload = async (images: ImageListType, addUpdateIndex) => {
    const formData = new FormData();
    formData.append("file", images[addUpdateIndex[0]].file as File);
    const res = await api("/users/image/mpl", {
      method: "POST",
      data: formData,
      headers: { "content-Type": "multipart/form-data" },
    });

    return res;
  };

  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setErrorStrings([]);
    setImages(imageList as never[]);

    if (imageList.length === 0) {
      return;
    }
    if (!addUpdateIndex) {
      return;
    }

    if (imageList.length > 0) {
      setIsUploading(true);
      const res = await imageUpload(imageList, addUpdateIndex);

      props.setFieldValue(addUpdateIndex[0], imageList, res);
      setIsUploading(false);
    }
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
  const [showDropbox, setShowDropbox] = useState(false);
  const [isDropboxActive, setIsDropboxActive] = useState(false);
  const [errorStrings, setErrorStrings] = useState<string[]>([]);

  return (
    <SectionCard>
      <ImageUploading
        onChange={onChange}
        maxNumber={MAX_NUMBER}
        multiple
        maxFileSize={MAX_MB_FILESIZE}
        acceptType={ACCEPT_TYPES}
        onError={onError}
        value={images}
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
            <Dropbox show={showDropbox} active={isDropboxActive}>
              Drop Images here
            </Dropbox>
            <HeaderContainer>
              <SectionHeaderContainer>
                <SectionHeader>Images</SectionHeader>
              </SectionHeaderContainer>

              {imageList.length > 0 && !isUploading && (
                <RemoveAllButton
                  type="button"
                  onClick={() => {
                    onImageRemoveAll();
                    props.onDeleteAll();
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
            {isUploading ? (
              <Loader />
            ) : (
              <FlexContainer>
                {imageList.map((image: ImageType, index) => (
                  <Image
                    key={image.key}
                    image={image}
                    onClick={() => openLightbox(index)}
                    onEdit={() => {
                      onImageUpdate(index);
                      props.onImageEdit(index);
                    }}
                    onDelete={() => {
                      onImageRemove(index);
                      props.onImageDelete(index);
                    }}
                  />
                ))}
                <AddImageButton
                  {...dragProps}
                  type="button"
                  onClick={onImageUpload}
                >
                  <AddImageHeader>Add Images</AddImageHeader>
                  <AddImageSubHeader>
                    or drop images to upload
                  </AddImageSubHeader>
                </AddImageButton>
              </FlexContainer>
            )}
          </div>
        )}
      </ImageUploading>
    </SectionCard>
  );
};

export default ImageUploader;
