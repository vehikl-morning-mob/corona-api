import React, {useEffect, useState} from 'react';
import './App.css';
import Card from './Components/Card';
import {ICountry, IProvince} from "./types/CovidAPI";
import CoronaApi from "./Api/CoronaApi";
import {IStats} from "./types/CovidAPI/IStats";

const initialStatistics: ICountry = {
    Country: '',
    NewConfirmed: 0,
    NewDeaths: 0,
    NewRecovered: 0,
    TotalConfirmed: 0,
    TotalDeaths: 0,
    TotalRecovered: 0,
};

function App() {
    const [statistics, setStatistics] = useState<ICountry>(initialStatistics);
    const [provinceStatistics, setProvinceStatistics] = useState<IProvince[]>([]);

    function convertToIStats(province: IProvince): IStats {
        return {
            NewConfirmed: 0,
            NewDeaths: 0,
            NewRecovered: 0,
            TotalConfirmed: province.Confirmed,
            TotalDeaths: province.Deaths,
            TotalRecovered: province.Recovered
        }
    }

    useEffect(() => {
        CoronaApi.getResultsForCountry('Canada').then((result) => {
            setStatistics({...result});
        })
        CoronaApi.getResultsForProvinces('Canada').then((result) => {
            setProvinceStatistics([...result]);
        })
    }, []);

    return (
        <>
            <Card title='Canada' statistics={statistics}/>
            <ul>
                {provinceStatistics.map(provinceStat => {
                        return <li>
                            <Card title={provinceStat.Province} statistics={convertToIStats(provinceStat)}/>
                        </li>
                    }
                )}
            </ul>
        </>
    );
}

export default App;
