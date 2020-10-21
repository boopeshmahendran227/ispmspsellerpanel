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
import { Box, Flex, Link, Text } from "@chakra-ui/core";
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
    <Box fontSize={["sm", "sm", "md"]}>
      <Flex
        height="60px"
        px={[1, 2, 3, 5]}
        py={2}
        position="fixed"
        top="0"
        left="0"
        zIndex={10}
        alignItems="center"
        right="0"
        bg="foregroundColor"
        boxShadow="md"
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
              color="foregroundColor"
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
              <Box as="span" display="inline-block">
                {time.format("MMM D, hh:mm a")}
              </Box>
            </Box>
          </Box>
          <Box mx={3} fontSize={"inherit"}>
            <Link onClick={handleLogout} cursor="pointer">
              <i className="fas fa-sign-out-alt" aria-hidden={true}></i>
              <Text display="inline-block">Logout</Text>
            </Link>
          </Box>
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
