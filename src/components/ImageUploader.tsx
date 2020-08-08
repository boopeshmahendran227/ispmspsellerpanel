import ImageUploading, { ImageType } from "./ImageUploading";
import styled, { css } from "styled-components";
import CSSConstants from "../constants/CSSConstants";
import EditButton from "./atoms/EditButton";
import DeleteButton from "./atoms/DeleteButton";
import Lightbox from "./Lightbox";
import { useLightbox } from "simple-react-lightbox";
import { Maximize2 } from "react-feather";
import UIActions from "../actions/ui";
import { connect } from "react-redux";
import { FileDrop } from "react-file-drop";
import { useState } from "react";
import ImageUploadErrorContainer from "./ImageUploadErrorContainer";
import { ErrorsType } from "react-images-uploading";
import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";

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
  showSureModal: (
    header: string,
    message: string,
    callback: () => void
  ) => void;
}

const Image = (props: ImageProps): JSX.Element => {
  const { image } = props;
  return (
    <ImageContainer onClick={() => props.onClick(image.dataURL)}>
      <StyledImg src={image.dataURL} />
      <StyledImageOverlay>
        <ButtonContainer>
          <EditButton onClick={image.onUpdate} color="#fff" size="1.2rem" />
          <DeleteButton
            onClick={() =>
              props.showSureModal(
                "Delete Image",
                "Are you sure you want to delete this image?",
                image.onRemove
              )
            }
            color="#fff"
            size="1.2rem"
          />
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

interface DispatchProps {
  showSureModal: (
    header: string,
    message: string,
    callback: () => void
  ) => void;
}

type ImageUploaderProps = DispatchProps;

const ImageUploader = (props: ImageUploaderProps): JSX.Element => {
  const onChange = (imageList) => {
    setErrorStrings([]);
    console.log(imageList);
  };

  const onError = (errors: ErrorsType) => {
    const errorStrings = [];

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
  const [errorStrings, setErrorStrings] = useState([]);

  return (
    <SectionCard>
      <ImageUploading
        onChange={onChange}
        maxNumber={MAX_NUMBER}
        multiple
        maxFileSize={MAX_MB_FILESIZE}
        acceptType={ACCEPT_TYPES}
        onError={onError}
      >
        {({ imageList, onImageUpload, onImageRemoveAll, addFiles }) => (
          <FileDrop
            onFrameDragEnter={() => setShowDropbox(true)}
            onFrameDragLeave={() => setShowDropbox(false)}
            onFrameDrop={() => {
              setShowDropbox(false);
              setIsDropboxActive(false);
            }}
            onDragOver={() => setIsDropboxActive(true)}
            onDragLeave={() => setIsDropboxActive(false)}
            onDrop={(files) => {
              addFiles(files);
              setShowDropbox(false);
              setIsDropboxActive(false);
            }}
          >
            <Dropbox show={showDropbox} active={isDropboxActive}>
              Drop Images here
            </Dropbox>
            <HeaderContainer>
              <SectionHeader>Images</SectionHeader>

              {imageList.length > 0 && (
                <RemoveAllButton
                  onClick={() =>
                    props.showSureModal(
                      "Delete Images",
                      "Are you sure you want to delete all images?",
                      onImageRemoveAll
                    )
                  }
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
              {imageList.map((image: ImageType, index) => (
                <Image
                  key={image.key}
                  image={image}
                  onClick={() => openLightbox(index)}
                  showSureModal={props.showSureModal}
                />
              ))}
              <AddImageButton onClick={onImageUpload}>
                <AddImageHeader>Add Images</AddImageHeader>
                <AddImageSubHeader>or drop images to upload</AddImageSubHeader>
              </AddImageButton>
            </FlexContainer>
          </FileDrop>
        )}
      </ImageUploading>
    </SectionCard>
  );
};

const mapDispatchToProps: DispatchProps = {
  showSureModal: UIActions.showSureModal,
};

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps
)(ImageUploader);
