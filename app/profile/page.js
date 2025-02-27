"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import OrdersPage from "@/components/Order/OrdersPage";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { data: session, status } = useSession();


  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center"
        >
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4">
        <Image
          src={session?.user?.image || "/default-avatar.png"}
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full border"
        />
        <div>
          <h2 className="text-xl font-bold">{session?.user?.name}</h2>
          <p className="text-gray-600">{session?.user?.email}</p>
        </div>
      </div>
      <OrdersPage />
    </div>
  );
}
