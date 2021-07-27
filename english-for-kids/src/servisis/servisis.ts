import { Endpoints } from "../types/types";

export async function getCategories() {

  const response = await fetch(Endpoints.auth);
  // если запрос прошел нормально
  const data = await response.json();
  return data;
}

// вместо локалхост будет ссылка на хероку или другой сервер
// const baseURL = 'https://mysterious-bastion-78314.herokuapp.com/';
// export async function getCategories() {
//     // const response = await fetch(`${baseURL}api/categories`, {
//     const response = await fetch(`${baseURL}/auth/login`, {
//         method: 'GET',
//         //   headers: { Accept: 'application/json' },
//     });
//     // если запрос прошел нормально
//     const categories = await response.json();
//     return categories;
// }
