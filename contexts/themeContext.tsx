'use client'
import { createContext, useState } from "react";
import { ThemeContextType } from "@/types/types";

export const ThemeContext = createContext<ThemeContextType>({
    isThemeDark: true,
    changeTheme: () => { }
});

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    const [isThemeDark, setIsThemeDark] = useState<boolean>(true);

    const changeTheme = () => {
        console.log('changed');
        setIsThemeDark(prevState => prevState ? false : true);
    };


    return (
        <ThemeContext.Provider value={{ isThemeDark, changeTheme }}>
            {children}
        </ThemeContext.Provider >
    )
}