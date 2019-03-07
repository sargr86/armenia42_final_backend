module.exports = () => {
    let res = '';
    let counter = 0;
    SUPPORTED_LANGUAGES.map(lang => {
        res += `'name_${lang}` + (counter === SUPPORTED_LANGUAGES.length - 1 ? `'` : `',`);
        ++counter;
    });
    console.log(res)
    return res;
};