import React, { useRef, useState } from 'react';
import { Search } from '../../../utils/helpers';
import PropTypes from 'prop-types';

const MultiSelect = ({ isSearchable = false, options, ...props }) => {
    const [loadOption, setLoadOption] = useState(options);
    const [selectedValue, setSelectedValue] = useState([]);
    const selectedOption = useRef(null);
    const inputSearch = useRef(null);
    const optionBox = useRef(null);

    const handleSearch = (e) => {
        // keep the option box active when client find the option
        optionBox.current.parentNode.classList.add('overlay');
        optionBox.current.classList.add('active');

        // search option on value changed
        const result = Search(e.target.value, options);

        setLoadOption(result);
    };

    const openOption = () => {
        optionBox.current.parentNode.classList.toggle('overlay');
        optionBox.current.classList.toggle('active');
        inputSearch.current.focus();
    };

    const removeOption = (val) => {
        // avoid toggle from open option function and smoothly close
        optionBox.current.parentNode.classList.toggle('overlay');
        optionBox.current.classList.toggle('active');

        if (val == 'All') {
            setSelectedValue([]);
        } else {
            setSelectedValue(selectedValue.filter(arr => arr !== val));
        }
    };

    const handleValue = (index) => {
        setSelectedValue((prev) => (
            [
                ...prev,
                {
                    label: loadOption[index].label,
                    value: loadOption[index].value
                }
            ]
        ));

        // reset searching
        inputSearch.current.value = '';
        setLoadOption(options);

        return props.onChange(selectedValue); // --> send the value to client
    };

    return (
        <div className='select-box multi' onClick={openOption}>
            <div className='option-selected'>
                <div className='option-selected__group' ref={selectedOption}>
                    {
                        selectedValue.length !== 0 &&
                            selectedValue.map((v, index) => (
                                <div key={index}>
                                    {v.label} &nbsp;
                                    <svg
                                        onClick={() => removeOption(v)}
                                        height='20'
                                        width='20'
                                        viewBox='0 0 20 20'
                                        aria-hidden='true'
                                        focusable='false'>
                                        <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' />
                                    </svg>
                                </div>
                            ))
                    }
                    <input className={`select-box__search ${isSearchable && 'disabled'}`} onChange={handleSearch} ref={inputSearch}/>
                </div>
                {
                    selectedValue.length !== 0 &&
                    <svg
                        onClick={() => removeOption('All')}
                        height='20'
                        width='20'
                        viewBox='0 0 20 20'
                        aria-hidden='true'
                        focusable='false'
                        className='icon-clear'>
                        <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' />
                    </svg>
                }
                <svg
                    height='20'
                    width='20'
                    viewBox='0 0 20 20'
                    aria-hidden='true'
                    focusable='false'
                    className='icon-chevron-down'>
                    <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z' />
                </svg>
            </div>
            <div className='options-container'>
                <div className='options-wrapper' ref={optionBox}>
                    {
                        loadOption.length !== 0
                            ? loadOption.map((option, index) => (
                                <div
                                    className='option'
                                    key={index}
                                    onClick={() => handleValue(index)}>
                                    <input value={option.value} type='radio' className='radio'/>
                                    <label>{option.label}</label>
                                </div>
                            ))
                            : <div className='option__not-found' disabled={true}>
                                <label>result not found.</label>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

MultiSelect.propTypes = {
    isSearchable: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.array
};

export default MultiSelect;
