import PropTypes from 'prop-types';


const Contact = ({ contact: { name, number, id }, onClick }) => {
    return (
        <li>
            <p>{name}: {number}</p>
            <button type='button' onClick={() => onClick(id)}>Delete</button>
        </li>
    )
}

export default Contact 


Contact.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
}