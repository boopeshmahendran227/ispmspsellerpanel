import Modal from "./Modal";
import Button, { ButtonType } from "./Button";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getSureModalData } from "../selectors/ui";
import UIActions from "../actions/ui";
import { SureModalData } from "../types/ui";

interface StateProps {
  data: SureModalData;
}

interface DispatchProps {
  onClose: () => void;
}

type SureModalProps = StateProps & DispatchProps;

const SureModal = (props: SureModalProps) => {
  const handleSureClicked = () => {
    props.data.onSure();
    props.onClose();
  };

  const handleCancelClicked = () => {
    props.onClose();
  };

  return (
    <Modal open={props.data.open} onClose={props.onClose}>
      <div className="container">
        <header>{props.data.header}</header>
        <p>{props.data.body}</p>
        <div className="buttonContainer">
          <Button type={ButtonType.success} onClick={handleSureClicked}>
            Yes, Sure
          </Button>
          <Button
            type={ButtonType.success}
            outlined={true}
            onClick={handleCancelClicked}
          >
            No, Close
          </Button>
        </div>
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
      `}</style>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  data: getSureModalData(state),
});

const mapDispatchToProps: DispatchProps = {
  onClose: UIActions.hideSureModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SureModal);
