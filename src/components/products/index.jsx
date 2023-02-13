// export const ProductForm = ({
//   categories = [],
//   handleFormChange,
//   handleFileUpload,
//   setSelected,
//   selected,
//   ingredents,
//   setIngredents,
//   image,
// }) => {
//   const handleChange = (ev, index) => {
//     if (ev.target.name === "required") {
//       ingredents[index] = {
//         ...ingredents[index],
//         [ev.target.name]: ev.target.checked,
//       };
//       setIngredents([...ingredents]);
//       return;
//     }
//     ingredents[index] = {
//       ...ingredents[index],
//       [ev.target.name]: ev.target.value,
//     };
//     setIngredents([...ingredents]);
//   };

//   const handleAddCount = () => {
//     ingredents.push({ required: true });
//     setIngredents([...ingredents]);
//   };
//   return (
//     <form className="row g-3">
//       <div className="col-md-6">
//         <label htmlFor="name" className="form-label">
//           Nombre
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="name"
//           name="name"
//           onChange={handleFormChange}
//         />
//       </div>
//       <div className="col-md-6">
//         <label htmlFor="price" className="form-label">
//           precio
//         </label>
//         <input
//           type="number"
//           min={0}
//           className="form-control"
//           id="price"
//           name="price"
//           onChange={handleFormChange}
//         />
//       </div>
//       <div className="col-12">
//         <label htmlFor="description" className="form-label">
//           Descripcion
//         </label>
//         <textarea
//           className="form-control"
//           id="description"
//           rows="3"
//           maxLength={200}
//           name="description"
//           onChange={handleFormChange}
//         />
//       </div>
//       <div>
//         <p className="form-label">Ingredientes</p>
//         <button
//           type="button"
//           onClick={handleAddCount}
//           className="btn btn-sm btn-success mb-3"
//         >
//           Agregar
//         </button>
//         {ingredents.map((i, index) => (
//           <CreateIngredent
//             handleChange={handleChange}
//             handleAddCount={handleAddCount}
//             required={ingredents[index].required}
//             ingredents={ingredents}
//             setIngredents={setIngredents}
//             index={index}
//             item={i}
//           />
//         ))}
//       </div>
//       <div className="col-12">
//         <label htmlFor="categorias" className="form-label">
//           Categorias
//         </label>
//         {categories && (
//           <MultiSelect
//             options={categories.map((c) => {
//               return { value: c._id, label: c.name };
//             })}
//             value={selected}
//             onChange={setSelected}
//             labelledBy="categorias"
//           />
//         )}
//       </div>
//       <div className="col-12">
//         <label htmlFor="productImage" className="form-label">
//           Imagen del Producto
//         </label>
//         {image && (
//           <div className="text-center mt-3 mb-3">
//             <img src={image} className="big-image" />
//           </div>
//         )}
//         <input
//           className="form-control form-control-sm"
//           id="productImage"
//           type="file"
//           accept=".jpg,.jpge,.png"
//           onChange={handleFileUpload}
//         />
//       </div>
//     </form>
//   );
// };

export const TableHeaders = () => (
  <thead>
    <tr>
      <th>id</th>
      <th>nombre</th>
      <th>precio</th>
      <th>ordenado</th>
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
      <tr key={p._id}>
        <td>{p._id}</td>
        <td>{p.name}</td>
        <td>{p.price}</td>
        <td>{p.ordered}</td>
        {children}
        <td>{p.active === 1 ? "Si" : "No"}</td>
        <td>
          {p.active === 1 ? (
            <>
              <button
                className="btn btn-sm btn-warning btn-addon ms-3"
                onClick={() => handleEdit(p)}
              >
                <i className="fa fa-pen-to-square" />
              </button>
              <button
                className="btn btn-sm btn-danger btn-addon ms-3"
                onClick={() =>
                  handleDelete({ id: p._id, name: p.name, active: p.active })
                }
              >
                <i className="fa-solid fa-trash" />
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm btn-primary btn-addon ms-3"
              onClick={() =>
                handleDelete({ id: p._id, name: p.name, active: p.active })
              }
            >
              <i class="fa fa-arrows-rotate"></i>
            </button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
);

export const CreateIngredent = ({
  handleChange,
  handleAddCount,
  required,
  index,
  ingredents,
  setIngredents,
  item,
}) => (
  <div className="input-group mt-2">
    <input
      type="checkbox"
      name="required"
      defaultChecked
      className="form-check-input mt-2 "
      id={`check${index}`}
      onChange={(ev) => handleChange(ev, index)}
    />
    <input
      type="text"
      className="form-control me-2 ms-3"
      onChange={(ev) => handleChange(ev, index)}
      name="name"
      value={item.name}
      placeholder="Nombre"
      required
    />

    {!required && (
      <input
        type="number"
        className="form-control me-2"
        name="extraPrice"
        onChange={(ev) => handleChange(ev, index)}
        placeholder="Precio"
        value={item.extraPrice}
        min={0}
        required
      />
    )}
    <button
      type="button"
      className="btn btn-sm btn-success  me-3"
      onClick={handleAddCount}
    >
      Agregar
    </button>
    <button
      type="button"
      className="btn btn-sm btn-danger btn-addon"
      onClick={() => {
        ingredents.splice(index, 1);
        setIngredents([...ingredents]);
      }}
    >
      Eliminar
    </button>
  </div>
);
