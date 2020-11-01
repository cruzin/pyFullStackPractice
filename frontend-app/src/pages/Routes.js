const helpPageBaseUrl = "help-page/";
const baseUrl = "/";

export const helpPageUrl = (urlString) => {
  return helpPageBaseUrl + urlString;
};

export const paginationUrl = (urlString) => {
  return baseUrl + urlString;
};
