module.exports = (img)=>{
    let name = img.replace(/ /g, '_');
    // name = name.replace(/.jpeg|.jpg|.png/g, "")
    return name;
};