// @ts-ignore
Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn().mockImplementation((_: ScrollToOptions) => ({})),
});