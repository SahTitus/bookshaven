import { fetchCartItems } from '@lib/actions/cart.action';
import React from 'react'
import { Navbar } from './Navbar';

export const Header = async() => {
    const cartItems = await fetchCartItems(user?.id);
  return (
    <header>
        <Navbar />
    </header>
  )
}
