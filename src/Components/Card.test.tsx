import React from 'react';
import Card from './Card';
import {act, render} from '@testing-library/react';
import CoronaApi from '../Api/CoronaApi';
import summaryFixture from '../fixtures/summary.json';
import {ICountry} from "../types/CovidAPI";

const country: ICountry = summaryFixture.Countries[0];

describe('Card', () => {
    let wrapper: any;

    beforeEach(async () => {
        CoronaApi.getResultsForCountry = jest.fn().mockResolvedValue(country);
        await renderComponent();
   });

    afterEach(() => {
       jest.clearAllMocks();
    });

    it('renders the country name',  async () => {
        expect(wrapper.getByText(country.Country, {exact: false})).toBeTruthy();
    });

    it('provides the number of cases for the given country', async() => {
        expect(wrapper.getByText(country.TotalConfirmed.toString(), {exact: false})).toBeTruthy();
    });

    async function renderComponent() {
        return act(async () => {
            wrapper = await render(<Card countryName={country.Country} />);
        });
    }
});
