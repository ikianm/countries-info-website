'use client'
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CountryPageProps } from '@/types/types';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { extractInfo } from '@/helpers/extractInfo';
import { ThemeContext } from '@/contexts/themeContext';
import './page.css';

export default function CountryPage({ params }: CountryPageProps) {
    const [countryInfo, setCountryInfo] = useState<any>(null);
    const themeCtx = useContext(ThemeContext);
    const router = useRouter();
    const path = params.countryName;
    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/${path.length >= 3 ? 'name' : 'alpha'}/${path}`, {
            cache: 'no-store'
        })
            .then(res => res.json())
            .then(data => {
                if (data[0]) { //if the data is invalid, fallback directs the user to the homepage
                    setCountryInfo((prevState: any) => extractInfo(data[0]));
                } else {
                    router.replace('/');
                }
            })
    }, [])

    return (
        <div
            className={themeCtx.isThemeDark ? 'country-page' : 'country-page light'}
        >
            <Button href='#' back>Back</Button>
            <div className="country-page-wrapper">
                <Image src={countryInfo?.flags.svg} width={550} height={350} alt={`${countryInfo?.name.official}'s flag`} id='flag' />
                <div className='country-page-description'>
                    <h2>{countryInfo?.name.common}</h2>
                    <div className='country-page-lists-wrapper'>
                        <ul>
                            <li>Native Name: <span>{countryInfo?.name.official}</span></li>
                            <li>Population: <span>{countryInfo?.population}</span></li>
                            <li>Region: <span>{countryInfo?.region}</span></li>
                            <li>Sub Region: <span>{countryInfo?.subregion}</span></li>
                            <li>Capital: <span>{countryInfo?.capital[0]}</span></li>
                        </ul>
                        <ul>
                            <li>Top Level Domain: <span>{countryInfo?.tld[0]}</span></li>
                            <li>Currencies: <span>{countryInfo?.currencies}</span></li>
                            <li>Languages:
                                {
                                    countryInfo?.languages.map((language: string): any => (
                                        <span> {language}, </span>
                                    ))
                                }
                            </li>
                        </ul>
                    </div>

                    <div className='country-page-borders'>Border Countries:
                        <div>
                            {
                                countryInfo?.borders.map((border: string) => (
                                    <Button href={border}>{border}</Button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
