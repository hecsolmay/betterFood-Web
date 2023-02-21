import { converDate } from "../../utils";

export const TableHeaders = () => (
  <thead>
    <tr>
      <th>Id</th>
      <th>Imagen</th>
      <th>Nombre</th>
      <th>{"Productos Totales"}</th>
      <th>Activo</th>
      <th>Acciones</th>
    </tr>
  </thead>
);

export const TableItems = ({
  categories = [],
  handleDelete,
  handleEdit,
  children,
}) => (
  <tbody>
    {children}
    {console.log("Categorias en Table Items")}
    {console.log(categories.length === 0)}
    {categories.length !== 0
      ? categories.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td className="text-center">
              <img src={c.imgURL} className="image-table" />
            </td>
            <td>{c.name}</td>
            <td>{c.totalProducts}</td>
            <td>{c.active === 1 ? "Si" : "No"}</td>
            <td>
              {c.active === 1 ? (
                <>
                  <button
                    className="btn btn-sm btn-warning btn-addon ms-3"
                    onClick={() => handleEdit(c)}
                  >
                    <i className="fa fa-pen-to-square" />
                  </button>
                  <button
                    className="btn btn-sm btn-danger btn-addon ms-3"
                    onClick={() =>
                      handleDelete({
                        id: c.id,
                        name: c.name,
                        active: c.active,
                      })
                    }
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-sm btn-primary btn-addon ms-3"
                  onClick={() =>
                    handleDelete({
                      id: c.id,
                      name: c.name,
                      active: c.active,
                      category: c,
                    })
                  }
                >
                  <i class="fa fa-arrows-rotate"></i>
                </button>
              )}
            </td>
          </tr>
        ))
      : null}
  </tbody>
);
