import "./ContactItem.scss";
import PropTypes from "prop-types";

const ContactItem = ({ name, number, onDelete, id }) => {
  return (
    <li className="contacts-list__item">
      <span>
        {name}: {number}
      </span>
      <input
        className="contacts-list__button"
        type="button"
        value="delete"
        onClick={() => onDelete(id)}
      />
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ContactItem;
