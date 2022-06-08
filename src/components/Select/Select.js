import React from 'react';
import PropTypes from 'prop-types';
import SingleSelect from './type/SingleSelect';
import MultiSelect from './type/MultiSelect';
import './select.scss';
import { SELECT_BOX_COUNTRY, SELECT_BOX_MULTI, SELECT_BOX_SINGLE } from '../../utils/constant';
import CounrySelect from './type/CountrySelect';

const Select = ({ title, isSearchable = true, type, options, ...props }) => {
    const selectConfig = (
        type == SELECT_BOX_SINGLE
            ? <SingleSelect
                isSearchable={isSearchable}
                options={options}
                {...props}/>

            : type == SELECT_BOX_MULTI
                ? <MultiSelect
                    isSearchable={isSearchable}
                    options={options}
                    {...props}/>

                : type == SELECT_BOX_COUNTRY
                    ? <CounrySelect
                        isSearchable={isSearchable}
                        {...props}/>

                    : <SingleSelect
                        isSearchable={false}
                        options={options}
                        {...props}/>
    );

    return (
        title
            ? <div className='input__group'>
                <label>{title}</label>
                {selectConfig}
            </div>
            : selectConfig
    );
};

Select.propTypes = {
    title: PropTypes.string,
    options: PropTypes.array,
    type: PropTypes.string,
    onChange: PropTypes.func,
    isSearchable: PropTypes.bool
};

Select.defaultProps = {
    title: undefined,
    options: [],
    type: undefined,
    onChange: undefined,
    isSearchable: undefined
};

export default Select;
