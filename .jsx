// //app/uploadProductData/page.js
// const [products, setProducts] = useState([]);
// const [data, setData] = useState({
//     productImage: [],
// });

// <div className="h-28">
//     {data.productImage.map((image, index) => (
//         <img
//             key={index}
//             src={image}
//             alt={`Product image ${index + 1}`}
//             className="h-full w-auto inline-block mr-2"
//         />
//     ))}
// </div>

// //pages/api/uploadProduct.js
// import connectDB from '@/utils/connectDB';
// import Product from '@/models/Product';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       await connectDB();
      
//       const { image } = req.body;

//       if (!image) {
//         return res.status(400).json({ error: 'Missing required fields' });
//       }
      
//       const newProduct = new Product({
//         image,
//       });
      
//       await newProduct.save();
      
//       res.status(201).json({ message: 'Product uploaded successfully' });
//     } catch (error) {
//       console.error('Error uploading product:', error);
//       res.status(500).json({ error: 'Failed to upload product', details: error.message });
//     }
//   } else if (req.method === 'GET') {
//     try {
//       await connectDB();
//       const products = await Product.find({});
//       console.log('Fetched products:', products);
//       res.status(200).json(products);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       res.status(500).json({ error: 'Failed to fetch products', details: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST', 'GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// //.env
// CLOUDINARY_CLOUD_NAME=doalqbhpd
// CLOUDINARY_API_KEY=757143554129725
// CLOUDINARY_API_SECRET=fmyn4QwrXPqtHrxu-5KzUASMmaY








// // pages/api/uploadProduct.js
// import formidable from 'formidable';
// import cloudinary from '@/utils/cloudinaryConfig'; // Adjust path if necessary
// import fs from 'fs';
// import connectDB from '@/utils/connectDB';
// import Product from '@/models/Product';

// export const config = {
//   api: {
//     bodyParser: false, // Disallow default body parsing
//   },
// };

// const handler = async (req, res) => {
//   if (req.method === 'POST') {
//     const form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error parsing the file.' });
//       }

//       try {
//         const file = files.file[0];
//         const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
//           folder: 'product_images', // Use the exact folder name you created
//         });
        
//         fs.unlinkSync(file.filepath); // Clean up the temporary file

//         await connectDB();

//         const newProduct = new Product({
//           image: uploadResponse.secure_url,
//         });

//         await newProduct.save();

//         res.status(201).json({
//           message: 'Product uploaded successfully',
//           url: uploadResponse.secure_url,
//         });
//       } catch (error) {
//         console.error('Error uploading product:', error);
//         res.status(500).json({ error: 'Failed to upload product', details: error.message });
//       }
//     });
//   } else if (req.method === 'GET') {
//     try {
//       await connectDB();
//       const products = await Product.find({});
//       console.log('Fetched products:', products);
//       res.status(200).json(products);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       res.status(500).json({ error: 'Failed to fetch products', details: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST', 'GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default handler;










// // app/uploadProductData/page.js
// import { useState } from 'react';

// const UploadProductData = () => {
//   const [products, setProducts] = useState([]);
//   const [data, setData] = useState({
//     productImage: [],
//   });
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await fetch('/api/uploadProduct', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setData((prevData) => ({
//           ...prevData,
//           productImage: [...prevData.productImage, result.url],
//         }));
//         alert('Upload successful!');
//       } else {
//         alert(`Upload failed: ${result.error}`);
//       }
//     } catch (error) {
//       alert('An error occurred.');
//     }
//   };

//   return (
//     <div>
//       <div className="h-28">
//         {data.productImage.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Product image ${index + 1}`}
//             className="h-full w-auto inline-block mr-2"
//           />
//         ))}
//       </div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default UploadProductData;
