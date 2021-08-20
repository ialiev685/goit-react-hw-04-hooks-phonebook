import React, { Component } from "react";

import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";
import Section from "./Section";
import Filter from "./Filter";
import "./App.scss";

import { v4 as uuidv4 } from "uuid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: "",
    };
  }

  addContact = (newContact) => {
    if (this.checkDoubleName(newContact)) {
      alert(`${newContact.name} уже есть в контактах.`);
      return false;
    }
    const contact = {
      id: uuidv4(),
      ...newContact,
    };

    this.setState((prevState) => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  checkDoubleName = (newContact) => {
    const { name } = newContact;
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    return contacts.some(({ name }) => name.toLowerCase() === normalizedName);
  };

  deleteContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  handleChange = (e) => {
    const value = e.target.value;

    this.setState({ filter: value });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const sordList = this.getFilterContacts();

    return (
      <Section>
        <h1 className="caption">Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className="title">Contacts</h2>
        <Filter valueFilter={filter} onChange={this.handleChange} />
        <ContactsList contacts={sordList} onDelete={this.deleteContact} />
      </Section>
    );
  }
}

export default App;
