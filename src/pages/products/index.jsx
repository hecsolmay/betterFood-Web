import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ButtonModal,
  ContainerAdmin,
  ContainerFluid,
  Headers
} from "../../common";
import { deleteAlert } from "../../components/alerts";
import Modal from "../../components/modal";
import { TableHeaders, TableItems } from "../../components/products";
import { ProductForm } from "../../components/products/forms";
import UpdateForm from "../../components/products/updateForm";
import Table from "../../components/tables/table";
import { postFile } from "../../services";
import { getAllCategories } from "../../services/categories";
import { getAllIngredents } from "../../services/ingredents";
import * as services from "../../services/products";
import "./index.css";

const products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});
  const [info, setInfo] = useState({});
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  const [ingredentsData, setIngredentsData] = useState([]);
  const [ingredents, setIngredents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedIngredent, setSelectedIngredent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params] = useSearchParams();
  const [uploading, setUploading] = useState(false);

  const handleEdit = (product) => {
    const avalibleCategories = categories.map((c) => c.id);
    categories;
    $("#ModalUpdate").modal("show");
    const {
      id,
      name,
      price,
      description,
      ingredents: productIngre,
      categories: productCate,
      imgURL,
      ofert,
    } = product;
    setForm({ name, price, description, ofert });
    setImage(imgURL);
    setSelected(
      productCate.map((c) => {
        if (avalibleCategories.includes(c.id)) {
          return { value: c.id, label: c.name };
        }
        return;
      })
    );
    setId(id);
    setSelectedIngredent(
      productIngre.map((i) => {
        return { value: i.id, label: i.name };
      })
    );
    setIngredents(productIngre);
  };

  const handleDelete = async ({ id, name, active }) => {
    deleteAlert(name, active === 1).then(async (response) => {
      if (response.isConfirmed) {
        const body = active === 1 ? { active: 0 } : { active: 1 };
        await services.updateProduct({ id, newProduct: body });
        getData();
      }
    });
  };

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

  const handleSubmit = async (ev, action = 0) => {
    ev.preventDefault();
    let cleanIngredents = ingredents.map((i) => {
      delete i.name;
      return {
        ...i,
      };
    });
    const categories = selected.map((s) => s.value);
    const body = {
      ...form,
      categories,
      ingredents: cleanIngredents,
    };

    if (loading) return alert("Todavia Estan cargando los datos");

    const res =
      action === 0
        ? await services.createProduct(body)
        : await services.updateProduct({ id: id, newProduct: body });

    if (res.status === 200 || res.status === 201 || res.status === 204) {
      resetData();
      getData();
    }
  };

  const resetData = () => {
    setForm({});
    $("#Modal").modal("hide");
    $("#ModalUpdate").modal("hide");
    setImage("");
    $("#image").val("");
    $("#productImage").val("");
    setIngredents([]);
    setSelected([]);
    setSelectedIngredent([]);
  };

  const getCategories = async () => {
    const res = await getAllCategories();
    if (res.status === 200) {
      const { data } = res;
      setCategories(data.results);
    } else {
      setError(true);
    }
  };

  const getIngredentsDTO = async () => {
    const res = await getAllIngredents();
    if (res.status === 200) {
      const { data } = res;
      setIngredentsData(data.results);
    } else {
      setError(true);
    }
  };

  const getData = async () => {
    setLoading(true);
    setError(false);

    const res = await services.getProducts(params.toString());
    if (res.status === 200) {
      const { data } = res;
      setProducts(data.results);
      setInfo(data.info);
    } else {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    getCategories();
    getIngredentsDTO();
  }, []);

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <ContainerAdmin>
      <ContainerFluid>
        <Headers title="Productos" />
        <ButtonModal title="Crear Producto" />
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
            {products && !error && (
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

      <Modal
        title="Crear Producto"
        action="Crear"
        btnClass={loading ? "btn btn-primary disabled" : "btn btn-primary"}
        resetForm={resetData}
      >
        <ProductForm
          categories={categories}
          form={form}
          handleFormChange={handleFormChange}
          setSelected={setSelected}
          selected={selected}
          handleFileUpload={handleFileUpload}
          setIngredentsData={setIngredentsData}
          ingredentsData={ingredentsData}
          ingredents={ingredents}
          setIngredents={setIngredents}
          handleSubmit={handleSubmit}
          selectedIngredent={selectedIngredent}
          setSelectedIngredent={setSelectedIngredent}
          image={image}
          uploading={uploading}
        />
      </Modal>

      <Modal
        title="Actualizar Product"
        action="Actualizar"
        id="ModalUpdate"
        btnClass={loading ? "btn btn-primary disabled" : "btn btn-warning"}
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
          setIngredents={setIngredents}
          ingredents={ingredents}
          handleSubmit={handleSubmit}
          image={image}
          uploading={uploading}
          formData={form}
          ingredentsData={ingredentsData}
          selectedIngredent={selectedIngredent}
          setSelectedIngredent={setSelectedIngredent}
        />
      </Modal>
    </ContainerAdmin>
  );
};

export default products;
