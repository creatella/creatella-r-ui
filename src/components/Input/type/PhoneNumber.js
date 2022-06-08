import React, { useRef, useState } from 'react';
import country from '../../../utils/country.json';
import { Search } from '../../../utils/helpers';
import PropTypes from 'prop-types';

const InputNumber = ({ onChange, ...props }) => {
    const [countries, setCountries] = useState(country);
    const [phone, setPhone] = useState(null);
    const optionBox = useRef(null);
    const selectedOption = useRef(null);
    const searchOption = useRef(null);

    const numberInput = useRef(null);

    const openOpt = () => {
        selectedOption.current.classList.toggle('overlay');
        optionBox.current.classList.toggle('active');
        searchOption.current.focus();
    };

    const handleValue = (index) => {
        // set the value for the selected option
        selectedOption.current.innerHTML = countries[index].dial_code;

        // remove option and focusing to the next input
        selectedOption.current.classList.remove('overlay');
        optionBox.current.classList.remove('active');
        numberInput.current.focus();

        // reset searching
        searchOption.current.value = '';
        setCountries(country);
    };

    const handleSearch = (e) => {
        const result = Search(e.target.value, country);

        setCountries(result);
    };

    const handleNumber = (e) => {
        if (/\D/g.test(e.currentTarget.value)) {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');

            return null; // --> returning null response when client write other than numbers
        } else {
            setPhone(e.target.value);
            const countryCode = selectedOption.current.innerHTML;

            // send the value to client
            return onChange({
                name: e.target.name,
                value: countryCode + phone
            });
        }
    };

    return (
        <div className='input-phone'>
            <div className='options-container'>
                <div className='options-wrapper' ref={optionBox}>
                    <div className='search-bar'>
                        <input
                            className='search-bar__input'
                            placeholder='Search Country'
                            ref={searchOption}
                            onChange={handleSearch}/>
                    </div>
                    {
                        countries.length !== 0
                            ? countries.map((v, index) => (
                                <div className='option' key={index} onClick={() => handleValue(index)}>
                                    <input
                                        value={v.dial_code}
                                        type='radio'
                                        className='radio'/>
                                    <label>{v.name + ' ' + v.dial_code}</label>
                                </div>
                            ))
                            : <div className='option__not-found' disabled={true}>
                                <label>result not found.</label>
                            </div>
                    }
                </div>
            </div>
            <div className='selected' onClick={openOpt} ref={selectedOption}>Country</div>
            <input
                className='input-phone__input'
                onChange={handleNumber}
                name='number-phone'
                {...props}
                ref={numberInput}/>
        </div>
    );
};

InputNumber.propTypes = {
    onChange: PropTypes.func
};

InputNumber.defaultProps = {
    onChange: undefined
};

export default InputNumber;
