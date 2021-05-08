import React, {useState} from 'react';
import {useQuery} from 'react-query';
//Components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge'
//Styles
import {Wrapper} from './App.styles'

export type CartItemType = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  amount: number; //my own type, to keep track the total amount
}

const getProducts = async ():Promise<CartItemType[]> => {
  const result = await (await fetch('https://fakestoreapi.com/products')).json();
  console.log(result)
  return result;
}

const App:React.FC = () => {

  const {data, isLoading, error} = useQuery<CartItemType[]>
  (
    'products', 
    getProducts
  );
  console.log(data);
  

  return (
    <div className="App">
      Start
    </div>
  );
}

export default App;
