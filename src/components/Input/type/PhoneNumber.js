import React, { useRef, useState } from 'react';
import country from '../../../utils/country.json';
import { Search } from '../../../utils/helpers';
import PropTypes from 'prop-types';

const InputNumber = ({ onChange, ...props }) => {
    const [countries, setCountries] = useState(country);
    const [toggleModal, setToggleModal] = useState(false);
    const [phone, setPhone] = useState({
        countryCode: null,
        number: null
    });
    const searchOption = useRef();

    const openOpt = () => {
        setToggleModal(!toggleModal);
        searchOption.current.focus();
    };

    const handleValue = (index) => {
        // set the value for the selected option
        setPhone({ ...phone, countryCode: countries[index].dial_code });

        // remove option and focusing to the next input
        setToggleModal(!toggleModal);

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
            setPhone({
                ...phone,
                number: e.target.value
            });

            // send the value to client
            return onChange({
                name: props.name,
                value: phone.countryCode + ' ' + phone.number
            });
        }
    };

    return (
        <div className='input-phone'>
            <div className='options-container'>
                <div className={`options-wrapper${toggleModal ? ' active' : ''}`}>
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
                <div className={`selected${toggleModal ? ' overlay' : ''}`} onClick={openOpt}>{phone.countryCode !== null ? phone.countryCode : 'Country'}</div>
            </div>
            <input
                className='input-phone__input'
                onChange={handleNumber}
                {...props}/>
        </div>
    );
};

InputNumber.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string
};

InputNumber.defaultProps = {
    onChange: undefined,
    name: undefined
};

export default InputNumber;
