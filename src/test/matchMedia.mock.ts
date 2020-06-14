// @ts-ignore

let currentMatches: Map<string, boolean> = new Map<string, boolean>([]);

export function refreshMatchMedia() {
    currentMatches.clear();
    applyMatchMedia();
}

export function isDesktop() {
    currentMatches.set('(max-width: 750px)', false);
    applyMatchMedia();
}

export function isMobile() {
    currentMatches.set('(max-width: 750px)', true);
    applyMatchMedia();
}

export function isLightMode() {
    currentMatches.set('(prefers-color-scheme: dark)', false);
    applyMatchMedia();
}

export function isDarkMode() {
    currentMatches.set('(prefers-color-scheme: dark)', true);
    applyMatchMedia();
}

function applyMatchMedia() {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: currentMatches.get(query),
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
});
}