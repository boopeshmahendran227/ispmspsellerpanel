import { capitalizeFirstLetter } from "../utils/misc";

interface ValidationErrorMsgProps {
  children: string;
}

const ValidationErrorMsg = (props: ValidationErrorMsgProps) => {
  return (
    <div>
      {capitalizeFirstLetter(props.children)}
      <style jsx>{`
        div {
          color: red;
          padding: 0.7em 0;
          animation: shake 0.4s 1 linear;
        }
        @keyframes shake {
          0% {
            transform: translate(30px);
          }
          20% {
            transform: translate(-30px);
          }
          40% {
            transform: translate(15px);
          }
          60% {
            transform: translate(-15px);
          }
          80% {
            transform: translate(8px);
          }
          100% {
            transform: translate(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default ValidationErrorMsg;
