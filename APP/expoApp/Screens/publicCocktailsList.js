import React, { useState, useTransition, useEffect } from 'react';
import { GetAllPublic, GetCocktailById } from '../utils/API/CocktailApiHelper';
import CocktailList from '../components/CocktailList';

function PublicCocktailList({ navigation }) {

  return (
    <CocktailList
      navigation={navigation}
      getCocktailsMethod={GetAllPublic}

    />
  );
}

export default PublicCocktailList;