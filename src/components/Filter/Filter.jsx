
import PropTypes from 'prop-types';
import React from 'react'

const Filter = ({title, value, handleChangeFilter}) => {
  return (
      <form>
          <label htmlFor="#">{title}: </label>
          <input type="text" name="filter" onChange={handleChangeFilter} value={value} />
      </form>
  )
}

export default Filter

Filter.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChangeFilter: PropTypes.func.isRequired,
}