import TestdriveActions from "../../src/actions/testdrive";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import { RequestReducerState } from "../../src/reducers/utils";
import { getTestdrives } from "../../src/selectors/testdrive";
import TestDriveCard from "../../src/components/TestDriveCard";
import { TestDriveInterface } from "../../src/types/testdrive";

interface StateProps {
  testdrives: TestDriveInterface[];
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
      <div className="body">
        {testdrives.map((testdrive) => (
          <TestDriveCard testdrive={testdrive} />
        ))}
      </div>
      <style jsx>{`
        .container {
          padding: 1em;
          margin: 1em;
          background: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        header {
          font-weight: 500;
          font-size: 1.2rem;
          padding: 0.5em;
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
