module.exports = (str, folder2Name = false) => {
    let res;
    if (folder2Name) {
        str = str.replace(/[|&;:$%@"<>()+,]/g, "");
        res = str.replace(/[_]/g, " ")

    }
    else {

        res = str.replace(/[|_&;:$%@"<>()+,]/g, " ");
    }
    return res;
};