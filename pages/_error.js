// pages/_error.js
import Error from 'next/error';

const CustomError = ({ statusCode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {statusCode === 404 ? (
        <>
          <h1 className="text-6xl font-bold text-red-600">404</h1>
          <p className="text-lg mt-4">Sorry, the page you are looking for does not exist.</p>
        </>
      ) : (
        <>
          <h1 className="text-6xl font-bold text-red-600">Error</h1>
          <p className="text-lg mt-4">An unexpected error occurred.</p>
        </>
      )}
    </div>
  );
};

CustomError.getInitialProps = async (context) => {
  const { res, err } = context;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
