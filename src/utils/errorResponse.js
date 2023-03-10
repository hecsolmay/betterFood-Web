import * as alerts from "../components/alerts";

export const getAlert = (status = 400, name = "item", section = "section",type="nombre") => {
  if (status === 400) {
    return alerts.badRequestError();
  }
  if (status === 401) {
    return alerts.unauthorizedError();
  }
  if (status === 403) {
    return alerts.forbiddenError();
  }
  if (status === 404) {
    return alerts.notFoundError();
  }
  if (status === 409) {
    return alerts.conflictError(name, section,type);
  }

  return alerts.serverErrorAlert();
};
