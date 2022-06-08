import React from 'react';
import PropTypes from 'prop-types';
import InputNumber from './type/PhoneNumber';
import InputDefault from './type/Default';
import './input.scss';
import { INPUT_TYPE_PHONE } from '../../utils/constant';

const Input = ({ title, type, ...props }) => {
    const inputConfig = (
        type == INPUT_TYPE_PHONE
            ? <InputNumber {...props} />
            : <InputDefault {...props}/>
    );

    return (
        title
            ? <div className='input__group'>
                <label>{title}</label>
                {inputConfig}
            </div>
            : inputConfig
    );
};

Input.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func
};

Input.defaultProps = {
    title: undefined,
    type: undefined,
    onChange: undefined
};

export default Input;
