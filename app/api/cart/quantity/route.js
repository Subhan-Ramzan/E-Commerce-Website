import axios from "axios";

export async function PUT(req) {
  const { email, productId, quantity } = await req.json();

  try {
    // Log the token for debugging (remove in production)
    console.log("STRAPI_API_TOKEN:", process.env.NEXT_PUBLIC_STRAPI_API_TOKEN);

    const response = await axios.put(
      "http://127.0.0.1:1337/api/cart/quantity",
      { email, productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error(
      "Error updating cart:",
      error.response?.data || error.message
    );

    return new Response(
      JSON.stringify({
        error: error.response?.data || "Failed to update cart item",
      }),
      { status: 500 }
    );
  }
}
