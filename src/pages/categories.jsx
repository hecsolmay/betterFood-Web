import React, { useEffect, useState } from "react";
import {
  Headers,
  ContainerAdmin,
  ContainerFluid,
  ButtonModal,
} from "../common";
import Modal from "../components/modal";
import Table from "../components/tables/table";
import {
  TableHeaders,
  TableItems,
  CategoryForm,
  CategoryFormUpdate,
} from "../components/categories";
import {
  getCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../services/categories";
import { postFile } from "../services/";

const categories = () => {
  const [categories, setCategories] = useState([]);
  const [info, setInfo] = useState({});
  const [form, setForm] = useState({});
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoriesChange = (categories) => {
    setCategories(categories);
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
    setForm({ ...form, [ev.target.name]: ev.target.value });
    console.log(form);
  };

  const handleSubmit = async () => {
    if (loading) return alert("Todavia Estan cargando los datos");

    alert("Creado Con exito");
    $("#Modal").modal("hide");
    $("#name").val("");
    $("#image").val("");
    await createCategory(form);
    setForm({});
    getCategories({ setCategories, setInfo });
  };

  const resetForm = () => {
    setImage("");
    setNombre("");
    setId("");
    setForm({});
  };

  const handleUpdate = async () => {
    if (loading) return alert("Todavia Estan Cargando los datos");
    setForm({ ...form, imgURL: image });
    console.log("Formulario");
    console.log(form);
    console.log(id);
    await updateCategory({ id, newCategory: form });
    alert("Actualizado");
    $("#ModalUpdate").modal("hide");
    getCategories({ setCategories, setInfo });
  };

  const handleEdit = (category) => {
    $("#ModalUpdate").modal("show");
    setImage(category.imgURL);
    setNombre(category.name);
    setId(category._id);
  };

  const handleDelete = async ({ id, name }) => {
    console.log({ id });
    console.log({ name });
    await deleteCategory(id);
    alert(`Borrado con exito ${name}`);
    getCategories({ setCategories, setInfo });
  };

  useEffect(() => {
    getCategories({ setCategories, setInfo });
  }, []);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Categories" />
        <ButtonModal title="Crear Categoria" />
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

        <Modal
          id="Modal"
          title="Crear Categoria"
          action="Crear"
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          btnClass={loading ? "btn btn-primary disabled" : "btn btn-primary"}
        >
          <CategoryForm
            categoryImg={image}
            handleFileUpload={handleFileUpload}
            handleFormChange={handleFormChange}
          />
        </Modal>

        <Modal
          id="ModalUpdate"
          title="Actualizar Categoria"
          action="Actualizar"
          handleSubmit={handleUpdate}
          resetForm={resetForm}
          btnClass={loading ? "btn btn-warning disabled" : "btn btn-warning"}
        >
          <CategoryFormUpdate
            handleFileUpload={handleFileUpload}
            handleFormChange={handleFormChange}
            categoryImg={image}
            name={nombre}
          />
        </Modal>
      </ContainerFluid>
    </ContainerAdmin>
  );
};

export default categories;
