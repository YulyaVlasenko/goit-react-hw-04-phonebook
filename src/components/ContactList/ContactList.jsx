import Contact from "components/Contact/Contact";
import PropTypes from 'prop-types';
import React from 'react';



const ContactList = ({ contacts, deleteContact }) => {
  return (
     <ul>
              {contacts && contacts.map(contact => {
                return (
                  <Contact
                    key={contact.id}
                    contact={contact}
                    onClick={() => deleteContact(contact.id)}   
                    />
                );
              })}
            </ul>
  )
}

export default ContactList

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })),
    deleteContact: PropTypes.func.isRequired,
}