import React from "react";
import Toast from "./Toast";
import Portal from "./Portal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { ToastDataInterface } from "../types/toast";
import ToastActions from "../actions/toast";
import { getToasts } from "../selectors/toast";
import { RootState } from "../reducers";

interface StateProps {
  toasts: ToastDataInterface[];
}

interface DispatchProps {
  remove: (id: string) => void;
}
interface OwnProps {
  children: React.ReactNode;
}

type ToastProviderProps = StateProps & DispatchProps & OwnProps;

function ToastProvider(props: ToastProviderProps) {
  return (
    <>
      {props.children}
      <Portal>
        <div className="toastsWrapper">
          <TransitionGroup component={null}>
            {props.toasts.map((toast) => (
              <CSSTransition timeout={500} classNames="toast" key={toast.id}>
                <Toast data={toast} remove={() => props.remove(toast.id)} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </Portal>
      <style jsx>{`
        .toastsWrapper {
          position: fixed;
          top: 1%;
          right: 1%;
          z-index: 10001;
        }
        :global(.toast-enter) {
          opacity: 0;
          transform: translateX(120%);
        }
        :global(.toast-enter-active) {
          opacity: 1;
          transform: translateX(0);
          transition: all 0.5s cubic-bezier(0, 0, 0.31, 1);
        }
        :global(.toast-exit) {
          opacity: 1;
          transform: translateX(0);
        }
        :global(.toast-exit-active) {
          opacity: 0;
          transform: translateX(120%);
          transition: all 0.5s cubic-bezier(0, 0, 0.31, 1);
        }
      `}</style>
    </>
  );
}

const mapStateToProps = (state: RootState): StateProps => ({
  toasts: getToasts(state),
});

const mapDispatchToProps: DispatchProps = {
  remove: ToastActions.removeToast,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ToastProvider);
