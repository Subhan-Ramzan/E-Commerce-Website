//app/api/uploadProduct/route.js
import connectDB from "@/utils/connectDB";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    // Step 1: Connect to the database
    await connectDB();

    // Step 2: Parse incoming request data
    const { productImage, name, brand, category, description, price } =
      await req.json();

    // Log the parsed data
    console.log("Received Data:", {
      productImage,
      name,
      brand,
      category,
      description,
      price,
    });

    // Additional log to check productImage type and value
    console.log("productImage type:", typeof productImage);
    console.log("productImage value:", productImage);

    // Step 3: Validate required fields
    if (
      !name ||
      !brand ||
      !category ||
      !description ||
      !price ||
      !productImage
    ) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Ensure productImage is an array of public IDs (fallback to an empty array if it's not)
    const images = Array.isArray(productImage)
      ? productImage.map((image) => ({
          public_id: image,
          url: `https://res.cloudinary.com/doalqbhpd/image/upload/${image}`,
        }))
      : [];
    console.log("Processed Images Array:", images); // Log processed images

    if (images.length === 0) {
      return new Response(
        JSON.stringify({
          error: "Product image array is empty",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Log final data to be saved
    console.log("Final Product Data to Save:", {
      name,
      brand,
      category,
      description,
      price,
      productImage: images,
    });

    // Step 4: Create the new product
    const newProduct = new Product({
      name,
      brand,
      category,
      description,
      price,
      productImage: images,
    });

    // Step 5: Save the new product to the database
    const savedProduct = await newProduct.save();
    console.log("Saved Product:", savedProduct); // Log the saved product

    // Step 6: Return the success response with the saved product
    return new Response(
      JSON.stringify({
        message: "Product uploaded successfully",
        product: savedProduct,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error uploading product:", error);

    // Step 7: Return the error response
    return new Response(
      JSON.stringify({
        error: "Failed to upload product",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (productId) {
      const product = await Product.findById(productId); // Fetch single product by ID
      if (!product) {
        return new Response(JSON.stringify({ error: "Product not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(product), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const products = await Product.find({}); // Fetch all products
      return new Response(JSON.stringify(products), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch products",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
