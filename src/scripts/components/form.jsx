import { ReactComponent as Enter } from "../../assets/icons/enter.svg";
import { useEffect, useState } from "react";

const Form = ({ setTasks, username }) => {
  const [newTask, setNewTask] = useState();
  const [lastId, setLastId] = useState(0);
  const date = new Date(Date.now()).toString().split(" ");

  useEffect(() => {
    setLastId(() => parseInt(localStorage.getItem("lastId") || 0));
  }, []);

  useEffect(() => {
    localStorage.setItem("lastId", lastId);
  }, [lastId]);

  function handleAddTask(event) {
    event.preventDefault();
    setTasks((prevState) => {
      return [
        ...prevState,
        { completed: false, title: newTask, id: lastId + 1 },
      ];
    });
    setNewTask("");
    setLastId((prevState) => prevState + 1);
  }

  return (
    <form onSubmit={handleAddTask}>
      <h1 className="title">
        Hi {username.split(" ")[0]}. What are your ToDos for today?
        <time className={`date date--dark`}>
          {`${date[0]}, ${date[1]} ${date[2]} ${date[3]}`}
        </time>
      </h1>

      <div className="form-input-group">
        <label aria-label="new-task">
          <input
            autoFocus
            required
            type="text"
            maxLength={100}
            value={newTask}
            aria-label="username"
            placeholder="e.g Update Wordpress ..."
            onChange={(event) => setNewTask(event.target.value)}
          />
        </label>
        <button aria-roledescription="form submission">
          <Enter />
        </button>
      </div>
    </form>
  );
};

export default Form;
