import React from "react";
import { CreateIngredent } from "./";
import { MultiSelect } from "react-multi-select-component";
import { Loader } from "../../common";

const UpdateForm = ({
  categories = [],
  handleFormChange,
  handleFileUpload,
  setSelected,
  selected,
  ingredents,
  setIngredents,
  image,
  uploading = false,
  handleSubmit,
  id = "formUpdate",
  formData = { name: "", ofert: "", price: 0, description: "" },
}) => {
  const handleChange = (ev, index) => {
    if (ev.target.name === "required") {
      ingredents[index] = {
        ...ingredents[index],
        [ev.target.name]: ev.target.checked,
      };
      setIngredents([...ingredents]);
      return;
    }
    ingredents[index] = {
      ...ingredents[index],
      [ev.target.name]: ev.target.value,
    };
    setIngredents([...ingredents]);
  };

  const handleAddCount = () => {
    ingredents.push({ required: true });
    setIngredents([...ingredents]);
  };
  return (
    <form className="row g-3" id={id} onSubmit={(ev) => handleSubmit(ev, 1)}>
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
          value={formData.name}
          onChange={handleFormChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="price" className="form-label">
          precio
        </label>
        <input
          type="number"
          min={0}
          className="form-control"
          id="price"
          name="price"
          required
          value={formData.price}
          onChange={handleFormChange}
        />
      </div>
      <div className="col-12">
        <label htmlFor="description" className="form-label">
          Descripcion
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          maxLength={200}
          required
          value={formData.description}
          name="description"
          onChange={handleFormChange}
        />
      </div>
      <div>
        <p className="form-label">Ingredientes</p>
        <button
          type="button"
          onClick={handleAddCount}
          className="btn btn-sm btn-success mb-3"
        >
          Agregar
        </button>
        {ingredents.map((i, index) => (
          <CreateIngredent
            key={index}
            handleChange={handleChange}
            handleAddCount={handleAddCount}
            required={ingredents[index].required}
            ingredents={ingredents}
            setIngredents={setIngredents}
            index={index}
            item={i}
          />
        ))}
      </div>
      <div className="col-12">
        <label htmlFor="categorias" className="form-label">
          Categorias
        </label>
        {categories && (
          <MultiSelect
            required
            options={categories.map((c) => {
              return { value: c._id, label: c.name };
            })}
            value={selected}
            onChange={setSelected}
            labelledBy="categorias"
          />
        )}
      </div>
      <div className="col-12">
        <label htmlFor="productImage" className="form-label">
          Imagen del Producto
        </label>
        {image && (
          <div className="text-center mt-3 mb-3">
            <img src={image} className="big-image" />
          </div>
        )}
        {uploading && <Loader />}
        <input
          className="form-control form-control-sm"
          id="productImage"
          type="file"
          accept=".jpg,.jpge,.png"
          onChange={handleFileUpload}
        />
      </div>
    </form>
  );
};

export default UpdateForm;
