const token: string = "token";

export const getToken = () => {
  return localStorage.getItem(token);
};

export const setToken = (restoken: string) => {
  return localStorage.setItem(token, restoken);
};

export const removeToken = () => {
  return localStorage.removeItem(token);
};
