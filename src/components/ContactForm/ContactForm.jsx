import React, { useState } from "react";
import PropTypes from 'prop-types';
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";

const ContactForm = ({ createContact, contacts }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "number") {
            setNumber(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isExisting = contacts.find(contact => contact.name === name);
        if (isExisting) {
            toast.error(`${name} is already in contacts.`);
            return;
        }
        
        const contact = {
            name,
            number,
            id: nanoid(),
        };
        createContact(contact);
        reset();
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces."
                onChange={handleChange}
                value={name}
                required
            />

            <label htmlFor="number">Number</label>
            <input
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                onChange={handleChange}
                value={number}
                required
            />

            <button type="submit">Add contact</button>
        </form>
    );
}

ContactForm.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
    createContact: PropTypes.func.isRequired,
};

export default ContactForm;