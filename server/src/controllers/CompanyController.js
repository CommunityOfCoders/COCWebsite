const Company = require("../models/Company");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const createCompany = async (req, res) => {
    try {
        if (!req.body || !req.body.companyName || !req.file) {
            return res.status(422).json({ error: 'Please provide name of the company and image' });
        }
        
        const companyName = req.body.companyName;
        const companyExists = await Company.findOne({ title: companyName });
        if (companyExists) {
            return res.status(400).json({ error: 'Company with given name already exists' });
        }
        const file = req.file;
        const companyDetails = {
            title: companyName,
        }
        let createdCompany = await Company.create(companyDetails);
        if (file) {
            const image = await cloudinary.v2.uploader.upload(file.path, {
                public_id: createdCompany._id,
                tags: ["companyLogo"],
                invalidate: true,
            });
            createdCompany = await Company.findByIdAndUpdate(
                createdCompany._id,
                { image: { url: image.secure_url, public_id: image.public_id } },
                { new: true }
            ).select({ "_id": 1, "title": 1}).lean();
        }
        
        return res.status(200).json({ message: 'Created company successfully', company: createdCompany });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find();
        // res.locals.cache = companies;
        // next();
        return res.status(200).json({ companies });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getCompanyByName = async (req, res, next) => {
    try {
        if (!req.params || !req.params.companyName) {
            return res.status(422).json({ error: 'Please provide name of the company' });
        }
        const companyName = req.query.companyName;
        const company = await Company.findOne({ title: companyName });
        res.locals.cache = company;
        next();
        return res.status(200).json({ company });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updateCompanyById = async (req, res) => {
    try {
        if (!req.query || !req.query.companyId) {
            return res.status(422).json({ error: 'Please provide companyId' });
        }
        if (req.body && bodyCheck(req.body)) {
            const companyId = req.query.companyId;
            const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body, { new: true });
            return res.status(200).json({ message: 'Updated Company Successfully', company: updatedCompany });
        }
        throw new Error('Please provide valid data');
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteCompanyById = async (req, res) => {
    try {
        if (!req.query || !req.query.companyId) {
            return res.status(422).json({ error: 'Please provide companyId' });
        }
        const companyId = req.query.companyId;

        const companyExists = await Company.findById(companyId);
        if (!companyExists) {
            return res.status(400).json({ error: 'Company with given id does not exist' });
        }

        const deletedCompany = await Company.findByIdAndDelete(companyId);
        return res.status(200).json({ message: 'Deleted Company Successfully', company: deletedCompany });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const bodyCheck = (body) => {
    if (!body.title) return false;
    return true;
};  

module.exports = {
    createCompany,
    getCompanies,
    getCompanyByName,
    updateCompanyById,
    deleteCompanyById,
}