import React from 'react';

interface ICardProps {
    countryName: string;
}

const Card: React.FC<ICardProps> = ({countryName}) => {
    return (
        <p>I am the card for {countryName}</p>
    )
};

export default Card;