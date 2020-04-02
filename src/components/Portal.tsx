/**
 * Copied from https://levelup.gitconnected.com/react-portals-what-are-they-and-why-should-we-use-them-7c082a62e8fa
 */
import * as React from "react";
import { createPortal } from "react-dom";

export default class Portal extends React.Component {
  state = {
    newElement: null
  };
  portalRoot = null;

  componentDidMount = () => {
    const newElement = document.createElement("div");
    this.portalRoot = document.querySelector(".portalRoot");
    this.portalRoot.appendChild(newElement);
    this.setState({ newElement });
  };

  componentWillUnmount = () => {
    this.portalRoot.removeChild(this.state.newElement);
  };

  render = () => {
    if (!this.state.newElement) {
      return null;
    }

    const { children } = this.props;
    return createPortal(children, this.state.newElement);
  };
}
