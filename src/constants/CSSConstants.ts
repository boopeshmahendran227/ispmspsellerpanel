import Chroma from "chroma-js";

const constants = {
  backgroundColor: "#FAFBFD",
  foregroundColor: "#FFFFFF",
  disabledColor: "#999",
  borderColor: "#ccc",
  primaryColor: "rgb(57, 118, 249)",
  secondaryColor: "#068ff4",
  warningColor: "#d35400",
  dangerColor: "#f94a5b",
  successColor: "#61B246",
  outlineColor: "", // This is set down
  primaryTextColor: "#4d4d4d",
  secondaryTextColor: "#707070",
  hoverColor: "", // This is set down
  hoverTextColor: "", // This is set down
  lightPrimaryColor: "", // This is set down
  borderStyle: "", // This is set down
};

constants.lightPrimaryColor = Chroma(constants.primaryColor)
  .brighten(0.4)
  .css();
constants.borderStyle = `1px solid ${constants.borderColor}`;
constants.hoverTextColor = constants.primaryColor;
constants.hoverColor = Chroma(constants.primaryColor).brighten(3.2).css();
constants.outlineColor = Chroma(constants.primaryColor).brighten(1.9).css();

export default constants;
