import config from '../../config.json';
import { getAuth } from "firebase/auth";

export function GetAllPublic() {
  return fetch(config.ServerUrl + '/api/Cocktails/public', {
    headers: {
      "Authorization": "Bearer "  + getAuth().currentUser.accessToken,
    },
  });
}

export function GetUserCocktails() {
  var uid = getAuth().currentUser.uid;
  return fetch(config.ServerUrl + '/api/Cocktails/user/', {
    headers: {
      "Authorization": "Bearer " + getAuth().currentUser.accessToken,
    },
  });
}


export function GetCocktailById(id) {
  return fetch(config.ServerUrl + '/api/Cocktails/' + id, {
    headers: {
      "Authorization": "Bearer " + getAuth().currentUser.accessToken,
    },
  });
}

export function PostCocktail(apiCocktail) {
  if (!apiCocktail.Ingredients) {
    apiCocktail.Ingredients = [];
  }

  return fetch(config.ServerUrl + '/api/Cocktails/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "  + getAuth().currentUser.accessToken,
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
  return fetch(config.ServerUrl + '/api/Cocktails/' + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "  + getAuth().currentUser.accessToken,
    },
  });
}

export function GetAllIngredients() {
  return fetch(config.ServerUrl + "/api/Ingredient");
}