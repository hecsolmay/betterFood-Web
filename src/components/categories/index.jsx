export const TableHeaders = () => (
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Imagen</th>
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
    {categories.length !== 0
      ? categories.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td className="text-center image-placeholder">
              <img src={c.imgURL} className="image-table image-placeholder" />
            </td>
            <td>{c.totalProducts}</td>
            <td>{c.active === 1 ? "Si" : "No"}</td>
            <td>
              {c.active === 1 ? (
                <>
                  <div className="ms-3 mt-4">
                    <i
                      className="fa fa-pen-to-square cursor-pointer color-warning "
                      onClick={() => handleEdit(c)}
                    />
                    <i
                      className="fa-solid fa-trash cursor-pointer color-danger ms-3"
                      onClick={() =>
                        handleDelete({
                          id: c.id,
                          name: c.name,
                          active: c.active,
                        })
                      }
                    />
                  </div>
                </>
              ) : (
                <div className="ms-4 mt-4">
                  <i
                    className="fa fa-arrows-rotate cursor-pointer color-green"
                    onClick={() =>
                      handleDelete({ id: c.id, name: c.name, active: c.active })
                    }
                  />
                </div>
              )}
            </td>
          </tr>
        ))
      : null}
  </tbody>
);
