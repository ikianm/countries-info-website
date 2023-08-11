import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CountryProps } from '@/types/types';
import './CountryCard.css';
import { ThemeContext } from '@/contexts/themeContext';


export default function CountryCard({ name, flags, capital, population, region }: CountryProps) {
    const themeCtx = useContext(ThemeContext);
    return (
        <Link
            className={themeCtx.isThemeDark ? 'card' : 'card light'}
            href={`/${name.official}`}
        >
            <Image
                src={flags.svg}
                width={320} height={175}
                alt='none'
                id='card-image'
            />
            <div className='card-description'>
                <h4 className='card-title'>{name.official}</h4>
                <p className='card-desc'>Population: <span>{population}</span></p>
                <p className='card-desc'>Region: <span>{region}</span></p>
                <p className='card-desc'>Capital: <span>{capital[0]}</span></p>
            </div>
        </Link>
    )
}
