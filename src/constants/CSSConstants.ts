import Chroma from "chroma-js";

const constants = {
  backgroundColor: "#F0F3F4",
  foregroundColor: "#FFFFFF",
  disabledColor: "#999",
  borderColor: "#ccc",
  primaryColor: "#6c5ce7",
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

constants.lightPrimaryColor = Chroma(constants.primaryColor).brighten(1).css();
constants.borderStyle = `1px solid ${constants.borderColor}`;
constants.hoverTextColor = constants.primaryColor;
constants.hoverColor = Chroma(constants.primaryColor).brighten(3.2).css();

export default constants;
