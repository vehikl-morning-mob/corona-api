import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import CoronaApi from './Api/CoronaApi';
import {IProvince} from './types/CovidAPI';

const resultForProvinces: IProvince[] = [
    {
        Country: 'Arztozka',
        Province: 'Alpha',
        Confirmed: 0,
        Deaths: 0,
        Recovered: 0,
        Active: 0,
    },
    {
        Country: 'Arztozka',
        Province: 'Bravo',
        Confirmed: 0,
        Deaths: 0,
        Recovered: 0,
        Active: 0,
    }
];

xdescribe('App', () => {
    beforeEach(() => {
        CoronaApi.getResultsForProvinces = jest.fn().mockResolvedValue(resultForProvinces);
    });

    it('Displays a card for each province', async () => {
        const wrapper = await render(<App/>);

        resultForProvinces.forEach(result => {
            const provinceCard = wrapper.queryByText(result.Province);
            expect(provinceCard).toBeTruthy();
        })
    });
});