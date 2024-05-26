import React from "react";

const AddTask = () => {
  return (
    <div className="h-full w-full shadow-2xl shadow-slate-500 rounded-lg p-4 flex flex-col">
      <h1 className="p-4 font-bold">Add new Task</h1>
      <div className="w-1/3 flex flex-col shadow-2xl shadow-slate-500 p-4 rounded-lg">
        <label for="fname">Task title</label>
        <input type="text" id="fname" name="fname" />
        <label for="lname">Last name:</label>
        <input type="text" id="lname" name="lname" />
      </div>
    </div>
  );
};

export default AddTask;
