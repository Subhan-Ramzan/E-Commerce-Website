// app/ReduxProvider.js
"use client";

import { Provider } from "react-redux";
import store from "@/store/store"; // Replace with the actual path to your store

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
