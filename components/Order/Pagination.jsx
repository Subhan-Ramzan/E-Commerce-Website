import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

const Pagination = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const pathname = usePathname();

  const createPageLink = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page);
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav className="mt-6 flex items-center justify-center sm:mt-8">
      <ul className="flex items-center space-x-2">
        {/* Previous Button */}
        <li>
          <Link
            href={createPageLink(currentPage - 1)}
            className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            aria-disabled={currentPage === 1}
          >
            ← Prev
          </Link>
        </li>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <Link
              href={createPageLink(page)}
              className={`px-4 py-2 border rounded-lg ${page === currentPage
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              {page}
            </Link>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <Link
            href={createPageLink(currentPage + 1)}
            className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            aria-disabled={currentPage === totalPages}
          >
            Next →
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;