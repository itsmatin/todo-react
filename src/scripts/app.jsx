import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Form from "./components/form";
import TaskItem from "./components/taskItem";
import Login from "./components/login";

function TaskGroup({ title, children, count }) {
  return (
    count > 0 && (
      <div className="task-group">
        <span className="task-group-title">
          {title}
          <small> ({count})</small>
        </span>
        {children}
      </div>
    )
  );
}

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [completedCount, setCompletedCount] = useState(0); // State to keep track of completed tasks count
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // This useEffet populates tasks and username from localstorage on Initial load
    const cachedTasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(
      cachedTasks === null ? [] : JSON.parse(localStorage.getItem("tasks"))
    );

    setLogin(localStorage.getItem("username") ? false : true);
  }, []);

  useEffect(() => {
    if (login !== true)
      setTimeout(() => {
        setUsername(
          localStorage.getItem("username")
            ? localStorage.getItem("username")
            : "User"
        );
      }, 3600);
  }, [login]);

  useEffect(() => {
    //Everytime a new tasks is added to list, it will also be appended to localstorage
    //We will also keep track of count of completed tasks on each update
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setCompletedCount(() => {
      let completedCount = 0;
      tasks?.map((task) => {
        if (task.completed) completedCount++;
        return task;
      });
      return completedCount;
    });
  }, [tasks]);

  function handleDeleteTask(id) {
    setTasks((prevState) => {
      const tempState = [...prevState];
      const taskToRemoveIndex = tempState.findIndex((item) => item.id === id);
      tempState.splice(taskToRemoveIndex, 1);
      return [...tempState];
    });
  }

  function handleChangeTaskStatus(id, status) {
    setTasks((prevState) => {
      const tempState = [...prevState];
      const taskToModifyIndex = tempState.findIndex((item) => item.id === id);
      const taskToModify = tempState.splice(taskToModifyIndex, 1);
      taskToModify[0].completed = status;
      tempState.push(taskToModify[0]);
      return [...tempState];
    });
  }

  return (
    <>
      {login && <Login shouldLogin={login} setLogin={setLogin} />}

      <div className={`app app--dark`}>
        <Navbar username={username} />
        <section>
          <Form setTasks={setTasks} username={username} />

          <TaskGroup title="Open Tasks" count={tasks?.length - completedCount}>
            {tasks?.map((task, index) => {
              if (!task?.completed)
                return (
                  <TaskItem
                    completed={false}
                    onDelete={handleDeleteTask}
                    onChangeTaskStatus={handleChangeTaskStatus}
                    id={task?.id}
                    key={index}
                  >
                    {task?.title}
                  </TaskItem>
                );
              else return null;
            })}
          </TaskGroup>

          <TaskGroup title="Finished Tasks" count={completedCount}>
            {tasks?.map((task, index) => {
              if (task?.completed)
                return (
                  <TaskItem
                    onDelete={handleDeleteTask}
                    onChangeTaskStatus={handleChangeTaskStatus}
                    id={task?.id}
                    key={index}
                  >
                    {task?.title}
                  </TaskItem>
                );
              else return null;
            })}
          </TaskGroup>
        </section>
      </div>
    </>
  );
}

export default App;
