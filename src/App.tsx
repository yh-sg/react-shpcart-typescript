import React, {useState} from 'react';
import {useQuery} from 'react-query';
//Components
import Item from './item/item'
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge'
//Styles
import {Wrapper, StyledButton} from './App.styles'

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
  const [cartOpen, setCartOpen] = useState(false),
        [cartItems, setCartItems] = useState([] as CartItemType[]),
  //https://react-query.tanstack.com/overview
      {data, isLoading, error} = useQuery<CartItemType[]>
        (
          'products', 
          getProducts
        );
  
  const getTotalItems = (items: CartItemType[]) => null;

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
        Cart goes here.
      </Drawer>
      <StyledButton onClick={()=>setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'/>
        <AddShoppingCartIcon/>
      </StyledButton>
      <Grid container spacing={3}>
        {/* ? is for if nothing, return undefined instead of throwing error */}
        {data?.map(item=>(
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
