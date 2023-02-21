import { CreateIngredent } from "./";
import { MultiSelect } from "react-multi-select-component";
import { Loader } from "../../common";

export const ProductForm = ({
  categories = [],
  handleFormChange,
  handleFileUpload,
  setSelected,
  selected,
  ingredentsData,
  ingredents = [],
  setIngredents,
  image,
  uploading = false,
  handleSubmit,
  selectedIngredent,
  setSelectedIngredent,
}) => {
  const handleChange = (ev, id) => {
    const index = ingredents.findIndex((i) => i.id == id);

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

  const handleAddIngredent = (item = []) => {
    if (item.length === 0) {
      return setIngredents([]);
    }

    let indexIngredents = ingredents.map((i) => i.id);

    console.log(indexIngredents);
    let newIngredents = item.filter((i) => !indexIngredents.includes(i.value));

    console.log(newIngredents);

    let cleanIngredents = newIngredents.map((i) => {
      return {
        name: i.label,
        id: i.value,
        required: true,
      };
    });

    cleanIngredents.push(...ingredents);

    setIngredents(cleanIngredents);
  };

  const handleDeleteIngredent = (id) => {
    const indexSelected = selectedIngredent.findIndex((s) => s.value == id);
    const indexIngredents = ingredents.findIndex((i) => i.id == id);
    console.log(indexSelected);
    console.log(indexIngredents);
    selectedIngredent.splice(indexSelected, 1);
    ingredents.splice(indexIngredents, 1);
    setSelectedIngredent(selectedIngredent);
    setIngredents([...ingredents]);
  };
  return (
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
          name="description"
          onChange={handleFormChange}
        />
      </div>
      <div>
        <p className="form-label">Ingredientes</p>
        {ingredentsData && (
          <>
            <MultiSelect
              required
              options={ingredentsData.map((i) => {
                return { value: i.id, label: i.name };
              })}
              value={selectedIngredent}
              onChange={(item) => {
                console.log(item);
                setSelectedIngredent(item);
                handleAddIngredent(item);
              }}
              labelledBy="Ingredientes"
              className="multiselect"
            />
            {ingredents.map((i) => {
              return (
                <CreateIngredent
                  key={i.id}
                  required={i.required}
                  name={i.name}
                  id={i.id}
                  handleDeleteIngredent={handleDeleteIngredent}
                  handleChange={handleChange}
                />
              );
            })}
          </>
        )}
      </div>
      <div className="col-12">
        <label htmlFor="categorias" className="form-label">
          Categorias
        </label>
        {categories && (
          <MultiSelect
            required
            options={categories.map((c) => {
              return { value: c.id, label: c.name };
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
          // required
          onChange={handleFileUpload}
        />
      </div>
    </form>
  );
};
