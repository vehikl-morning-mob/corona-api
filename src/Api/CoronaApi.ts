import axios from "axios";
import {ICountry, ISummary} from "../types/CovidAPI";

export default class CoronaApi {
    static async getResultsForCountry(country: string): Promise<ICountry> {
        const response = await axios.get<ISummary>('https://api.covid19api.com/summary');

        return response.data.Countries.find(currentCountry => currentCountry.Country === country)!;
    }
}