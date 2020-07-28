import React from 'react';
import Card from './Card';
import {act, render} from '@testing-library/react';
import CoronaApi from '../Api/CoronaApi';

const numberOfCases = 500;
const countryName: string = 'Canada';

describe('Card', () => {
    let wrapper: any;

    beforeEach(async () => {
        CoronaApi.prototype.getResultsForCountry = jest.fn().mockResolvedValue({
           countryName: countryName,
           numberOfCases: numberOfCases
        });

        await renderComponent();
   });

    afterEach(() => {
       jest.clearAllMocks();
    });

    it('renders the country name',  async () => {
        expect(wrapper.getByText(countryName, {exact: false})).toBeTruthy();
    });

    it('provides the number of cases for the given country', async() => {
        expect(wrapper.getByText(numberOfCases.toString(), {exact: false})).toBeTruthy();
    });

    async function renderComponent() {
        return act(async () => {
            wrapper = await render(<Card countryName={countryName} />);
        });
    }
});
