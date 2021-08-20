import React, { useState, useEffect } from "react";

import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";
import Section from "./Section";
import Filter from "./Filter";
import "./App.scss";

import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    if (checkDoubleName(newContact)) {
      alert(`${newContact.name} уже есть в контактах.`);
      return false;
    }
    const contact = {
      id: uuidv4(),
      ...newContact,
    };

    setContacts((prevContacts) => {
      return [contact, ...prevContacts];
    });
  };

  const checkDoubleName = (newContact) => {
    const { name } = newContact;
    const normalizedName = name.toLowerCase();

    return contacts.some(({ name }) => name.toLowerCase() === normalizedName);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter(({ id }) => id !== contactId);
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setFilter(value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Section>
      <h1 className="caption">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className="title">Contacts</h2>
      <Filter valueFilter={filter} onChange={handleChange} />
      <ContactsList contacts={getFilterContacts()} onDelete={deleteContact} />
    </Section>
  );
};

export default App;
