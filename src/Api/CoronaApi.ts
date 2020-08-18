import axios from "axios";
import {ICountry, IProvince, ISummary} from "../types/CovidAPI";

export default class CoronaApi {
    static async getResultsForCountry(country: string): Promise<ICountry> {
        const response = await axios.get<ISummary>('https://api.covid19api.com/summary');
        const countryResults: ICountry | undefined = response.data.Countries
            .find(currentCountry => currentCountry.Country === country);

        if (!countryResults) {
            throw Error(`The country ${country} could not be found.`);
        }

        return countryResults;
    }

    static async getResultsForProvinces(country: string): Promise<IProvince[]> {
        const response = await axios.get<IProvince[]>('https://api.covid19api.com/country/canada');

        const provinceNames = new Set(response.data.map(provinceStat => provinceStat.Province));


        const initialValue: IProvince = {
            Country: '',
            Province: '',
            Confirmed: 0,
            Deaths: 0,
            Active: 0,
        };

        return Array.from(provinceNames).map(provinceName => {
            const provinceDataPoints = response.data.filter(data => data.Province === provinceName);
            return provinceDataPoints.reduce((accumulated: IProvince, dataPoint: IProvince) => {

                return {
                    Country: dataPoint.Country,
                    Province: dataPoint.Province ? dataPoint.Province : 'Nunavut',
                    Confirmed: accumulated.Confirmed + dataPoint.Confirmed,
                    Deaths: accumulated.Deaths + dataPoint.Deaths,
                    Active: accumulated.Active + dataPoint.Active,
                }
            }, initialValue);
        });
    }
}