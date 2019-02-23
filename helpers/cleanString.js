module.exports = (str)=>{
    return str.replace(/[|_&;:$%@"<>()+,]/g, "");
};