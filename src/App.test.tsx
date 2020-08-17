import React from 'react';
import {act, render} from '@testing-library/react';
import App from './App';
import CoronaApi from './Api/CoronaApi';
import {IProvince} from './types/CovidAPI';

const resultForProvinces: IProvince[] = [
    {
        Country: 'Arztozka',
        Province: 'Alpha',
        Confirmed: 0,
        Deaths: 0,
        Active: 0
    },
    {
        Country: 'Arztozka',
        Province: 'Bravo',
        Confirmed: 0,
        Deaths: 0,
        Active: 0
    }
];

describe('App', () => {
    let wrapper: any;

    beforeEach(async () => {
        CoronaApi.getResultsForProvinces = jest.fn().mockResolvedValue(resultForProvinces);
        await renderComponent();
    });

    it('Displays a card for each province', async () => {
        resultForProvinces.forEach(result => {
            const provinceCard = wrapper.queryByText(result.Province);
            expect(provinceCard).toBeTruthy();
        })
    });

    async function renderComponent() {
        return act(async () => {
            wrapper = await render(<App/>);
        });
    }
});