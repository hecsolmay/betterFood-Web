import React from "react";

const handleSubmitDefault = () => alert("default Pressed");

const Modal = ({
  title = "",
  action = "",
  handleSubmit = handleSubmitDefault,
  btnClass = "btn btn-primary",
  id,
  resetForm,
  children,
}) => (
  <div
    className="modal fade"
    id={id}
    tabIndex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="ModalLabel">
            {title}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={resetForm}
          >
            Cerrar
          </button>
          <button type="button" onClick={handleSubmit} className={btnClass}>
            {action}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
