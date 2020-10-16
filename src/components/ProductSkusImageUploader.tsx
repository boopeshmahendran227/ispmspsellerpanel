import ImageUploader from "./ImageUploader";
import React from "react";
import SectionCard from "./SectionCard";
import SectionHeader from "./atoms/SectionHeader";
import { ErrorMessage } from "formik";
import ValidationErrorMsg from "./ValidationErrorMsg";

const AddImageInput = (props) => {
  const { setFieldValue, onImageDeleteAll, onImageDelete, onImageEdit } = props;
  return (
    <div>
      {props.skus.map((sku, index) => (
        <div className="container">
          <SectionCard>
            <SectionHeader>
              SKU Id: {sku.skuId}(
              {sku.attributeValueIds
                .map(
                  (attributeValueId) =>
                    attributeValueId.attributeName +
                    ":" +
                    attributeValueId.value
                )
                .join(", ")}
              )
            </SectionHeader>
            <ImageUploader
              setInitialValue={[]}
              onDeleteAll={() => onImageDeleteAll(`skus.${index}.images`, [])}
              onImageDelete={(addUpdateIndex) => {
                onImageDelete(
                  `skus.${index}.images`,
                  sku.imageRelativePaths.filter(
                    (image) => image.index !== addUpdateIndex
                  )
                );
              }}
              onImageEdit={(addUpdateIndex) => {
                onImageEdit(
                  `skus.${index}.images`,
                  sku.imageRelativePaths.filter(
                    (image) => image.index !== addUpdateIndex
                  )
                );
              }}
              setFieldValue={(addUpdateIndex, imageList, res) => {
                if (sku.imageRelativePaths.length > 0) {
                  setFieldValue(`skus.${index}.images`, [
                    ...sku.imageRelativePaths,
                    {
                      index: addUpdateIndex,
                      dataURL: imageList[addUpdateIndex].dataURL,
                      isUploaded: true,
                      url: res,
                      name: imageList[addUpdateIndex].file.name,
                    },
                  ]);
                } else {
                  setFieldValue(`skus.${index}.images`, [
                    {
                      index: addUpdateIndex,
                      dataURL: imageList[addUpdateIndex].dataURL,
                      url: res,
                    },
                  ]);
                }
              }}
            />
            <ErrorMessage
              component={ValidationErrorMsg}
              name={`skus.${index}.images`}
            />
          </SectionCard>
          <style jsx>{`
            .container {
              margin-bottom: "1em";
            }
          `}</style>
        </div>
      ))}
    </div>
  );
};

export default AddImageInput;
