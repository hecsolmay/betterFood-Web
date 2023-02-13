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
import UpdateForm from "../components/products/updateForm";
import Table from "../components/tables/table";
import { postFile } from "../services";
import { getCategories } from "../services/categories";
import * as services from "../services/products";

const products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});
  const [info, setInfo] = useState({});
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const [ingredents, setIngredents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleEdit = (product) => {
    console.log(product);
    $("#ModalUpdate").modal("show");
    const {
      _id,
      name,
      price,
      description,
      ingredents,
      categories,
      imgURL,
      ofert,
    } = product;
    setForm({ name, price, description, ofert });
    setImage(imgURL);
    setSelected(
      categories.map((c) => {
        return { value: c._id, label: c.name };
      })
    );
    setId(_id);
    setIngredents(
      ingredents.map((i) => {
        delete i._id;
        return i;
      })
    );
  };

  const handleIngredentsChange = (ingredent) => {
    setIngredents([...ingredents, ingredent]);
    console.log("State Ingredents");
    console.log(ingredents);
  };

  const handleDelete = async ({ id, name, active }) => {
    console.log({ id });
    console.log({ name });
    const body = active === 1 ? { active: 0 } : { active: 1 };
    // await services.deleteProduct(id);
    await services.updateProduct({ id, newProduct: body });
    const estado = active === 1 ? "inactivo" : "activo";
    alert(`Cambiado a estado ${estado} ${name}`);
    getData();
  };

  const handleFileUpload = async (ev) => {
    setUploading(true);
    console.log(ev);
    setImage("");
    console.log({ uploading });
    console.log(ev.target.files[0]);
    const file = ev.target.files[0];

    try {
      const data = await postFile({
        file,
        upload_preset: "Productos",
      });
      setForm({ ...form, imgURL: data.url });
      setImage(data.url);
    } catch (error) {
      alert("La imagen no se pudo subir intentalo de nuevo");
      ev.target.value = "";
    }
    setUploading(false);
  };

  const handleFormChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = async (ev, action = 0) => {
    ev.preventDefault();
    console.log("entro al submit");
    const categories = selected.map((s) => s.value);
    const body = {
      ...form,
      categories,
      ingredents,
    };

    console.log(body);
    if (loading) return alert("Todavia Estan cargando los datos");

    action === 0
      ? await services.createProduct(body)
      : await services.updateProduct({ id: id, newProduct: body });
    action === 0 ? alert("Creado Con exito") : alert("Actaulizado con exito");
    resetData();
    getData();
  };

  const resetData = () => {
    setForm({});
    $("#Modal").modal("hide");
    $("#ModalUpdate").modal("hide");
    setImage("");
    $("#image").val("");
    setIngredents([]);
    setSelected([]);
  };

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dataProducts, dataCategories] = await Promise.all([
        services.getProducts(),
        getCategories("?limit=100"),
      ]);
      setProducts(dataProducts.results);
      setInfo(dataProducts.info);
      console.log(dataProducts.results);
      setCategories(dataCategories.results);
    } catch (error) {
      console.error(error);
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

        {loading && (
          <div className="text-center ">
            <img src="img/loading.gif" className="big-image mt-20" />
          </div>
        )}

        {!loading && !error && (
          <>
            <Modal
              title="Crear Producto"
              action="Crear"
              btnClass={
                loading ? "btn btn-primary disabled" : "btn btn-primary"
              }
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
                uploading={uploading}
              />
            </Modal>

            <Modal
              title="Actualizar Product"
              action="Actualizar"
              id="ModalUpdate"
              btnClass={
                loading ? "btn btn-primary disabled" : "btn btn-warning"
              }
              formId="formUpdate"
              resetForm={resetData}
            >
              <UpdateForm
                id="formUpdate"
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
                uploading={uploading}
                formData={form}
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
          </>
        )}
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default products;
