module.exports = (name,lower = false)=>{
    let res  =  name.replace(/ /g, "_");
    if(lower) res = res.toLowerCase();
    return res;
};