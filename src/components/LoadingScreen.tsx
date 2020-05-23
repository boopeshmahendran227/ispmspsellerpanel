import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import CSSConstants from "../constants/CSSConstants";
import { getLoadingScreenOpen } from "../selectors/ui";

interface StateProps {
  open: boolean;
}

type LoadingScreenProps = StateProps;

const LoadingScreen = (props: LoadingScreenProps) => {
  if (!props.open) {
    return null;
  }

  return (
    <div className="container">
      <img className="loader" src="/icons/loader.svg" />
      <div className="msg">Processing...Please wait</div>
      <style jsx>{`
        .container {
          position: fixed;
          background: white;
          z-index: 10001;
          width: 100%;
          height: 100vh;
          opacity: 0.8;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: ${CSSConstants.primaryColor};
        }
        .loader {
          width: 2rem;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getLoadingScreenOpen(state),
});

export default connect<StateProps>(mapStateToProps)(LoadingScreen);
