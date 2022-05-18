const Navbar = ({ username }) => {
  return (
    <nav>
      <span className="logo">Matin Nikookar | React</span>
      <div>
        <label>
          <input
            readOnly
            maxLength={15}
            aria-label="username"
            type="text"
            placeholder="Your Username ..."
            value={username}
          />
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
