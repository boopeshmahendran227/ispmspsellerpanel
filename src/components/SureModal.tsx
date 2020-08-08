import Modal from "./Modal";
import Button from "./atoms/Button";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getSureModalData } from "../selectors/ui";
import UIActions from "../actions/ui";
import { SureModalData } from "../types/ui";
import CSSConstants from "../constants/CSSConstants";

interface StateProps {
  data: SureModalData;
}

interface DispatchProps {
  onSureClicked: () => void;
  onCancelClicked: () => void;
}

type SureModalProps = StateProps & DispatchProps;

const SureModal = (props: SureModalProps) => {
  const handleSureClicked = () => {
    props.onSureClicked();
  };

  const handleCancelClicked = () => {
    props.onCancelClicked();
  };

  return (
    <Modal open={props.data.open} onClose={props.onCancelClicked}>
      <div className="container">
        <header>{props.data.header}</header>
        <div className="body">{props.data.body}</div>
        <div className="note">(Note: This action is irreversible)</div>
        <div className="buttonContainer">
          <Button onClick={handleSureClicked}>Yes, Sure</Button>
          <Button outlined={true} onClick={handleCancelClicked}>
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
        .note {
          margin: 0.4em 0;
          color: ${CSSConstants.dangerColor};
        }
      `}</style>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  data: getSureModalData(state),
});

const mapDispatchToProps: DispatchProps = {
  onSureClicked: UIActions.sureModalSureClicked,
  onCancelClicked: UIActions.sureModalCancelClicked,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SureModal);
