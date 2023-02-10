import React from 'react';

const useLocalStorage = () => {
    const [theme, setValue] = React.useState(true);
    const setTheme = () => {
        setValue(!theme);
        if (!theme) {
            localStorage.setItem('theme', JSON.stringify('light'));
        } else {
            localStorage.setItem('theme', JSON.stringify('dark'));
        }
    };

    const checkValue = () => {
        try {
            const value = localStorage.getItem('theme');
            if (JSON.parse(value) === 'dark') {
                setValue(false);
            } else {
                setValue(true);
            }
        } catch (error) {
            setValue(true);
        }
    };
    React.useEffect(() => {
        checkValue();
    }, []);
    return [theme, setTheme];
};
export default useLocalStorage;
