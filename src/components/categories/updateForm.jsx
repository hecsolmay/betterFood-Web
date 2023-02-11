import React from "react";

const FormUpdate = ({
  handleFileUpload,
  handleFormChange,
  categoryImg,
  name,
  handleSubmit,
  uploading = false,
  id = "updateForm",
}) => (
  <form className="row g-3" id={id} onSubmit={handleSubmit}>
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
        defaultValue={name}
        onChange={handleFormChange}
      />
    </div>

    <div className="col-12">
      <label htmlFor="categoryImage" className="form-label">
        Cambiar Imagen
      </label>
      <div className="text-center mt-3 mb-3">
        <img src={categoryImg} className="big-image" />
      </div>
      <input
        className="form-control form-control-sm"
        id="image"
        type="file"
        accept=".jpg,.jpge,.png"
        onChange={handleFileUpload}
      />
    </div>
  </form>
);

export default FormUpdate;
