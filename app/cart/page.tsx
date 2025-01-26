"use client"

import { Product } from '@/types/products';
import React, { useEffect, useState } from 'react';
import { getCartItems, removeFromCart, updateCartQuantity } from '../actions/actions';
import Swal from 'sweetalert2';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire('Removed!', 'Item has been removed.', 'success');
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) handleQuantityChange(id, product.inventory + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.inventory > 1) handleQuantityChange(id, product.inventory - 1);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  };

  const handleProceed = () => {
    Swal.fire({
      title: 'Proceed to checkout?',
      text: 'Please review your cart before checkout',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Success', 'Your order has been successfully processed', 'success');
        setCartItems([]);
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
               {item.image && (
                <Image
                src={urlFor (item.image).url()}
                className="w-16 h-16 object-cover rounded-lg"
                alt="image"
                width={500}
                height={500}
                />
               )}
               
                  
                
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement(item._id)}
                  className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-200"
                >
                  -
                </button>
                <span>{item.inventory}</span>
                <button
                  onClick={() => handleIncrement(item._id)}
                  className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <h2 className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</h2>
            <button
              onClick={handleProceed}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
