import axios from "axios";

export function fetchAllProducts() {
  return axios.get('http://localhost:8080/products')
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}



export function fetchProductsByFilter(filter) {

let queryString = "";

for(let key in filter){
  queryString += `${key}=${filter[key]}&`
}

  return axios.get('http://localhost:8080/products?'+queryString)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}


export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands');
    const data = await response.json();
    resolve({ data });
  });
}