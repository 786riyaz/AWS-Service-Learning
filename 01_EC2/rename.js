const fs = require("fs");
const path = require("path");

/**
 * Replace spaces with underscores
 */
function renameItem(name) {
    return name.replace(/\s+/g, "_");
}

/**
 * Recursively rename files and folders
 */
function renameRecursive(dirPath) {
    const items = fs.readdirSync(dirPath);

    // First process all children
    for (const item of items) {
        const oldPath = path.join(dirPath, item);
        const stats = fs.statSync(oldPath);

        if (stats.isDirectory()) {
            renameRecursive(oldPath);
        }
    }

    // Read again because folder names inside may have changed
    const updatedItems = fs.readdirSync(dirPath);

    for (const item of updatedItems) {
        const oldPath = path.join(dirPath, item);
        const newName = renameItem(item);

        if (item !== newName) {
            const newPath = path.join(dirPath, newName);

            try {
                fs.renameSync(oldPath, newPath);
                console.log(`Renamed: ${oldPath}`);
                console.log(`      -> ${newPath}\n`);
            } catch (err) {
                console.error(`Failed to rename: ${oldPath}`);
                console.error(err.message);
            }
        }
    }
}

// ===============================
// Change this to your root folder
// ===============================
// const ROOT_FOLDER = "C:/Users/Riyaz/Documents/MyProject";
const ROOT_FOLDER = "E:/Git/Amazon_Web_Service_Learning";

renameRecursive(ROOT_FOLDER);

console.log("Done!");