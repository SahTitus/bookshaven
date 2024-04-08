import { fetchCartItems } from '@lib/actions/cart.action';
import React from 'react'

export const Header = async() => {
    const cartItems = await fetchCartItems(user?.id);
  return (
    <header>Header</header>
  )
}
