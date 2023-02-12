import React, { useEffect, useState } from "react";
import {
  ButtonModal,
  ContainerAdmin,
  ContainerFluid,
  Headers,
} from "../common";
import { TableHeaders, TableItems } from "../components/categories";
import CategoryForm from "../components/categories/form";
import CategoryFormUpdate from "../components/categories/updateForm";
import Modal from "../components/modal";
import Table from "../components/tables/table";
import { postFile } from "../services/";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/categories";

const categories = () => {
  const [categories, setCategories] = useState([]);
  const [info, setInfo] = useState({});
  const [form, setForm] = useState({});
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoriesChange = (categories) => {
    setCategories(categories);
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

  const setPromises = () => {
    let imageTest =
      "https://cdn.pixabay.com/photo/2013/11/12/01/29/bar-209148_1280.jpg";
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve(imageTest);
        reject("Rechazado");
      }, 2000);
    });
  };
  const handleFormChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
    console.log(form);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (loading) return alert("Todavia Estan cargando los datos");

    console.log(form);
    await createCategory(form);
    alert("Creado Con exito");
    $("#Modal").modal("hide");
    $("#name").val("");
    $("#image").val("");
    setForm({});
    setImage("");
    getData();
  };

  const resetForm = () => {
    setId("");
    $("#Modal").modal("hide");
    $("#name").val("");
    $("#image").val("");
    $("#ModalUpdate").modal("hide");
    setForm({});
    setImage("");
    getData();
  };

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    if (loading) return alert("Todavia Estan Cargando los datos");
    setForm({ ...form, imgURL: image });
    console.log("Formulario");
    console.log(form);
    console.log(id);
    await updateCategory({ id, newCategory: form });
    alert("Actualizado");

    getData();
  };

  const handleEdit = (category) => {
    $("#ModalUpdate").modal("show");
    setImage(category.imgURL);
    setForm({ ...form, name: category.name });
    setId(category._id);
  };

  const handleDelete = async ({ id, name }) => {
    console.log({ id });
    console.log({ name });
    await deleteCategory(id);
    alert(`Borrado con exito ${name}`);
    getData();
  };

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      console.log(data);
      setCategories(data.results);
      setInfo(data.info);
    } catch (error) {
      console.log(error);
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
        <Headers title="Categories" />
        <ButtonModal title="Crear Categoria" />
        <div className={error ? "text-center mb-5 mt-5" : "d-none  "}>
          <h1>Ocurrio un error al traer los datos</h1>
          <button className="btn btn-primary" onClick={getData}>Recargar</button>
        </div>

        {loading && (
          <div className="text-center ">
            <img src="img/loading.gif" className="big-image mt-20" />
          </div>
        )}

        {!loading && !error && (
          <>
            <Modal
              id="Modal"
              title="Crear Categoria"
              action="Crear"
              resetForm={resetForm}
              btnClass={
                loading ? "btn btn-primary disabled" : "btn btn-primary"
              }
            >
              <CategoryForm
                categoryImg={image}
                uploading={uploading}
                handleSubmit={handleSubmit}
                handleFileUpload={handleFileUpload}
                handleFormChange={handleFormChange}
              />
            </Modal>

            <Modal
              id="ModalUpdate"
              title="Actualizar Categoria"
              action="Actualizar"
              resetForm={resetForm}
              btnClass={
                loading ? "btn btn-warning disabled" : "btn btn-warning"
              }
              formId="formUpdate"
            >
              <CategoryFormUpdate
                id="formUpdate"
                uploading={uploading}
                handleSubmit={handleUpdate}
                handleFileUpload={handleFileUpload}
                handleFormChange={handleFormChange}
                categoryImg={image}
                name={form.name}
              />
            </Modal>

            {categories && (
              <Table title="Tabla de Categorias" info={info}>
                <TableHeaders />
                {categories.length !== 0 && (
                  <TableItems
                    categories={categories}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
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

export default categories;
