import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from '../components/Select';
import Input from '../components/Input';
import country from '../utils/country.json';

const stories = storiesOf('App Test', module);

const options = country.map(function(e) {
    return { value: e.dial_code, label: e.name };
});

stories.add('App', () => {
    return (
        <div>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Input
                    title='Your phone number :'
                    placeholder='Enter the number'
                    type='phone'
                    onChange={(e) => console.log(e)}/>
                <Input
                    title='Partners phone number :'
                    placeholder='Enter the number'
                    type='phone'
                    onChange={(e) => console.log(e)}/>
                <Input title='First Name :' placeholder='Enter your first name' onChange={(e) => console.log(e)}/>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Input title='Last Name :' placeholder='Enter your last name' onChange={(e) => console.log(e)}/>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Select
                    title='Default select box :'
                    onChange={(e) => console.log(e)}
                    placeholder='Choose an option'
                    options={options} />
                <Select
                    title='Single select box :'
                    type='single-select'
                    onChange={(e) => console.log(e)}
                    placeholder='Choose an option'
                    options={options} />
                <Select
                    title='Multi select box :'
                    type='multi-select'
                    onChange={(e) => console.log(e)}
                    placeholder='Choose an option'
                    options={options} />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Select
                    title='Country select box :'
                    type='country-select'
                    onChange={(e) => console.log(e)}
                    placeholder='Choose a country'/>
            </div>
        </div>
    );
});
