import Modal from "./Modal";
import Button from "./Button";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { QuoteInterface, QuoteItemUpdate } from "../types/quote";
import { getCurrentQuote } from "../selectors/quote";
import { getUpdateQuoteModalOpen } from "../selectors/ui";
import ProductCard from "./ProductCard";
import { Formik, Form, FieldArray } from "formik";
import FieldInput from "../components/FieldInput";
import { formatPrice } from "../utils/misc";
import UIActions from "../actions/ui";
import QuoteActions from "../actions/quote";
import * as Yup from "yup";

interface StateProps {
  open: boolean;
  currentQuote: QuoteInterface;
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

  if (!currentQuote) {
    // Return empty modal
    return (
      <Modal open={props.open} onClose={props.onClose}>
        <div></div>
      </Modal>
    );
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className="container">
        <header>Update Quote</header>
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
        >
          {({ values }) => (
            <Form>
              <div className="quotesContainer">
                <FieldArray
                  name="quoteItems"
                  render={() => (
                    <div>
                      {currentQuote.productDetails.map(
                        (productDetail, index) => (
                          <div>
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
                            <FieldInput
                              name={`quoteItems[${index}].finalTotalPrice`}
                              label="Enter Updated Quote Value"
                              metaInfo={`(${formatPrice(
                                values.quoteItems[index].finalTotalPrice /
                                  productDetail.qty
                              )} x ${productDetail.qty} =
                            ${formatPrice(
                              Number(values.quoteItems[index].finalTotalPrice)
                            )})
                              `}
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="buttonContainer">
                <Button isSubmitButton={true}>
                  Update Quote and notify customer
                </Button>
                <Button outlined={true} onClick={handleCancelClicked}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>{`
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
      `}</style>
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
