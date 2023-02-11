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

export const TableItems = ({ categories = [], handleDelete, handleEdit, children }) => (
  <tbody>
    {children}
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



