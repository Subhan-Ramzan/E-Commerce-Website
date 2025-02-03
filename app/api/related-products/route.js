import { API_URL, STRAPI_API_TOKEN } from '@/utils/urls'; // Import API URL and token
import axios from 'axios';

export async function GET(req) {
  const { searchParams } = req.nextUrl; // Access search params from the request URL
  const documentId = searchParams.get('documentId'); // Get the documentId from query params

  if (!documentId) {
    return new Response(JSON.stringify({ error: 'documentId is required' }), {
      status: 400, // Bad request if documentId is missing
    });
  }

  try {
    const strapiUrl = API_URL;  // Strapi API URL

    // Include Bearer token in the request headers for authorization
    const response = await axios.get(`${strapiUrl}/api/products?populate=*`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`, // Add Bearer token
      },
    });

    const allProducts = response.data.data;

    // Filter out the current product by documentId
    const filteredProducts = allProducts.filter(
      (product) => product.documentId !== documentId
    );

    // Return the filtered products as a response
    return new Response(JSON.stringify(filteredProducts), {
      status: 200,
    });

  } catch (error) {
    console.error('Error fetching related products:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch related products' }), {
      status: 500,
    });
  }
}
