import { converDate } from "../../utils";

export const TableHeaders = () => (
  <thead>
    <tr>
      <th>Id</th>
      <th>Imagen</th>
      <th>Nombre</th>
      <th>{"Productos Totales"}</th>
      <th>Editar</th>
      <th>Eliminar</th>
    </tr>
  </thead>
);

export const TableItems = ({ categories = [], handleDelete, handleEdit }) => (
  <tbody>
    {console.log("Categorias en Table Items")}
    {console.log(categories.length === 0)}
    {categories.length !== 0
      ? categories.map((c) => (
          <tr key={c._id}>
            <td>{c._id}</td>
            <td className="text-center">
              <img src={c.imgURL} className="image-table" />
            </td>
            <td>{c.name}</td>
            <td>{c.totalProducts}</td>
            <td>
              <button
                className="btn btn-sm btn-warning btn-addon ms-3"
                onClick={() => handleEdit(c)}
              >
                <i className="fa fa-pen-to-square" />
              </button>
            </td>
            <td>
              <button
                className="btn btn-sm btn-danger btn-addon ms-3"
                onClick={() => handleDelete({ id: c._id, name: c.name })}
              >
                <i className="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        ))
      : null}
  </tbody>
);

export const CategoryForm = ({
  handleFileUpload,
  handleFormChange,
  categoryImg,
}) => (
  <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
    <div className="col-md-6">
      <label htmlFor="name" className="form-label">
        Nombre
      </label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
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

export const CategoryFormUpdate = ({
  handleFileUpload,
  handleFormChange,
  categoryImg,
  name,
}) => (
  <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
    <div className="col-md-6">
      <label htmlFor="name" className="form-label">
        Nombre
      </label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        defaultValue={name}
        onChange={handleFormChange}
      />
    </div>

    <div className="col-12">
      <label htmlFor="categoryImage" className="form-label">
        Cambiar Imagen
      </label>
      <div className="text-center ">
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
