import React, {useEffect, useState} from "react";
import CoronaApi from "../Api/CoronaApi";
import {ICountry} from "../types/CovidAPI";
import "./Card.css"

interface ICardProps {
    countryName: string;
}

const initialStatistics: ICountry = {
    Country: '',
    NewConfirmed: 0,
    NewDeaths: 0,
    NewRecovered: 0,
    TotalConfirmed: 0,
    TotalDeaths: 0,
    TotalRecovered: 0,
};

const Card: React.FC<ICardProps> = ({countryName}) => {
    const [statistics, setStatistics] = useState<ICountry>(initialStatistics);

    useEffect(() => {
        CoronaApi.getResultsForCountry(countryName).then((result) => {
            setStatistics({...result});
        })
    }, []);

    return (
        <div className="card-container">
            <h2>{countryName}</h2>
            <ul>

                <li>Total Confirmed: {statistics.TotalConfirmed}</li>
                <li>Total Deaths: {statistics.TotalDeaths}</li>
                <li>Total Recovered: {statistics.TotalRecovered}</li>
            </ul>
        </div>
    )
};

export default Card;