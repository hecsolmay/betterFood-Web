import React, { useState, useEffect } from "react";
import {
  Headers,
  ContainerAdmin,
  ContainerFluid,
  ButtonModal,
} from "../common";
import Table from "../components/products/table";
import { postFile } from "../services";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../services/products";
import { getCategories } from "../services/categories";
import { TableHeaders, TableItems } from "../components/products";
import { ProductForm } from "../components/products/forms";

const products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});
  const [info, setInfo] = useState({});
  const [image, setImage] = useState("");
  const [ingredents, setIngredents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEdit = (product) => {
    console.log(product);
    alert("Boton de editar Presionado");
  };

  const handleIngredentsChange = (ingredent) => {
    setIngredents([...ingredents, ingredent]);
    console.log("State Ingredents");
    console.log(ingredents);
  };

  const handleDelete = async ({ id, name }) => {
    console.log({ id });
    console.log({ name });
    await deleteProduct(id);
    alert(`Borrado con exito ${name}`);
    getProducts({ setProducts, setInfo });
  };

  const handleFileUpload = async (ev) => {
    setLoading(true);
    console.log({ loading });
    console.log(ev.target.files[0]);
    const file = ev.target.files[0];

    const data = await postFile({
      file,
      upload_preset: "Productos",
    });
    setForm({ ...form, imgURL: data.url });
    setImage(data.url);
    setLoading(false);
    console.log({ loading });
  };

  const handleFormChange = (ev) => {
    console.log(form);
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = async () => {
    const categories = selected.map((s) => s.value);

    const body = {
      ...form,
      categories,
      ingredents,
    };

    if (loading) return alert("Todavia Estan cargando los datos");

    await createProduct(body);
    alert("Creado Con exito");
    $("#Modal").modal("hide");
    resetData();
  };

  const resetData = () => {
    setForm({});
    setImage("");
    setIngredents([]);
    setSelected([]);
    getProducts({ setProducts, setInfo });
    getCategories({ setCategories });
  };

  useEffect(() => {
    getProducts({ setProducts, setInfo });
    getCategories({ setCategories });
  }, []);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Products" />
        <ButtonModal title="Crear Producto" />

        <Modal
          title="Crear Producto"
          action="Crear"
          handleSubmit={handleSubmit}
          btnClass={loading ? "btn btn-primary disabled" : "btn btn-primary"}
        >
          <ProductForm
            categories={categories}
            handleFormChange={handleFormChange}
            setSelected={setSelected}
            selected={selected}
            handleFileUpload={handleFileUpload}
            handleIngredentsChange={handleIngredentsChange}
            setIngredents={setIngredents}
            ingredents={ingredents}
            image={image}
          />
        </Modal>
        {products.length !== 0 ? (
          <Table info={info}>
            <TableHeaders />
            {products && (
              <TableItems
                products={products}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </Table>
        ) : null}
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default products;

const Modal = ({
  title = "",
  action = "",
  children,
  handleSubmit,
  btnClass,
}) => (
  <div
    className="modal fade"
    id="Modal"
    tabIndex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="ModalLabel">
            {title}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button type="button" onClick={handleSubmit} className={btnClass}>
            {action}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const handleSubmit = () => {
  alert("Create Pressed");
};
