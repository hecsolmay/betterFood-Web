import React, { useEffect, useState } from "react";
import {
  ButtonModal,
  ContainerAdmin,
  ContainerFluid,
  Headers,
} from "../common";
import Modal from "../components/modal";
import { TableHeaders, TableItems } from "../components/products";
import { ProductForm } from "../components/products/forms";
import Table from "../components/products/table";
import { postFile } from "../services";
import { getCategories } from "../services/categories";
import * as services from "../services/products";

const products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});
  const [info, setInfo] = useState({});
  const [image, setImage] = useState("");
  const [ingredents, setIngredents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    await services.deleteProduct(id);
    alert(`Borrado con exito ${name}`);
    services.getProducts({ setProducts, setInfo });
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

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log("Entro Al submit externo");
    const categories = selected.map((s) => s.value);
    const body = {
      ...form,
      categories,
      ingredents,
    };

    console.log(body);
    if (loading) return alert("Todavia Estan cargando los datos");

    await services.createProduct(body);
    alert("Creado Con exito");
    $("#Modal").modal("hide");
    resetData();
  };

  const resetData = () => {
    setForm({});
    setImage("");
    setIngredents([]);
    setSelected([]);
    services.getProducts({ setProducts, setInfo });
    getCategories({ setCategories });
  };

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dataProducts, dataCategories] = await Promise.all([
        services.getProducts(),
        getCategories(),
      ]);
      console.log("Entro al then");
      setProducts(dataProducts.results);
      setInfo(dataProducts.info);
      setCategories(dataCategories.results);
    } catch (error) {
      console.log("Entro al error");
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Products" />
        <ButtonModal title="Crear Producto" />
        <div className={error ? "text-center mb-5 mt-5" : "d-none  "}>
          <h1>Ocurrio un error al traer los datos</h1>
          <button className="btn btn-primary" onClick={getData}>
            Recargar
          </button>
        </div>
        <Modal
          title="Crear Producto"
          action="Crear"
          btnClass={loading ? "btn btn-primary disabled" : "btn btn-primary"}
          resetForm={resetData}
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
            handleSubmit={handleSubmit}
            image={image}
          />
        </Modal>
        {products && (
          <Table info={info}>
            <TableHeaders />
            {products.length != 0 && (
              <TableItems
                products={products}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </Table>
        )}
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default products;
