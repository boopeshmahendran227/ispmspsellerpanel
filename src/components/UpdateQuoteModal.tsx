import Modal from "./Modal";
import Button from "./Button";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import UIActions from "../actions/ui";
import CSSConstants from "../constants/CSSConstants";
import { QuoteInterface } from "../types/quote";
import { getCurrentQuote } from "../selectors/quote";
import { getUpdateQuoteModalOpen } from "../selectors/ui";
import ProductCard from "./ProductCard";
import { Formik, Form } from "formik";
import FieldInput from "../components/FieldInput";

interface StateProps {
  open: boolean;
  currentQuote: QuoteInterface;
}

interface DispatchProps {
  onClose: () => void;
}

type UpdateQuoteModalProps = StateProps & DispatchProps;

const UpdateQuoteModal = (props: UpdateQuoteModalProps) => {
  const { currentQuote } = props;

  const onSubmit = () => {
    props.onClose();
  };

  const handleCancelClicked = () => {
    props.onClose();
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className="container">
        <header>Update Quote</header>
        <Formik initialValues={{}} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div className="quotesContainer">
                {currentQuote.productDetails.map((productDetail) => (
                  <>
                    <ProductCard
                      name={productDetail.productDetails.name}
                      image={productDetail.productDetails.imageRelativePaths[0]}
                      attributeValues={
                        productDetail.productDetails.attributeValueIds
                      }
                    />
                    <div>Product Id: {productDetail.productId}</div>
                    <div>SKU Id: {productDetail.skuId}</div>
                    <FieldInput
                      id="addProductName"
                      name="name"
                      placeholder="Enter Updated Quote Value"
                    />
                  </>
                ))}
              </div>
              <div className="note">(Note: This action is irreversible)</div>
              <div className="buttonContainer">
                <Button onClick={onSubmit} isSubmitButton={true}>
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
          min-width: 270px;
        }
        .buttonContainer {
          text-align: right;
        }
        .note {
          margin: 0.4em 0;
          color: ${CSSConstants.dangerColor};
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
  onClose: UIActions.hideUpdateQuoteModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UpdateQuoteModal);
