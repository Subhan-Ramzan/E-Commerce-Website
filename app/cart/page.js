// // app/cart/CartPage.js
// "use client";
// import React, { useContext } from "react";
// import { ProductContext } from "@/context/ProductContext";
// import Image from "next/image";

// const CartPage = () => {
//   const { cartItems } = useContext(ProductContext);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {cartItems.map((item, index) => (
//             <div key={index} className="border p-4 rounded shadow">
//               <Image
//                 src={item.images[0].url || "/default-image.jpg"}
//                 alt={item.name}
//                 width={200}
//                 height={200}
//                 className="object-cover mb-4"
//               />
//               <h2 className="font-bold">{item.name}</h2>
//               <p className="text-red-700 font-bold">Rs. {item.price}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
