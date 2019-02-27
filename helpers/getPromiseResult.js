module.exports = (promise,res = '') => {
    return promise.then(data => {
        // if(res) return res.json(data);
        // else
            return data;
    })
    .catch(err => {
        console.log(err)
        if(res) res.status(500).json(err)
        else return err;
    });
};