import config from '../../config.json';
import { getAuth } from "firebase/auth";

export function GetAllPublic(query = "") {
  return baseFetch(config.ServerUrl + "/api/Cocktails/public" + query);
}

export function GetUserCocktails(query = "") {
  return baseFetch(config.ServerUrl + '/api/Cocktails/user' + query);
}

export function GetCocktailById(id) {
  return baseFetch(config.ServerUrl + '/api/Cocktails/' + id);
}

export function PostCocktail(apiCocktail) {
  if (!apiCocktail.Ingredients) {
    apiCocktail.Ingredients = [];
  }

  return fetch(config.ServerUrl + '/api/Cocktails/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getAuth().currentUser.accessToken,
    },
    body: JSON.stringify(apiCocktail),
  });
}

export function PostIngredient(apiIngredient) {
  return fetch(config.ServerUrl + '/api/Ingredient/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getAuth().currentUser.accessToken,
    },
    body: JSON.stringify(apiIngredient),
  });
}


export function DeleteCocktailById(id) {
  return fetch(config.ServerUrl + "/api/Cocktails/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuth().currentUser.accessToken,
    },
  });
}

export function GetAllIngredients() {
  return fetch(config.ServerUrl + "/api/Ingredient");
}

function baseFetch(url, extraParameters = []) {
  return fetch(url, {
    headers: {
      Authorization: "Bearer " + getAuth().currentUser.accessToken,
    },
    extraParameters,
  }).then((res) => {
    if (!res.ok) {
      if (res.status == 401) {
        //Refresh token
        console.log("401 Error");
      }
    }
    return res;
  });
}