import ImageUploader from "components/ImageUploader";
import React from "react";
import SectionCard from "./SectionCard";

const SkuImageUploader = (props) => {
  const {
    images,
    initialValues,
    onImageAdd,
    onImageDelete,
    onImageEdit,
  } = props;
  return (
    <SectionCard>
      <ImageUploader
        setInitialValue={initialValues}
        onDeleteAll={() => onImageAdd([])}
        onImageDelete={(index) => {
          onImageDelete(images.filter((imageUrl) => imageUrl.index !== index));
        }}
        onImageEdit={(index) => {
          onImageEdit(images.filter((imageUrl) => imageUrl.index !== index));
        }}
        setFieldValue={(addUpdateIndex, imageList, res) => {
          if (images.length > 0) {
            onImageAdd([
              ...images,
              {
                index: addUpdateIndex,
                dataURL: imageList[addUpdateIndex].dataURL,
                url: res,
              },
            ]);
          } else {
            onImageAdd([
              {
                index: addUpdateIndex,
                dataURL: imageList[addUpdateIndex].dataURL,
                url: res,
              },
            ]);
          }
        }}
      />
    </SectionCard>
  );
};

export default SkuImageUploader;
