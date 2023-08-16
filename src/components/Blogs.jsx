import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import customFetch from "../axiosInstance";
import { toast } from "react-toastify";
import { useFiltersContext } from "../context/filtersContext";

export default function Blogs() {


  const {filters} = useFiltersContext();
  //iserror: boolean
  //query fn ve query key'i ayırmanın yolu: https://tanstack.com/query/v4/docs/react/guides/query-functions ->Query Function Variables 
  const {
    data: blogsList,
    isLoading,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["blogs", filters],
    queryFn: async () => {
      const url = `?${filters.map(val => `category=${encodeURIComponent(val)}`).join("&")}`

      const { data } = await customFetch.get(url);
      return data;
    },
  });


  return (
    <div className="grid grid-cols-3 w-full gap-5">
      {isFetching && <p>Loading...</p>}
      {isError && <p>{error.response.message}</p>}
      {blogsList && blogsList.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
}

export function Blog(props) {
  const { title, imageUrl, category, id } = props.blog;

  return (
    <Link to={`/post/${id}`}>
      <div className="col-span-1 bg-white shadow-lg">
        <div className=" w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
          <img
            src={imageUrl}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="h-32">
        <p className="text-center text-purple-600 p-1 text-lg">{category}</p>
        <h3 className="text-xl p-3 overflow-hidden text-ellipsis ">
          <span className="line-clamp-2">{title}</span>
          </h3>
          </div>
      </div>
    </Link>
  );
}
