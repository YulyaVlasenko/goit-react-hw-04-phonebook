
import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm/ContactForm";
import { Section } from "./Section/Section";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [contacts, setContacts] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedList = localStorage.getItem('contacts');
    if (savedList) {
      setContacts(JSON.parse(savedList));
    }
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      if (contacts.length > 0) {
        toast.success('Contact operation successful!');
      }
    }
  }, [contacts]);

  const createContact = (contact) => {
    setContacts((prevContacts) => {
      if (prevContacts === null) {
        return [contact];
      } else {
        return [...prevContacts, contact];
      }
    });
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const deleteContact = (contactForDelete) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactForDelete)
    );
  };

  return (
    <>
      <Section title='Phonebook'>
        <ContactForm createContact={createContact} contacts={contacts} />
      </Section>
      
      <Section title='Contacts'>
        <Filter
          title='Find contacts by name'
          handleChangeFilter={handleChangeFilter}
          value={filter}
        />
        {filteredContacts.length > 0 && (
          <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
        )}
      </Section>
      <Toaster />
    </>
  );
};

export default App;
