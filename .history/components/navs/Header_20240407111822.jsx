import React from 'react'

export const Header = () => {
    const cartItems = await fetchCartItems(user?.id);
  return (
    <div>Header</div>
  )
}
