export function getAllPages(setAllPagesCallback) {
  fetch(`http://localhost:8000/all-help-pages/`)
    .then((response) => response.json())
    .then((data) => {
      setAllPagesCallback(data);
    });
}
export function getPaginationPages(setPagesCallback, pagination) {
  fetch(`http://localhost:8000/help-pages/${pagination}`)
    .then((response) => response.json())
    .then((data) => {
      setPagesCallback(data);
    });
}

export function getPage(setPageCallback, id) {
  fetch(`http://localhost:8000/help-page/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setPageCallback(data);
    });
}
