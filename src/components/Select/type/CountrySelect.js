import React from 'react';
import countries from '../../../utils/country.json';
import PropTypes from 'prop-types';
import SingleSelect from './SingleSelect';

const options = countries.map(function(e) {
    return { value: e.code, label: e.name };
});

const CounrySelect = ({ isSearchable = true, ...props }) => {
    return (
        <SingleSelect options={options} isSearchable={isSearchable} {...props} />
    );
};

CounrySelect.propTypes = {
    isSearchable: PropTypes.bool
};

CounrySelect.defaultProps = {
    isSearchable: undefined
};

export default CounrySelect;
