import { RootState } from "../../reducers";
import { getLoginState } from "../../selectors/login";
import { connect } from "react-redux";
import Logo from "../atoms/Logo";
import { LoginState } from "../../types/login";
import Loader from "../atoms/Loader";
import classNames from "classnames";

interface StateProps {
  loginState: LoginState;
}

type AuthWallProps = StateProps;

const AuthWall = (props: AuthWallProps) => {
  const { loginState } = props;

  const classes = classNames({
    container: true,
    show: loginState !== LoginState.LoggedIn,
  });

  return (
    <div className={classes}>
      <section className="centerContainer">
        <div className="logoContainer">
          <Logo />
        </div>
        <Loader height="auto" />
        <div className="text">Checking Authentication...</div>
      </section>
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          z-index: 10001;
          transform: translateY(-102%);
          pointer-events: none;
          transition: transform 0.23s cubic-bezier(0, 0, 0.3, 1);
        }
        .container.show {
          transform: translateY(0%);
        }
        .logoContainer {
          padding: 0.7em 0;
        }
        .text {
          font-family:"Lato";
          text-align: center;
          font-size: 1.5rem;
          padding: 0.4em 0;
          color: #202649;
         
        }
        @media print {
          .container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  loginState: getLoginState(state),
});

export default connect(mapStateToProps)(AuthWall);
