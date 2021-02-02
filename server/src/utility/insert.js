const mongoose = require("mongoose");
const project = require("../models/Project");
const domain = require("../models/Domain");

const genCheckArr = (obj, key, elem) => {
    if (Array.isArray(obj[key])) {
        if (!obj[key].includes(elem)) {
            obj[key].push(elem);
        }
    } else {
        obj[key] = [elem];
    }
}

const insertDomains = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    let projects = await project.find({})
    for (let i = 0; i < projects.length; i++) {
        projects[i].domains = [projects[i].domains]
        await projects[i].save();
    }
    console.log("Done...")
    process.exit(0);
}

const insertProjects = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    let projects = await project.find();
    for (let i = 0; i < projects.length; i++) {
        for (let j = 0; j < projects[i].domains.length; j++) {
            let requiredDomain = await domain.findById(projects[i].domains[j])
            genCheckArr(requiredDomain, "projects", projects[i]._id);
            await requiredDomain.save();
        }
    }
    console.log("Done");
    process.exit(0);
};