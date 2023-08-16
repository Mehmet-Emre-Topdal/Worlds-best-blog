import React from "react";
import { useNavigate } from "react-router-dom";
import Blogs  from "../components/Blogs";
import { Filter } from "../components/Filter";

export default function BlogsPage() {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/newpost?mode=edit");
    //bu da query sring alabiliyor
    /**
     * navigate(-1) //go back
     * navigate("/users", {replace:true}) //go to users
     */
  };

  return (
    <>
      <div className="center">
        <div className="grid grid-cols-4 w-full h-screen">
          <div className=" col-span-1 h-1/2">
            <Filter />
          </div>
          <div className="col-span-3">
            <Blogs />
          </div>
        </div>
      </div>
    </>
  );
}


