import React from "react";
import { useForm } from "react-hook-form";

function ToDo() {
  const { register, handleSubmit, reset } = useForm();
  const [tasks, setTasks] = React.useState([]);

  const onSubmit = (data) => {
    setTasks([...tasks, { taskName: data.EnterTask, completed: false }]);
    reset();
  };

  const handleGetValue = (index, action) => {
    const updatedTasks = [...tasks];
    if (action === "complete") {
      let b = document.querySelectorAll(".in");
      b[index].style.textDecorationLine = "line-through";
    } else if (action === "delete") {
      updatedTasks.splice(index, 1);
    }
    setTasks(updatedTasks);
  };

  return (
    <div className="  container-fluid  d-flex flex-column justify-content-center align-items-center vh-100 bg-dark">
      <div className="container w-50   bg-dark">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="EnterTask" className="text-white">
            Enter Task
          </label>
          <input
            type="text"
            className="form-control"
            {...register("EnterTask")}
          />
          <br />
          <button type="submit" className="btn bg-white my-4 form-control">
            Add
          </button>
        </form>

        <div>
          {tasks.map((task, index) => (
            <div
              key={index}
              className="container d-flex justify-content-center gap-5 ">
              <button
                className="btn btn-success"
                onClick={() => {
                  handleGetValue(index, "complete");
                }}>
                Complete
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleGetValue(index, "delete")}>
                Delete
              </button>
              <input
                type="text"
                value={task.taskName}
                className="form-control in"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
