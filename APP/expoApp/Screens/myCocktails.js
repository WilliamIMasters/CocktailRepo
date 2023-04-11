import React, { useState, useTransition, useEffect } from 'react';
import { GetAllPublic, GetCocktailById, GetUserCocktails } from '../utils/API/CocktailApiHelper';
import CocktailList from '../components/CocktailList';
import { getAuth } from "firebase/auth";

function MyCocktails({ navigation }) {

  return (
    <CocktailList
      navigation={navigation}
      getCocktailsMethod={GetUserCocktails}

    />
  );
}

export default MyCocktails;