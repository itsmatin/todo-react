import { createRef, useState } from "react";

const Login = ({ setLogin }) => {
  const inputRef = createRef();
  const [username, setUsername] = useState("");

  function handleChangeName(event) {
    const newName = event.target.value;
    setUsername(newName);
    localStorage.setItem("username", newName);
  }

  function handlePressEnter(event) {
    if (event.keyCode === 13) {
      if (username.length === 0) localStorage.setItem("username", "Guest");
      inputRef.current.blur();
      setLogin(false);
    }
  }

  return (
    <div className="intro">
      <label>
        <input
          autoFocus
          maxLength={15}
          ref={inputRef}
          type="text"
          aria-label="username"
          placeholder="Username. . . "
          value={username}
          onChange={handleChangeName}
          onKeyDown={handlePressEnter}
        />
      </label>
    </div>
  );
};

export default Login;
