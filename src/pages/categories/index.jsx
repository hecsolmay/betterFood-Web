import React, { useEffect, useState } from "react";
import {
  ButtonModal,
  ContainerAdmin,
  ContainerFluid,
  Headers,
} from "../../common";
import { useSearchParams } from "react-router-dom";
import { TableHeaders, TableItems } from "../../components/categories";
import CategoryForm from "../../components/categories/form";
import CategoryFormUpdate from "../../components/categories/updateForm";
import Modal from "../../components/modal";
import Table from "../../components/tables/table";
import { postFile } from "../../services";

import * as services from "../../services/categories";
import { createAlert, deleteAlert } from "../../components/alerts";

const categories = () => {
  const [categories, setCategories] = useState([]);
  const [info, setInfo] = useState({});
  const [form, setForm] = useState({});
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [params] = useSearchParams();

  const handleFileUpload = async (ev) => {
    setUploading(true);
    setImage("");
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

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const res = await services.createCategory(form);
    if (res.status === 201) {
      resetForm();
      getData();
    }
  };

  const resetForm = () => {
    $("#Modal").modal("hide");
    $("#name").val("");
    $("#image").val("");
    $("#ModalUpdate").modal("hide");
    setId("");
    setForm({});
    setImage("");
  };

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    setForm({ ...form, imgURL: image });
    const res = await services.updateCategory({ id, newCategory: form });
    if (res.status === 200) {
      getData();
      resetForm();
    }
  };

  const handleEdit = (category) => {
    $("#ModalUpdate").modal("show");
    setImage(category.imgURL);
    setForm({ name: category.name });
    setId(category.id);
  };

  const handleDelete = async ({ id, name, active, category }) => {
    deleteAlert(name, active === 1).then(async (response) => {
      if (response.isConfirmed) {
        const body = active === 1 ? { active: 0 } : { active: 1 };
        await services.updateCategory({ id, newCategory: body });
        getData();
      }
    });
  };

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await services.getCategories(params.toString());
      setCategories(data.results);
      setInfo(data.info);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Categories" />
        <ButtonModal title="Crear Categoria" />
        <div className={error ? "text-center mb-5 mt-5" : "d-none  "}>
          <h1>Ocurrio un error al traer los datos</h1>
          <button className="btn btn-primary" onClick={getData}>
            Recargar
          </button>
        </div>

        {loading ? (
          <div className="text-center ">
            <img src="img/loading.gif" className="big-image mt-20" />
          </div>
        ) : (
          <>
            {!error && (
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
      <Modal
        id="Modal"
        title="Crear Categoria"
        action="Crear"
        btnClass={loading ? "btn btn-primary disabled" : "btn btn-primary"}
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
        btnClass={loading ? "btn btn-warning disabled" : "btn btn-warning"}
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
    </ContainerAdmin>
  );
};

export default categories;
