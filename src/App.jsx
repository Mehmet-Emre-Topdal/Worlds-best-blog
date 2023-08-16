import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { PostDetail, Blogs, NewPost, Layout, ErrorPage } from "./pages";

//alternatifi: createRoutesFromElements
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement:<ErrorPage/>,
    children: [
      { index:true , element: <Navigate to="blogs"/> },
      { path: "blogs", element: <Blogs />},
      { path: "post/:id", element: <PostDetail /> },
      { path: "newpost", element: <NewPost /> },
    ],
  },
]);

function App() {
  return (
    <>
      {/* bunun tek veya çift olması neye yarıyor acaba */}
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
