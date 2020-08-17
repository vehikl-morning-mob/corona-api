import React from "react";
import {IStats} from "../types/CovidAPI";
import "./Card.css"

interface ICardProps {
    title: string;
    statistics: IStats;
}

const Card: React.FC<ICardProps> = ({title, statistics}) => {
    return (
        <div className="card-container">
            <h2>{title}</h2>
            <ul>

                <li>Total Confirmed: {statistics.TotalConfirmed}</li>
                <li>Total Deaths: {statistics.TotalDeaths}</li>
            </ul>
        </div>
    )
};

export default Card;