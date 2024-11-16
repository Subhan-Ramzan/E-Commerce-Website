// //app/products/page.js
// "use client";
// import React, { useState } from "react";
// import Profile from "../profile/page";
// import UplaodData from "../uploadProductData/page";
// import AllProducts from "../allProducts/page";

// const Page = () => {
//   const [uploadProduct, setUploadProduct] = useState(false);
//   return (
//     <>
//       <div className="h-auto overflow-auto pb-24">
//         <div
//           className={`flex flex-row w-full justify-between items-center px-3`}>
//           <h3 className="font-bold text-lg md:text-2xl p-3">Your Products</h3>
//           <div className="ml-auto">
//             <button
//               onClick={() => setUploadProduct(true)}
//               className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-2 py-2 md:px-4 rounded-lg"
//             >
//               Upload Product
//             </button>
//           </div>
//         </div>
//         <div>
//           <AllProducts />
//         </div>
//         <div>
//           {uploadProduct && (
//             <UplaodData onClose={() => setUploadProduct(false)} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;
