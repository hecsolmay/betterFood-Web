import React from "react";
import { Loader } from "../../common";

const Form = ({
  handleFileUpload,
  handleFormChange,
  categoryImg,
  uploading = false,
  handleSubmit,
}) => (
  <form className="row g-3" id="form" onSubmit={handleSubmit}>
    <div className="col-md-6">
      <label htmlFor="name" className="form-label">
        Nombre
      </label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        required
        onChange={handleFormChange}
      />
    </div>

    <div className="col-12">
      <label htmlFor="categoryImage" className="form-label">
        Imagen de la Categoria
      </label>
      {categoryImg && (
        <div className="text-center mt-3 mb-3">
          <img src={categoryImg} className="big-image" />
        </div>
      )}
      {uploading && <Loader />}
      <input
        className="form-control form-control-sm"
        id="image"
        type="file"
        accept=".jpg,.jpge,.png"
        required
        onChange={handleFileUpload}
      />
    </div>
  </form>
);

export default Form;
