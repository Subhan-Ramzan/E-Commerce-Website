// app/api/cart/route.js

import axios from "axios";

export async function POST(req) {
  const { email, productId } = await req.json();

  try {
    const response = await axios.post(
      "http://localhost:1337/api/cart",
      {
        email,
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to add item to cart" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const { email, productId, quantity } = await req.json();

  try {
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

export async function GET({ params }) {
  const { email } = params;

  try {
    const response = await axios.get(
      `http://localhost:1337/api/cart/${email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch cart" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { email, productId } = await req.json();

    if (!email || !productId) {
      return new Response(JSON.stringify({ error: "Invalid parameters" }), {
        status: 400,
      });
    }

    const response = await axios.delete(`http://localhost:1337/api/cart`, {
      params: { email, productId },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });

    if (!response.data) {
      throw new Error("Empty response from Strapi");
    }

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to delete cart item",
        details: error.response?.data || error.message,
      }),
      { status: 500 }
    );
  }
}
