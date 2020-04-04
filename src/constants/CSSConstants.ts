import Chroma from "chroma-js";

const constants = {
  borderColor: "#ccc",
  primaryColor: "#E74B3C",
  secondaryColor: "#444",
  warningColor: "#FFB100",
  dangerColor: "#ff0000",
  successColor: "#378E3B",
  outlineColor: "#CE0C14",
  primaryTextColor: "#212121",
  secondaryTextColor: "#777",
  hoverColor: "", // This is set down
  hoverTextColor: "", // This is set down
  lightPrimaryColor: "", // This is set down
  borderStyle: "", // This is set down
};

constants.lightPrimaryColor = Chroma(constants.primaryColor).brighten(3).css();
constants.borderStyle = `1px solid ${constants.borderColor}`;
constants.hoverTextColor = constants.primaryColor;
constants.hoverColor = Chroma(constants.primaryColor).brighten(2).css();

export default constants;
