import Button from "../../src/components/Button";
import FieldInput from "../../src/components/FieldInput";
import FieldTextArea from "../../src/components/FieldTextArea";
import FieldSelect from "../../src/components/FieldSelect";
import { ProductSchema } from "../../src/types/product";
import { RootState } from "../../src/reducers";
import ProductActions from "../../src/actions/product";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import PageLayout from "../../src/layouts/PageLayout";

interface StateProps {}

interface DispatchProps {
  addProduct: (product) => void;
}

type AddProductProps = StateProps & DispatchProps;

const AddProduct = (props: AddProductProps) => {
  const onSubmit = values => {
    props.addProduct({
      ...values
    });
  };

  return (
    <PageLayout>
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {() => (
          <Form>
            <FieldInput id="addProductName" name="name" placeholder="Name" />
            <FieldInput id="addProductBrand" name="brand" placeholder="Brand" />
            <FieldInput
              id="addProductPrice"
              name="price"
              placeholder="Price (including tax)"
              inputPlaceholder="(Selling price inclusive of tax)"
            />
            <FieldTextArea id="address" placeholder="Address" name="address" />
            <FieldInput
              id="addProductQuantity"
              name="quantity"
              placeholder="Quantity"
            />
            <div>
              <Button isSubmitButton={true}>Add</Button>
            </div>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({});

const mapDispatchToProps: DispatchProps = {
  addProduct: ProductActions.addProduct
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
