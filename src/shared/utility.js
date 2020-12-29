export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid; 
    }

    if (rules.length) {
        isValid = value.length === rules.length && isValid; 
    }

    if (rules.isEmail) {
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

    return isValid; 
}

export const mapRarityToColor = (rarity) => {
    if (rarity === 'Common') {
        return 'brown';
    }
    if (rarity === 'Uncommon') {
        return 'cyan';
    }
    if (rarity === 'Rare') {
        return 'red';
    }
    if (rarity === 'Epic') {
        return 'purple';
    }
    if (rarity === 'Holy') {
        return 'orange';
    }
    if (rarity === 'Godly') {
        return 'yellow';
    }
    if (rarity === '???') {
        return 'rainbow';
    }
}

export const mapRarityToValue = (rarity) => {
    if (rarity === 'Common') {
        return 1;
    }
    if (rarity === 'Uncommon') {
        return 2;
    }
    if (rarity === 'Rare') {
        return 3;
    }
    if (rarity === 'Epic') {
        return 4;
    }
    if (rarity === 'Holy') {
        return 5;
    }
    if (rarity === 'Godly') {
        return 6;
    }
    if (rarity === '???') {
        return 7;
    }
}

export const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const capitalize = (string) => (string.charAt(0).toUpperCase() + string.slice(1)) 

export const dhm = (ms) => {
    const days = Math.floor(ms/(24 * 60 * 60 * 1000));
    const daysMS = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor((daysMS)/(60 * 60 * 1000));
    const hoursMS = ms % (60 * 60 * 1000);
    const minutes = Math.floor((hoursMS)/(60 * 1000));
    const minutesMS = ms % (60 * 1000);
    const seconds = Math.floor((minutesMS)/(1000));

    const words = [" days", " hours", " minutes", " seconds"];

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

    return days + words[0] + " " + hours + words[1] + " " + minutes + words[2] + " " + seconds + words[3];
}
