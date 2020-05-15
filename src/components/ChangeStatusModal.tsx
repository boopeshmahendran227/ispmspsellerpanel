import Button from "./Button";
import FieldSelect from "./FieldSelect";
import { Formik, Form } from "formik";
import Modal from "./Modal";
import { connect } from "react-redux";
import OrderActions from "../actions/order";
import { OrderInterface, OrderItemInterface } from "../types/order";
import { getOrders } from "../selectors/order";
import { RootState } from "../reducers";
import ProductCard from "./ProductCard";
import { OrderStatus } from "../types/order";

interface StateProps {
  orders: OrderInterface[];
}

interface DispatchProps {
  changeOrderItemStatus: any;
}

interface OwnProps {
  open: boolean;
  onClose: () => void;
  order: OrderInterface;
  orderItem: OrderItemInterface;
}

type ChangeStatusModalProps = StateProps & DispatchProps & OwnProps;

const ChangeStatusModal = (props: ChangeStatusModalProps) => {
  const { open, onClose, orderItem } = props;

  if (!orderItem) {
    return null;
  }

  const onSubmit = (values, { resetForm }) => {
    props.changeOrderItemStatus(
      props.order.id,
      props.orderItem.id,
      values.orderItemStatus
    );
    props.onClose();
    resetForm();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Formik
        initialValues={{
          orderItemStatus: orderItem.orderItemStatus,
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <header>Change Order Item Status</header>
            <div className="container">
              <ProductCard
                name={orderItem.productSnapshot.productName}
                image={orderItem.productSnapshot.images[0]}
                metaInfo={orderItem.productSnapshot.attributeValues.map(
                  (attributeValue) => ({
                    key: attributeValue.attributeName,
                    value: attributeValue.value,
                  })
                )}
              />
              <div className="row">
                <div className="name">Product Id:</div>
                <div className="value">{orderItem.productId}</div>
              </div>
              <div className="row">
                <div className="name">SKU Id:</div>
                <div className="value">{orderItem.qty}</div>
              </div>
              <div className="row">
                <div className="name">Qty:</div>
                <div className="value">{orderItem.qty}</div>
              </div>
              <FieldSelect
                id="changeOrderItemStatus"
                name="orderItemStatus"
                placeholder="Order Item Status"
              >
                {Object.values(OrderStatus).map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </FieldSelect>
              <Button isSubmitButton={true}>Change</Button>
            </div>
          </Form>
        )}
      </Formik>
      <style jsx>{`
        header {
          font-size: 1.5rem;
          padding: 0.5em;
        }
        .container {
          padding: 0.5em;
        }
        .row {
          display: grid;
          grid-template-columns: 100px auto;
        }
        .row .name {
          font-weight: 700;
        }
      `}</style>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  orders: getOrders(state),
});

const mapDispatchToProps: DispatchProps = {
  changeOrderItemStatus: OrderActions.changeOrderItemStatus,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChangeStatusModal);
