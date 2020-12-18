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
  SimpleGrid,
  Stack,
} from "@chakra-ui/core";
import Button from "components/atoms/Button";

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
        <Box></Box>
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
    <Modal isOpen={props.open} onClose={props.onClose} size={["xs", "md"]}>
      <ModalOverlay />
      <ModalContent borderRadius={10} p={3}>
        <ModalHeader fontSize={["md", "lg"]}>Update Quote</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
                            <Box key={productDetail.id}>
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
                              <SimpleGrid columns={[1, 2]} alignItems="center">
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
                              </SimpleGrid>
                            </Box>
                          )
                        )}
                      </Box>
                    )}
                  />
                </Box>
                <Stack spacing={3} mt={3}>
                  <Box>
                    <Button type="submit">
                      Update Quote and notify customer
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="outline"
                      variantColor="dangerColorVariant"
                      onClick={handleCancelClicked}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalBody>
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
