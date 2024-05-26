import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTasksData } from "../store/Tasks.slice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const [tableColumns, setTableColumns] = useState([
    "Title",
    "Description",
    "Status",
    "Created on",
    "Updated on",
    "Actions",
  ]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("To do");
  const [isUpdate, toggleIsUpdate] = useState(false);
  const [toUpdateItem, setToUpdateItem] = useState(null);
  const [showNewTaskPopup, togglePopup] = useState(false);

  const fetchData = () => {
    axios
      .post("http://localhost:3000/tasks/getAllTasks", {})
      .then((data) => data.data)
      .then((data) => {
        dispatch(setTasksData(data["tasks"]));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openUpdatePopup = (item) => {
    setTaskName(item.title);
    setTaskDescription(item.description);
    setTaskStatus(item.status);
    toggleIsUpdate(true);
    setToUpdateItem(item);
    togglePopup(true);
  };

  const addNewTask = () => {
    axios
      .post("http://localhost:3000/tasks/create", {
        title: taskName,
        description: taskDescription,
        status: "To do",
        created: JSON.stringify(new Date()),
      })
      .then(function (response) {
        alert("Task created");
        setTaskName("");
        setTaskDescription("");
        togglePopup(false);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteItem = (id) => {
    axios
      .post("http://localhost:3000/tasks/delete", {
        id,
      })
      .then(function (response) {
        alert("Task deleted");
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateItem = () => {
    const payload = {
      id: toUpdateItem.id,
      title: taskName,
      description: taskDescription,
      status: taskStatus,
      updated: JSON.stringify(new Date()),
    };
    axios
      .post("http://localhost:3000/tasks/update", payload)
      .then(function (response) {
        alert("Task updated");
        setTaskName("");
        setTaskDescription("");
        setTaskStatus("To do");
        toggleIsUpdate(false);
        setToUpdateItem(null);
        togglePopup(false);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDateString = (data) => {
    const dateObject = new Date(data);
    return `${dateObject.getDate()} - ${
      dateObject.getMonth() + 1
    } - ${dateObject.getUTCFullYear()}`;
  };

  return (
    <div className="h-full w-full shadow-2xl shadow-zinc-950 rounded-lg">
      <div className="p-4" style={{ overflowY: "auto", height: "96%" }}>
        <table>
          <thead>
            <tr>
              {tableColumns.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 &&
              tasks.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>{item.created}</td>
                  <td>{item.updated}</td>
                  <td>
                    <div className="flex gap-x-2">
                      <div
                        onClick={() => deleteItem(item.id)}
                        className="cursor-pointer"
                      >
                        Delete
                      </div>
                      <div
                        onClick={() => openUpdatePopup(item)}
                        className="cursor-pointer"
                      >
                        Update
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        className="popup-mask"
        style={
          showNewTaskPopup
            ? { transform: "scale(1)" }
            : { transform: "scale(0)" }
        }
      >
        {showNewTaskPopup && (
          <div className="popup p-4 flex flex-col gap-y-5">
            <div>
              <h1>Add task form</h1>
            </div>
            <div className="flex justify-between">
              <label htmlFor="fname">Task title</label>
              <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="border-solid border-2 p-2"
                type="text"
                id="fname"
                name="fname"
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="lname">Description</label>
              <input
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="border-solid border-2 p-2"
                type="text"
                id="lname"
                name="lname"
              />
            </div>
            {isUpdate && (
              <div className="flex justify-between">
                <label htmlFor="status">Status</label>
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  name="status"
                  id="status"
                  className="border-solid border-2 p-2"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}
            <div className="flex justify-end">
              <div
                className="h-10 w-24 cursor-pointer flex justify-center items-center rounded-lg"
                style={{
                  background: "#34495e",
                  color: "white",
                  boxShadow: "3px 3px 10px grey",
                  top: "85%",
                  right: "5%",
                }}
                type="button"
                onClick={() => (isUpdate ? updateItem() : addNewTask())}
              >
                {isUpdate ? "Update" : "Add"}
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="absolute h-10 w-48 cursor-pointer flex justify-center items-center rounded-lg"
        style={{
          background: "#34495e",
          boxShadow: "3px 3px 10px grey",
          top: "85%",
          right: "5%",
        }}
        onClick={() => togglePopup(true)}
      >
        <p className="text-md font-medium p-2" style={{ color: "white" }}>
          Add New task
        </p>
      </div>
    </div>
  );
};

export default Home;
