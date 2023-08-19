
import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [contacts, setContacts] = useState(() => {
  const savedList = localStorage.getItem('contacts');
  return savedList ? JSON.parse(savedList) : [];
  });
  const [filter, setFilter] = useState('');

useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);

  const createContact = (contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
    toast.success('Create contact successfully!');
  };


  const getListOfContacts = () => {
    if (!contacts) return [];
    const filterValue = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  const handleChangeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const deleteContact = (contactForDelete) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactForDelete)
    );
    toast.error('Delete contact successfully!');
  };

  const listOfContacts = getListOfContacts();
  const isContactListEmpty = listOfContacts.length === 0;

  return (
    <>
      <Section title="Phonebook">
        <ContactForm createContact={createContact} contacts={contacts} />
      </Section>

      <Section title="Contacts">
        <Filter
          title="Find contacts by name"
          handleChangeFilter={handleChangeFilter}
          value={filter}
        />
        {!isContactListEmpty && (
          <ContactList contacts={listOfContacts} deleteContact={deleteContact} />
        )}
      </Section>
      <Toaster />
    </>
  );
}

export default App;
