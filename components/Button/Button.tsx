'use client'
import React, { useContext } from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/types/types';
import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/contexts/themeContext';
import './Button.css';

export default function Button({ children, href, back }: ButtonProps) {
    const router = useRouter();
    const themeCtx = useContext(ThemeContext);

    if (back) {
        return (
            <button
                className={themeCtx.isThemeDark ? 'button back' : 'button back light'}
                onClick={() => router.back()}
            >
                <BsArrowLeft className='button-icon' />
                {children}
            </button>
        )
    }

    return (
        <Link
            href={`/${href}`}
            className={themeCtx.isThemeDark ? 'button' : 'button light'}>
            {children}
        </Link>
    )
}
