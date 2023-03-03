export const TableHeaders = () => (
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Ordenado</th>
      <th>Activo</th>
      <th>Acciones</th>
    </tr>
  </thead>
);

export const TableItems = ({
  products = [],
  handleEdit,
  handleDelete,
  children,
}) => (
  <tbody>
    {products.map((p) => (
      <tr key={p.id}>
        <td>{p.name}</td>
        <td>{p.price}</td>
        <td>{p.ordered}</td>
        {children}
        <td>{p.active === 1 ? "Si" : "No"}</td>
        <td>
          {p.active === 1 ? (
            <>
              <div className="ms-3">
                <i
                  className="fa fa-pen-to-square cursor-pointer color-warning "
                  onClick={() => handleEdit(p)}
                />
                <i
                  className="fa-solid fa-trash cursor-pointer color-danger ms-3"
                  onClick={() =>
                    handleDelete({ id: p.id, name: p.name, active: p.active })
                  }
                />
              </div>
            </>
          ) : (
            <div className="ms-4">
              <i
                className="fa fa-arrows-rotate cursor-pointer color-green"
                onClick={() =>
                  handleDelete({ id: p.id, name: p.name, active: p.active })
                }
              />
            </div>
          )}
        </td>
      </tr>
    ))}
  </tbody>
);

export const CreateIngredent = ({
  handleChange,
  required,
  id = 1,
  handleDeleteIngredent,
  name,
  price,
}) => (
  <div className="input-group mt-3 ps-4 back-multiselect">
    <input
      type="checkbox"
      name="required"
      defaultChecked
      className="form-check-input mt-2 "
      id={`check${id}`}
      onChange={(ev) => handleChange(ev, id)}
    />
    <input
      type="text"
      className="form-control me-2 ms-3"
      readOnly="readonly"
      name="name"
      value={name}
      placeholder="Nombre"
      required
    />

    {!required && (
      <input
        type="number"
        className="form-control me-2"
        name="extraPrice"
        onChange={(ev) => handleChange(ev, id)}
        placeholder="Precio extra"
        // value={price ? price : 0}
        defaultValue={price ? price : 0}
        min={0}
        required
      />
    )}
    <button
      type="button"
      className="btn btn-sm btn-danger btn-addon"
      onClick={() => handleDeleteIngredent(id)}
    >
      Eliminar
    </button>
  </div>
);
