import React, { useEffect, useState } from "react";
import { useFiltersContext } from "../context/filtersContext";

export function Filter() {
  const [input, setInput] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    HTML: false,
    CSS: false,
    Javascript: false,
    React: false,
  });

  const filtersCtx = useFiltersContext();

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const checkboxHandler = (e) => {
    //checked: tıkladıktan sonraki halini söylüyor, yani tam bana lazım olan şey
    const { name, checked } = e.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
    console.log(name, checked);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filtersCtx.updateFilters(checkboxes);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [checkboxes]);

  const topics = Object.keys(checkboxes).filter((topic) => topic.startsWith(input)
  );

  return (
    <div className=" p-3 rounded bg-stone-50">
      <h3 className="text-xl">Topics</h3>
      <hr className="my-2 border-1 border-gray-500" />
      <input
        type="text"
        placeholder="search topic"
        className="border border-gray-300 focus:border-blue-500 rounded-md px-4 py-2 outline-none w-full"
        onChange={onChangeHandler}
        value={input} />
      <div>
        {topics.map((topic, i) => (
          <div className="flex-start mt-2" key={i}>
            <input
              type="checkbox"
              name={topic}
              onChange={checkboxHandler}
              className="mr-2 accent-orange-600  p-4 w-5 h-5"
              id={topic}
              checked={checkboxes[topic]} />
            <label className="text-xl" htmlFor={topic}>
              {" "}
              {topic}{" "}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
