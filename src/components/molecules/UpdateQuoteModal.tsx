import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { QuoteInterface, QuoteItemUpdate } from "../../types/quote";
import { getCurrentQuote } from "../../selectors/quote";
import { getUpdateQuoteModalOpen } from "../../selectors/ui";
import ProductCard from "../atoms/ProductCard";
import { Formik, Form, FieldArray } from "formik";
import { formatPrice } from "utils/misc";
import UIActions from "../../actions/ui";
import QuoteActions from "../../actions/quote";
import * as Yup from "yup";
import InputLabel from "../atoms/InputLabel";
import FieldPriceInput from "../atoms/FieldPriceInput";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  ButtonGroup,
  Grid,
} from "@chakra-ui/core";

interface StateProps {
  open: boolean;
  currentQuote: QuoteInterface | null;
}

interface DispatchProps {
  updateQuoteRequest: (quoteId: number, items: QuoteItemUpdate[]) => void;
  onClose: () => void;
}

type UpdateQuoteModalProps = StateProps & DispatchProps;

const validationSchema = Yup.object().shape({
  quoteItems: Yup.array().of(
    Yup.object().shape({
      productId: Yup.number(),
      skuId: Yup.string(),
      finalTotalPrice: Yup.number()
        .typeError("Quote value must be a number")
        .positive("Quote value must be greater than 0")
        .required("Quote value is required"),
    })
  ),
});

const UpdateQuoteModal = (props: UpdateQuoteModalProps) => {
  const { currentQuote } = props;

  if (!currentQuote) {
    // Return empty modal
    return (
      <Modal isOpen={props.open} onClose={props.onClose}>
        <div></div>
      </Modal>
    );
  }

  const onSubmit = (values, { resetForm }) => {
    props.updateQuoteRequest(
      currentQuote.id,
      values.quoteItems.map((quoteItem) => ({
        ...quoteItem,
        finalTotalPrice: Number(quoteItem.finalTotalPrice),
      }))
    );
    props.onClose();
    resetForm();
  };

  const handleCancelClicked = () => {
    props.onClose();
  };

  return (
    <Modal isOpen={props.open} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="16px">
        <ModalHeader>Update Quote</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="1em">
          <Formik
            initialValues={{
              quoteItems: currentQuote.productDetails.map(
                (productDetail): QuoteItemUpdate => ({
                  productId: productDetail.productId,
                  skuId: productDetail.skuId,
                  finalTotalPrice: productDetail.price,
                })
              ),
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {({ values }) => (
              <Form>
                <Box>
                  <FieldArray
                    name="quoteItems"
                    render={() => (
                      <Box>
                        {currentQuote.productDetails.map(
                          (productDetail, index) => (
                            <Box>
                              <ProductCard
                                name={productDetail.productDetails.name}
                                image={
                                  productDetail.productDetails
                                    .imageRelativePaths[0]
                                }
                                metaInfo={[
                                  ...productDetail.productDetails.attributeValueIds.map(
                                    (attributeValue) => ({
                                      key: attributeValue.attributeName,
                                      value: attributeValue.value,
                                    })
                                  ),
                                  {
                                    key: "Product Id",
                                    value: productDetail.productId,
                                  },
                                  {
                                    key: "Sku Id",
                                    value: productDetail.skuId,
                                  },
                                  {
                                    key: "Qty",
                                    value: productDetail.qty,
                                  },
                                ]}
                              />
                              <Grid
                                templateColumns="200px 1fr"
                                margin="0.3em 0"
                              >
                                <InputLabel label="Updated Total Quote Value" />
                                <FieldPriceInput
                                  name={`quoteItems[${index}].finalTotalPrice`}
                                  metaInfo={`(${formatPrice(
                                    values.quoteItems[index].finalTotalPrice /
                                      productDetail.qty
                                  )} x ${productDetail.qty} =
                            ${formatPrice(
                              Number(values.quoteItems[index].finalTotalPrice)
                            )})
                              `}
                                />
                              </Grid>
                            </Box>
                          )
                        )}
                      </Box>
                    )}
                  />
                </Box>
                <ButtonGroup>
                  <Button type="submit" variantColor="primaryColorVariant">
                    Update Quote and notify customer
                  </Button>
                  <Button
                    variant="outline"
                    variantColor="successColorVariant"
                    onClick={handleCancelClicked}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Form>
            )}
          </Formik>
        </ModalBody>

        {/* <style jsx>{`
        header {
          margin: 1em 0;
          font-weight: bold;
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .container {
          margin: 1em;
          min-width: 450px;
        }
        .buttonContainer {
          margin-top: 1em;
          text-align: right;
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 200px 1fr;
          margin: 0.3em 0;
        }
      `}</style> */}
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getUpdateQuoteModalOpen(state),
  currentQuote: getCurrentQuote(state),
});

const mapDispatchToProps: DispatchProps = {
  updateQuoteRequest: QuoteActions.updateQuoteRequest,
  onClose: UIActions.hideUpdateQuoteModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UpdateQuoteModal);
