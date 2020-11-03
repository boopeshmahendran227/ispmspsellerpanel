import moment from "moment";
import { useState, useEffect } from "react";
import NotificationBar from "./NotificationBar";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { getUnreadNotificationCount } from "../../selectors/notification";
import NotificationActions from "../../actions/notification";
import LoginActions from "../../actions/login";
import Logo from "../atoms/Logo";
import MobileSideNavBar from "./MobileSideNavBar";
import { Box, Flex, Link, Text, Stack } from "@chakra-ui/core";
import MobileMediaQuery from "components/atoms/MobileMediaQuery";
import DesktopMediaQuery from "components/atoms/DesktopMediaQuery";

interface StateProps {
  unreadNotificationCount: number;
}

interface DispatchProps {
  clearUnreadNotificationCount: () => void;
  logout: () => void;
}

type TopNavBarProps = StateProps & DispatchProps;

const TopNavBar = (props: TopNavBarProps) => {
  const [time, setTime] = useState(moment());
  const [notificationBarOpen, setNotificationBarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 60 * 1000);
    return () => clearInterval(timer);
  });

  const handleNotificationClick = () => {
    props.clearUnreadNotificationCount();
    setNotificationBarOpen(true);
  };

  const handleLogout = () => {
    props.logout();
  };

  return (
    <Box fontSize={["sm", null, "md"]} height="60px">
      <Flex
        px={[1, 3]}
        py={2}
        position="fixed"
        top="0"
        left="0"
        zIndex={10}
        right="0"
        bg="foregroundColor.500"
        boxShadow="md"
        alignItems="center"
      >
        <Box mr={2}>
          <MobileMediaQuery>
            <Box>
              <MobileSideNavBar handleLogout={handleLogout} />
            </Box>
          </MobileMediaQuery>
        </Box>
        <Box flex="1">
          <Logo />
        </Box>
        <Link
          mx={[1, 4]}
          position="relative"
          cursor="pointer"
          key={props.unreadNotificationCount}
          onClick={handleNotificationClick}
        >
          <i className="fas fa-bell"></i>
          {Boolean(props.unreadNotificationCount) && (
            <Box
              as="span"
              position="absolute"
              top="0"
              right="0"
              borderRadius="full"
              bg="dangerColor"
              color="foregroundColor.500"
              w={2}
              h={2}
              lineHeight={2}
              fontSize="sm"
              textAlign="center"
              transform="translate(30%, -30%)"
            >
              {props.unreadNotificationCount}
            </Box>
          )}
        </Link>
        <DesktopMediaQuery>
          <Box>
            <Box>
              <i className="far fa-clock" aria-hidden={true}></i>
              <Box as="span" display="inline-block" mx={1}>
                {time.format("MMM D, hh:mm a")}
              </Box>
            </Box>
          </Box>
          <Link onClick={handleLogout} cursor="pointer">
            <Stack
              mx={2}
              fontSize={"inherit"}
              isInline
              alignItems="baseline"
              spacing={1}
              shouldWrapChildren
            >
              <i className="fas fa-sign-out-alt" aria-hidden={true}></i>
              <Text display="inline-block">Logout</Text>
            </Stack>
          </Link>
        </DesktopMediaQuery>
        <NotificationBar
          open={notificationBarOpen}
          onClose={() => setNotificationBarOpen(false)}
        />
      </Flex>
    </Box>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  unreadNotificationCount: getUnreadNotificationCount(state),
});

const mapDispatchToProps: DispatchProps = {
  clearUnreadNotificationCount:
    NotificationActions.clearUnreadNotificationCount,
  logout: LoginActions.logout,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(TopNavBar);
