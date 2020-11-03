import { RootState } from "../../reducers";
import { getLoginState } from "../../selectors/login";
import { connect } from "react-redux";
import Logo from "../atoms/Logo";
import { LoginState } from "../../types/login";
import Loader from "../atoms/Loader";
import { Flex, Box } from "@chakra-ui/core";

interface StateProps {
  loginState: LoginState;
}

type AuthWallProps = StateProps;

const AuthWall = (props: AuthWallProps) => {
  const { loginState } = props;

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      height="full"
      width="full"
      alignItems="center"
      justify="center"
      bg="white"
      zIndex={1001}
      transform={
        loginState !== LoginState.LoggedIn
          ? "translateY(0%)"
          : "translateY(-102%)"
      }
      pointerEvents="none"
      transition="transform 0.23s cubic-bezier(0, 0, 0.3, 1)"
    >
      <Box>
        <Box py={2} px={0}>
          <Logo />
        </Box>
        <Loader height="auto" />
        <Box fontSize={["sm", "md"]} textAlign="center">
          Checking Authentication...
        </Box>
      </Box>
    </Flex>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  loginState: getLoginState(state),
});

export default connect(mapStateToProps)(AuthWall);
