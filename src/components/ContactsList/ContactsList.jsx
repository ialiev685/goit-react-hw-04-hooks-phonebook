import ContactItem from "../ContactItem";
import "./ContactsList.scss";

import PropTypes from "prop-types";

const ContactsList = ({ contacts, onDelete }) => {
  return (
    <div>
      <ul className="contacts-list">
        {contacts.map(({ id, name, number }) => (
          <ContactItem
            key={id}
            name={name}
            number={number}
            onDelete={onDelete}
            id={id}
          />
        ))}
      </ul>
    </div>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsList;
