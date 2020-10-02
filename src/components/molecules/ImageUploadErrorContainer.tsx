import styled from "styled-components";
import Chroma from "chroma-js";
import CSSConstants from "../../constants/CSSConstants";
import { XOctagon } from "react-feather";
import AnimateHeight from "react-animate-height";
import CloseButton from "../atoms/CloseButton";

const ErrorContainer = styled.div`
  padding: 1em;
  margin: 1em 0;
  background: ${Chroma(CSSConstants.dangerColor).brighten(3.1).css()};
  border-radius: 0.4em;
  position: relative;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
`;

const ErrorHeader = styled.span`
  color: ${CSSConstants.dangerColor};
  font-size: 1.3rem;
  font-weight: bold;
  display: inline-block;
  padding: 0.3em;
`;

const ErrorHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorBody = styled.ul`
  margin: 0.2em;
  padding: 0.2em 4em;
`;

interface ImageUploadErrorContainerProps {
  errorStrings: string[];
  onClose: () => void;
}

const ImageUploadErrorContainer = (
  props: ImageUploadErrorContainerProps
): JSX.Element => {
  const { errorStrings } = props;

  return (
    <AnimateHeight height={errorStrings.length === 0 ? 0 : "auto"}>
      <ErrorContainer>
        <CloseButtonContainer>
          <CloseButton onClick={props.onClose} />
        </CloseButtonContainer>
        <ErrorHeaderContainer>
          <XOctagon color={CSSConstants.dangerColor} />
          <ErrorHeader>{"Selected Images couldn't be added"}</ErrorHeader>
        </ErrorHeaderContainer>
        <ErrorBody>
          {errorStrings.map((str) => (
            <li key={str}>{str}</li>
          ))}
        </ErrorBody>
      </ErrorContainer>
    </AnimateHeight>
  );
};

export default ImageUploadErrorContainer;
