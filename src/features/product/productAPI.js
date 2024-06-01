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
