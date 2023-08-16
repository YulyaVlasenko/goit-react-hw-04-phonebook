import { nanoid } from "nanoid"
import { Component } from "react"
import PropTypes from 'prop-types';
import { toast } from "react-hot-toast";

class ContactForm extends Component {

    state = {
        name: '',
        number: '',
    }

    handleChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
        }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { name, number } = this.state
        const { createContact, contacts } = this.props
        const isExisting = contacts && contacts.find(contact => contact.name === name) 
        if (isExisting) {
            toast.error(`${name} is already in contacts.`)
           
            return
        }
        const contact = {
            name,
            number,
            id: nanoid(),
        }
        createContact(contact)
        this.reset()
    }

    reset = () => {
        this.setState({ number: '', name: '' })
    }
     
    render() {
        const {name, number} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="#">Name </label>
                <input type="text" name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    onChange={this.handleChange} value={name} required  />
                
                <label htmlFor="#">Number</label>
                <input type="tel" name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    onChange={this.handleChange} value={number} required />
                
                <button type="submit">Add contact</button>
            </form>
    )}
}

export default ContactForm


ContactForm.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })),
    createContact: PropTypes.func.isRequired,
}