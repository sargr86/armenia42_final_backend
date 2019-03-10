let fs = require('fs');
let path = require('path');

module.exports = (dir, pattern)=>{

    let searchRecursive = function(dir, pattern) {
        // This is where we store pattern matches of all files inside the directory
        let results = [];

        // Read contents of directory
        fs.readdirSync(dir).forEach(function (dirInner) {

            // Obtain absolute path
            dirInner = path.resolve(dir,dirInner );

            // dirInner = path.relative(process.cwd(), dir);
            // Get stats to determine if path is a directory or a file
            let stat = fs.statSync(dirInner);

            // If path is a directory, scan it and combine results
            if (stat.isDirectory()) {
                results = results.concat(searchRecursive(dirInner, pattern));
            }

            // If path is a file and ends with pattern then push it onto results
            if (stat.isFile() && dirInner.endsWith(pattern)) {
                results.push(dirInner);
            }
        });

        return results;
    };

    return searchRecursive(dir,pattern)
};