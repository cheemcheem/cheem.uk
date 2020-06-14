import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, waitForElement} from '@testing-library/react';
import App from './App';
import './test/scrollTo.mock';
import {PageMapping} from "./common/types";
import {isDesktop, isMobile, refreshMatchMedia} from "./test/matchMedia.mock";

afterEach(cleanup);
beforeEach(refreshMatchMedia);

test('given no modes are enabled, when the app loads, page headings and locations should be in the document', async () => {
    const {getByText} = render(<App/>);
    await waitForElement(() => getByText(/Home/));

    PageMapping.forEach((locations, page) => {
        expect(getByText(page)).toBeInTheDocument();
        locations.locations.forEach(location => {
            expect(getByText(location)).toBeInTheDocument();
        })
    });
});

test('given mobile mode is enabled, when the app loads, only page headings should be in the document', async () => {
    isMobile();
    const {getByText, queryByText} = render(<App/>);
    await waitForElement(() => getByText(/Home/));

    PageMapping.forEach((locations, page) => {
        expect(getByText(page)).toBeInTheDocument();
        if (page === 'Home') {
            locations.locations.forEach(location => {
                expect(getByText(location)).toBeInTheDocument();
            })
        } else {
            locations.locations.forEach(location => {
                expect(queryByText(location)).toBeNull();
            })
        }
    });
});

test('given desktop mode is enabled, when the app loads, page headings and locations should be in the document', async () => {
    isDesktop();
    const {getByText} = render(<App/>);
    await waitForElement(() => getByText(/Home/));

    PageMapping.forEach((locations, page) => {
        expect(getByText(page)).toBeInTheDocument();
        locations.locations.forEach(location => {
            expect(getByText(location)).toBeInTheDocument();
        })
    });
});

// Commented out until I figure out how to test light/dark mode
//
// test('given no modes are enabled, when the app loads to Home page, icons should be in light mode', async () => {
//     isDarkMode();
//     const {getByText} = render(<App/>);
//     const linkedInLogo = await waitForElement(() => getByText(/LinkedIn Logo/));
//
//     expect(getByText(/#A0B6A5/)).toBeInTheDocument();
//
// });

