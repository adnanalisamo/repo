import { groq } from "next-sanity";


export const allproducts = groq`*[_type == "products"]`;
export const four = groq`*[_type == "products"][0..3]`;