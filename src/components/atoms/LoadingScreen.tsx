import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import CSSConstants from "../../constants/CSSConstants";
import { getLoadingScreenOpen } from "../../selectors/ui";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Flex,
} from "@chakra-ui/core";
import Loader from "./Loader";

interface StateProps {
  open: boolean;
}

type LoadingScreenProps = StateProps;

const LoadingScreen = (props: LoadingScreenProps) => {
  if (!props.open) {
    return null;
  }

  return (
    <Drawer isOpen={props.open} placement="top" size="full" isFullHeight>
      <DrawerOverlay />
      <DrawerContent background="rgba(255, 255, 255, 0.8)">
        <DrawerBody>
          <Flex direction="column" h="100%" justify="center">
            <Loader />
            <Box textAlign="center" color={CSSConstants.primaryColor}>
              Processing...Please wait
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getLoadingScreenOpen(state),
});

export default connect<StateProps>(mapStateToProps)(LoadingScreen);
