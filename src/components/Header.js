//rafce creates a component with arrow functions
import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

// main header
// static for the whole app
const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation().pathname;
  return (
    <header className="header">
      <h1>{title}</h1>
      {location === "/" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Manager",
};

Header.propTypes = {
  title: PropTypes.string.isRequired, // makes sure title prop is a string
};
export default Header;
