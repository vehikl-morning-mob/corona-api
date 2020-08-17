import React from 'react';
import Card from './Card';
import {act, render} from '@testing-library/react';
import CoronaApi from '../Api/CoronaApi';
import {IStats} from '../types/CovidAPI';

const statistics: IStats = {
    NewConfirmed: 4,
    NewDeaths: 1,
    TotalConfirmed: 20,
    TotalDeaths: 60,
};

const title: string = 'The given title';

describe('Card', () => {
    let wrapper: any;

    beforeEach(async () => {
        CoronaApi.getResultsForCountry = jest.fn().mockResolvedValue(statistics);
        await renderComponent();
    });


    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays the given title', async () => {
        expect(wrapper.getByText(title, {exact: false})).toBeTruthy();
    });

    describe('displays the statistics data', () => {
        it('provides the total number of confirmed cases', async () => {
            expect(wrapper.getByText(statistics.TotalConfirmed.toString(), {exact: false})).toBeTruthy();
        });

        it('provides the total number of deaths', async () => {
            expect(wrapper.getByText(statistics.TotalDeaths.toString(), {exact: false})).toBeTruthy();
        });
    });

    async function renderComponent() {
        return act(async () => {
            wrapper = await render(<Card title={title} statistics={statistics}/>);
        });
    }
});
