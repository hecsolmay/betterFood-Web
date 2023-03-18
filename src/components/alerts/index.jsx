import Swal from "sweetalert2";

export const createAlert = (name = "item") => {
  return Swal.fire("Creado con exito!", `${name} creado con exito`, "success");
};

export const updateAlert = () => {
  return Swal.fire(
    "Actualizado con exito!",
    `la actualizacion fue un exito`,
    "success"
  );
};

export const createUserAlert = () => {
  return Swal.fire(
    "Fuiste Registrado con exito!",
    `El envio de tus datos fue correcto espera a que el administrador te de un rol`,
    "success"
  );
};

export const updateAlertSale = () => {
  return Swal.fire(
    "Venta actualizada con exito!",
    `la actualizacion de la venta fue un exito`,
    "success"
  );
};

export const deleteAlertOrder = () => {
  return Swal.fire(
    "Orden cancelada con exito!",
    `la cancelacion la orden fue un exito`,
    "success"
  );
};

export const updateAlertOrder = () => {
  return Swal.fire(
    "Orden actualizada con exito!",
    `la actualizacion de la orden fue un exito`,
    "success"
  );
};

export const warningRolAlert = (rol = "usuario", username = "username") => {
  return Swal.fire({
    title: "¿Cambiar de rol?",
    text: `Estas seguro de dar el rol de ${rol} a ${username}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si cambiar el rol",
    cancelButtonText: "No",
  });
};

export const warningOrderAlert = () => {
  return Swal.fire({
    title: "¿Cancelar orden?",
    text: `Estas seguro de cancelar la orden`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si cancelarla",
    cancelButtonText: "No",
  });
};

export const warningOrderStatusAlert = () => {
  return Swal.fire({
    title: "¿Cambiar estatus de orden?",
    text: `Estas seguro de cambiar el estatus de la orden`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si cambiarla",
    cancelButtonText: "No",
  });
};

export const infoNewOrderAlert = () => {
  return Swal.fire({
    title: "Nueva Orden Entrante",
    text: "Deseas actualizar para ver la nueva orden, esto limpiara todas las busquedas y los filtros hechos previamente",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText: "No",
  });
};

export const deleteAlert = (name = "item", active = true) => {
  const state = active ? "deshabilitar" : "habilitar";
  const confirmation = active ? "deshabilitalo" : "habilitalo";
  const text = active
    ? "Al deshabilitarlo ya no saldra en consultas publicas"
    : "Al habilitarlo ya podra salir en consultas publicas";
  return Swal.fire({
    title: `Estas seguro de ${state} ${name}`,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Si, ${confirmation}!`,
  });
};

export const serverErrorAlert = () => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Algo salio Mal!",
  });
};

export const conflictError = (
  name = "item",
  section = "una seccion",
  type = "nombre"
) => {
  return Swal.fire({
    icon: "error",
    title: "Error Conflicto",
    text: `No se pudo crear ${name} porque ya existe ${section} con ese ${type}`,
  });
};

export const badRequestError = () => {
  return Swal.fire({
    icon: "error",
    title: "Bad Request Error",
    text: "el servidor no pudo procesar la solicitud debido a un error del cliente",
  });
};

export const unauthorizedError = () => {
  return Swal.fire({
    icon: "error",
    title: "Unauthorized Error",
    text: "Se necesita un cierto tipo de autorizacion para realizar esta accion",
  });
};

export const forbiddenError = () => {
  return Swal.fire({
    icon: "error",
    title: "Forbidder Error",
    text: "Se necesita otro tipo de rol para realizar esta accion",
  });
};

export const notFoundError = () => {
  return Swal.fire({
    icon: "error",
    title: "Not Found Error",
    text: "No se pudo encontrar el elemento solicitado",
  });
};

export const internalServerError = () => {
  return Swal.fire({
    icon: "error",
    title: "Internal Server Error",
    text: "No se pudo concretar la accion debido a un error en el servidor",
  });
};

export const qrError = () => {
  return Swal.fire({
    icon: "error",
    title: "Error al generar QR",
    text: "No se pudo generar el qr debido a un error intentelo de nuevo",
  });
};
