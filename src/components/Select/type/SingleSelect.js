import React, { useRef, useState } from 'react';
import { Search } from '../../../utils/helpers';
import PropTypes from 'prop-types';

const SingleSelect = ({ isSearchable = false, options, onChange, ...props }) => {
    const selectedValue = useRef(null);
    const [loadOption, setLoadOption] = useState(options);
    const [toggleModal, setToggleModal] = useState(false);

    const handleChange = (e) => {
        const result = Search(e.target.value, options);

        setLoadOption(result);
    };

    const openOption = () => {
        setToggleModal(!toggleModal);
    };

    const postValue = (index) => {
        selectedValue.current.value = loadOption[index].label;

        // reset searching
        setLoadOption(options);

        // send value to the client
        return onChange({
            label: loadOption[index].label,
            value: loadOption[index].value
        });
    };

    return (
        <div className={`select-box single${toggleModal ? ' overlay' : ''}`} onClick={openOption}>
            <div className='options-container'>
                <div className={`options-wrapper${toggleModal ? ' active' : ''}`}>
                    {
                        loadOption.length !== 0
                            ? loadOption.map((option, index) => (
                                <div
                                    className='option'
                                    key={index}
                                    onClick={() => postValue(index)}>
                                    <input value={option.value} type='radio' className='radio'/>
                                    <label>{option.label}</label>
                                </div>
                            ))
                            : <div className='option__not-found'>
                                <label>result not found.</label>
                            </div>
                    }
                </div>
            </div>
            <input
                ref={selectedValue}
                className='select-box__input disabled'
                onChange={handleChange}
                disabled={!isSearchable}
                {...props} />
            <svg
                height='20'
                width='20'
                viewBox='0 0 20 20'
                aria-hidden='true'
                focusable='false'
                className='css-8mmkcg'>
                <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z' />
            </svg>
        </div>
    );
};

SingleSelect.propTypes = {
    isSearchable: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.array
};

SingleSelect.defaultProps = {
    isSearchable: undefined,
    onChange: undefined,
    options: []
};

export default SingleSelect;
