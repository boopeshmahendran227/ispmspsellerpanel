import TestdriveActions from "../../src/actions/testdrive";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import { RequestReducerState } from "../../src/reducers/utils";
import { getTestdrives } from "../../src/selectors/testdrive";

interface StateProps {
  testdrives: any[];
  getTestdrivesLoadingState: RequestReducerState;
}

interface DispatchProps {
  getTestdrives: () => void;
}

type TestdrivesProps = StateProps & DispatchProps;

const Testdrives = (props: TestdrivesProps) => {
  const { testdrives } = props;
  return (
    <div className="container">
      <header>Test Drives ({testdrives.length})</header>
      <style jsx>{`
        .container {
          padding: 1em 0;
          margin: 1em auto;
          background: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        header {
          font-weight: 500;
          font-size: 1.2rem;
          padding: 0.5em;
        }
        .productContainer {
          text-align: initial;
          margin: 1em 0;
        }
        .infoHeader {
          font-weight: 500;
        }
        @media (max-width: 800px) {
          .container {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  testdrives: getTestdrives(state),
  getTestdrivesLoadingState: state.testdrive.testdrive,
});

const mapDispatchToProps: DispatchProps = {
  getTestdrives: TestdriveActions.getTestDrives,
};

const mapPropsToLoadData = (props: TestdrivesProps) => {
  return [
    {
      data: props.testdrives,
      fetch: props.getTestdrives,
      loadingState: props.getTestdrivesLoadingState,
    },
  ];
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WithReduxDataLoader(mapPropsToLoadData)(Testdrives));
