import { createBrowserRouter, redirect } from "react-router-dom";

import Layout from "@/layout";
import HomePage from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    // 重定向到 /homepage
    loader: () => redirect("/homepage")
  },
  {
    Component: Layout,
    children: [
      // 首页
      {
        index: true,
        path: "homepage",
        Component: HomePage,
      },
    ],
  },
]);

export default router;
    