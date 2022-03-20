const Company = require("../models/Company");


const createCompany = async (req, res) => {
    try {
        if (!req.body || !req.body.companyName) {
            return res.status(422).json({ error: 'Please provide name of the company' });
        }
        const companyName = req.body.companyName;
        const companyExists = await Company.findOne({ title: companyName });
        if (companyExists) {
            return res.status(400).json({ error: 'Company with given name already exists' });
        }
        const companyDetails = {
            title: companyName,
        }
        const createdCompany = await Company.create(companyDetails);
        return res.status(200).json({ message: 'Created company successfully', company: createdCompany });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        return res.status(200).json({ companies });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getCompanyByName = async (req, res) => {
    try {
        if (!req.query || !req.query.companyName) {
            return res.status(422).json({ error: 'Please provide name of the company' });
        }
        const companyName = req.query.companyName;
        const company = await Company.findOne({ title: companyName });
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