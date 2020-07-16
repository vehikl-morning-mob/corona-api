import React from 'react';
import Card from './Card';
import { render } from '@testing-library/react';

test('renders the country name', () => {
    const name = 'Canada';
    const {getByText} = render(<Card countryName={name} />);

    expect(getByText(name, {exact: false})).toBeTruthy();
});