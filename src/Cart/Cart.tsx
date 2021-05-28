import React from 'react'
import CartItem from './CartItem'
// Styles
import { Wrapper } from './Cart.styles'
// Types
import { CartItemType } from '../App'

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart:React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
        </Wrapper>
    )
}

export default Cart
