"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/products";
import { allproducts } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Brands } from "@/components/home/Brands";
import BrowseStyles from "@/components/home/browser-styles";
import NewArrivals from "@/components/home/new-arrivals";
import Testimonials from "@/components/home/testimonials";
import TopSelling from "@/components/home/top-selling";
import { addToCart } from "./actions/actions";
import Swal from 'sweetalert2'


export default function Home() {
  const [product, setProduct] = useState<Product[]>([]);
  const [cart, ] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct: Product[] = await client.fetch(allproducts);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, []);
    const handleAddToCart = (e: React.MouseEvent, product: Product)=>{
      e.preventDefault()
      Swal.fire({
        position :"top-right",
        icon : "success",
        title : `${product.name} added to cart`,
        showConfirmButton : false ,
        timer: 1000
      })
      addToCart(product)
      
      
      
    }
  // const handleAddToCart = (item: Product) => {
  //   setCart((prevCart) => [...prevCart, item]);
  //   alert(`${item.name} added to cart!`);
  // };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Hero />
      <Brands />
      <NewArrivals />
      <hr />
      <TopSelling />

      <h1 className="text-2xl font-bold mb-4 text-center">
        Fetched Data From Sanity
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-center">
        {product.map((product) => (
          <div key={product._id} className="p-4 border rounded shadow">
            <h2 className="font-bold">{product.name}</h2>
            <Link href={`/product1/${product.slug.current}`}>
              {product.image ? (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name || "Product Image"}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover rounded-md"
                />
              ) : (
                <p>No image available</p>
              )}
            </Link>
            <p className="text-gray-950 mt-2">
              Price: {product.price ? `$${product.price}` : "N/A"}
            </p>
            <button className="bg-blue-500 to-purple-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600"
            onClick={(e) => handleAddToCart(e, product)}
            
            >
               Add To Cart
            </button>
          
          </div>
        ))}
      </div>

      <BrowseStyles />
      <Testimonials />

      {/* Cart Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Cart</h2>
        {cart.length > 0 ? (
          <ul className="mt-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span>{item.name}</span>
                <span>{item.price ? `$${item.price}` : "N/A"}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}



