import React, {useEffect, useState} from 'react';
import './App.css';
import Card from './Components/Card';
import {ICountry} from "./types/CovidAPI";
import CoronaApi from "./Api/CoronaApi";

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

    useEffect(() => {
        CoronaApi.getResultsForCountry('Canada').then((result) => {
            setStatistics({...result});
        })
    }, []);

    return (
        <Card title='Canada' statistics={statistics}/>
    );
}

export default App;
