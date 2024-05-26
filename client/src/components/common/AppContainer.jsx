import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Container = () => {
  const navigate = useNavigate();
  const [topBarItem, setTopBarItem] = useState([
    { name: "Task List", link: "list" },
    // { name: "Add Task", link: "add" },
  ]);

  const openLink = (link) => {
    navigate(link);
  };

  return (
    <div
      className="w-screen h-screen grid"
      style={{ gridTemplateRows: "10% 90%" }}
    >
      <div
        className="grid items-start p-4 pl-8 gap-x-2"
        style={{ gridTemplateColumns: "repeat(auto-fill, 6rem)" }}
      >
        {topBarItem.map((item, index) => (
          <div
            onClick={() => openLink(item.link)}
            className="font-bold text-xl rounded-sm cursor-pointer h-full w-full flex items-center justify-center"
            key={index}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
