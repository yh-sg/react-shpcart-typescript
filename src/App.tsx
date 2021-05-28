import React, {useState} from 'react';
import {useQuery} from 'react-query';
//Components
import Item from './item/item'
import Cart from './Cart/Cart'
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

  // console.log(data)
  
  const getTotalItems = (items: CartItemType[]) => 
          items.reduce((acc:number, item)=> acc + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev=>{
      // 1. Item already added into the cart??
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if(isItemInCart){
        return prev.map(item=>(
          item.id === clickedItem.id ? {...item, amount: item.amount + 1}
            : item
        ))
      }
      //First time item added
      return [...prev, {...clickedItem, amount: 1}];
    })
  };

  const handleRemoveFromCart = (id:number) => {
    setCartItems(prev=>
      prev.reduce((acc, item)=>{
        if (item.id===id) {
          if (item.amount===1) return acc;
        return [...acc, {...item, amount:item.amount - 1}];
        }else{
          return [...acc, item]
        }
      },[] as CartItemType[])
    )
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
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
