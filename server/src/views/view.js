const fs = require("fs")
const ejs = require("ejs");
const path = require("path");

/*
Given a filename.ejs, the script outputs filename.html. Useful for debugging.
Caveats: Objects need to be passed manually.
Example runs on eventReminder.ejs
*/
(async (filename) => {
    const data = await ejs.renderFile(filename, { user: { username: "Shubhankar" }, event: {}, link: "" });
    fs.writeFileSync(path.resolve(__dirname, `./${filename.split(".")[0]}.html`), data);
})("eventReminder.ejs");