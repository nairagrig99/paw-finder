import {createContext, type ReactNode, useEffect, useState} from "react";
import {THEME_MODE} from "../constant.ts";

interface ThemeContextProps {
    theme: string,
    toggleTheme?: () => void,
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({children}: { children: ReactNode }) {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('themeMode') || 'light'));

    useEffect(() => {
        localStorage.setItem('themeMode', JSON.stringify(theme))
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])


    const toggleTheme = () => {
        setTheme((prevTheme: string) => (prevTheme === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT));
    }

    return <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}