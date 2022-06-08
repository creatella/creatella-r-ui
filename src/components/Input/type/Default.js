import React from 'react';
import PropTypes from 'prop-types';

const InputDefault = ({ ...props }) => {
    return (
        <input className='input' {...props}/>
    );
};

InputDefault.propTypes = {
    onChange: PropTypes.func
};

InputDefault.defaultProps = {
    onChange: undefined
};

export default InputDefault;
