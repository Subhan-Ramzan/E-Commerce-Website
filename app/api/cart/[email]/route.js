import { API_URL } from "@/utils/urls";
import axios from "axios";

export async function GET(req, { params }) {
  const { email } = params;
  const strapiUrl = `${API_URL}/api/cart/${email}`;
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const response = await axios.get(strapiUrl, {
      headers: {
        Authorization: `Bearer ${strapiToken}`,
      },
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch cart data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
