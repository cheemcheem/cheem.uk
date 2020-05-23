import React from "react";

export const defaultPage = "Home";
export const defaultLocation = "about me";
export const defaultIsNavBarLarge = true;
export const defaultIsDarkMode = true;
export const defaultIsMobile = false;

export const PageContext = React.createContext({
    page: defaultPage, setPage: (_: string) => {
    }
});
export const NavContext = React.createContext({
    isMobile: defaultIsMobile,
    isNavBarLarge: defaultIsNavBarLarge
});

export const LocationContext = React.createContext({
    location: defaultLocation,
    setTargetLocation: (_: string) => {
    }
});
export const DarkModeContext = React.createContext(defaultIsDarkMode);