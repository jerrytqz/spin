export let BACKEND_BASE_DIR = 'https://spin-backend-production.herokuapp.com/';
if (process.env.NODE_ENV === 'development') {
    BACKEND_BASE_DIR = 'http://127.0.0.1:8000/';
}

export let SOCKET_IO_BASE_DIR = 'https://spin-socketio.jerrytq.com/';
if (process.env.NODE_ENV === 'development') {
    SOCKET_IO_BASE_DIR = 'http://localhost:3001/';
}

export const SPIN_PRICE = 500;
export const MAX_LIST_PRICE = 10000000;
export const LIST_PRICE_PER_FEE = 20;

export const COMMON = 'Common';
export const UNCOMMON = 'Uncommon';
export const RARE = 'Rare';
export const EPIC = 'Epic';
export const HOLY = 'Holy';
export const GODLY = 'Godly';
export const TQ = '???';

export const RARITY_INFO = {
     // NAME: [COLOR, VALUE, ARTICLE, CHANCE]
    [COMMON]: ['brown', 1, 'a', '52%'],
    [UNCOMMON]: ['cyan', 2, 'an', '20%'],
    [RARE]: ['red', 3, 'a', '15%'],
    [EPIC]: ['purple', 4, 'an', '10%'],
    [HOLY]: ['orange', 5, 'a', '2.5%'],
    [GODLY]: ['yellow', 6, 'a', '0.49%'],
    [TQ]: ['rainbow', 7, 'a', '0.01%']
};

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid; 
    }

    if (rules.length) {
        isValid = value.length === rules.length && isValid; 
    }

    if (rules.isEmail) {
        // Simple regex, backend does most of the validation
        const pattern = /\S+@\S+\.\S+/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.minValue) {
        isValid = Number(value) >= rules.minValue && isValid;
    }

    if (rules.maxValue) {
        isValid = Number(value) <= rules.maxValue && isValid;
    }

    if (rules.isNumber) {
        isValid = !isNaN(value) && isValid;
    }

    if (rules.noWhiteSpace) {
        isValid = !/\s/g.test(value) && isValid; 
    }

    return isValid; 
};

export const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const capitalize = (string) => (`${string.charAt(0).toUpperCase()}${string.slice(1)}`); 

export const dhms = (ms, includeDays) => {
    const days = Math.floor(ms/(24 * 60 * 60 * 1000));
    const daysMS = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor((daysMS)/(60 * 60 * 1000));
    const hoursMS = ms % (60 * 60 * 1000);
    const minutes = Math.floor((hoursMS)/(60 * 1000));
    const minutesMS = ms % (60 * 1000);
    const seconds = Math.floor((minutesMS)/(1000));

    const words = [' days', ' hours', ' minutes', ' seconds'];

    if (days === 1) {
        words[0] = words[0].substring(0, words[0].length - 1);
    }
    if (hours === 1) {
        words[1] = words[1].substring(0, words[1].length - 1);
    }
    if (minutes === 1) {
        words[2] = words[2].substring(0, words[2].length - 1);
    }
    if (seconds === 1) {
        words[3] = words[3].substring(0, words[3].length - 1);
    }

    if (includeDays) {
        return `${days} ${words[0]} ${hours} ${words[1]} ${minutes} ${words[2]} ${seconds} ${words[3]}`;
    } else {
        return `${hours} ${words[1]} ${minutes} ${words[2]} ${seconds} ${words[3]}`;
    }
};
