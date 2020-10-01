import { useEffect, useRef } from "react";
import classNames from "classnames";
import CSSConstants from "../../constants/CSSConstants";
import Portal from "../Portal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const modalRef = useRef(null);

  const handleKeyUp = (e) => {
    if (e.keyCode === 27) {
      // handle esc key close
      props.onClose();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  // Focus first input on modal open
  useEffect(() => {
    // if (!props.open) {
    //   return;
    // }
    // const firstFocusableModalElement = modalRef.current.querySelector(
    //   "button, textarea, input, select"
    // );
    // firstFocusableModalElement?.focus();
  }, [props.open]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    // Check if event came from the target, not a bubbled one
    if (e.target === e.currentTarget) {
      props.onClose();
      e.stopPropagation();
    }
  };

  const handleCloseBtnClick = (e) => {
    e.preventDefault();
    props.onClose();
  };

  const modalContainerClasses = classNames({
    modalContainer: true,
    open: props.open,
  });

  return (
    <Portal>
      <section className={modalContainerClasses} onClick={handleOutsideClick}>
        <div className="modal" ref={modalRef}>
          <a href="#0" className="closeBtn" onClick={handleCloseBtnClick}>
            <span className="leftright"></span>
            <span className="rightleft"></span>
          </a>
          {props.children}
        </div>
        <style jsx global>
          {`
            html.perspective {
              height: 100vh;
              overflow: hidden;
              perspective: 600px;
              background: #222;
            }
            body.open {
              height: 100vh;
              overflow: hidden;
            }
          `}
        </style>
        <style jsx>{`
          .modalContainer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            transition: all 0.5s;
          }
          .modalContainer.open {
            opacity: 1;
            pointer-events: auto;
            transform-style: preserve-3d;
            transform-origin: 50% 100%;
          }
          .modal {
            position: fixed;
            background: white;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -200%);
            opacity: 0;
            max-height: 95vh;
            overflow: auto;
            box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
              0 9px 46px 8px rgba(0, 0, 0, 0.12),
              0 11px 15px -7px rgba(0, 0, 0, 0.2);
            border-radius: 0.5em;
          }
          .modalContainer.open .modal {
            transform: translate(-50%, -50%);
            opacity: 1;
            transition: all 0.5s 0.1s;
          }
          .closeBtn {
            width: 1.3rem;
            height: 1.3rem;
            position: absolute;
            right: 1rem;
            top: 1rem;
          }
          .leftright,
          .rightleft {
            height: 4px;
            width: 1.3rem;
            position: absolute;
            top: calc(50% - 2px);
            left: 0;
            background-color: ${CSSConstants.primaryColor};
            border-radius: 2px;
            transition: all 0.3s ease-in;
          }
          .leftright {
            transform: rotate(45deg);
          }
          .rightleft {
            transform: rotate(-45deg);
          }
        `}</style>
      </section>
    </Portal>
  );
};

export default Modal;
