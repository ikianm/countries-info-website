'use client'
import React, { useContext } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { ThemeContext } from '@/contexts/themeContext';
import './Topbar.css';

export default function Topbar() {
    const themeCtx = useContext(ThemeContext);
    return (
        <div
            className={themeCtx.isThemeDark ? 'topbar' : 'topbar light'}
        >
            <h1 className='topbar-header'>Where in the world?</h1>
            <button
                className={themeCtx.isThemeDark ? 'topbar-theme-wrapper' : 'topbar-theme-wrapper light'}
                onClick={() => themeCtx.changeTheme()}
            >
                {themeCtx.isThemeDark ? <MdDarkMode /> : < MdLightMode />}
                <span>Dark Mode</span>
            </button>
        </div>
    )
}
