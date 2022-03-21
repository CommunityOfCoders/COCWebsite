const Interview = require("../models/Interview");
const Company = require("../models/Company");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const submitInterview = async (req, res) => {
    console.log(req.body)
    try {
        const errorMessage = bodyCheck(req.body);
        if (errorMessage) throw new Error(errorMessage);

        const { title, createdBy, companyName, content, appliedFor, appliedYear } = req.body;

        if (appliedFor !== 'Full Time' && appliedFor !== 'Internship') throw new Error('Please provide a valid role');

        // Because the user doesn't know proper names for the compnay
        // const company = await Company.findOne({ title: companyName });
        // if (!company) throw new Error('Company with given name does not exist');
        
        const interviewDetails = {
            title,
            createdBy,
            // company: company._id,
            companyRequest: companyName,
            content,
            isVerified: false,
            status: interviewStatusConstants.submitted,
            appliedFor,
            appliedYear
        };            

        const createdInterview = await Interview.create(interviewDetails);
        return res.status(200).json({ message: 'Submitted experience successfully for verification', interview: createdInterview });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getInterviewByTitle = async (req, res) => {
    try {
        if (!req.query || !req.query.interviewTitle) {
            return res.status(422).json({ error: 'Please provide interview title' });
        }

        const interviewTitle = req.query.interviewTitle;
        const interview = await Interview.findOne({ title: interviewTitle }).populate('company').exec();
        return res.status(200).json({ interview });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const verifyInterview = async (req, res) => {
    try {
        if (!req.body || !req.body.updatedInterviewStatus) {
            return res.status(422).json({ error: 'Please provide new interview status' });
        }

        const newStatus = req.body.updatedInterviewStatus;
        const interviewTitle = req.body.interviewTitle;
        if (newStatus !== 'Accepted' && newStatus !== 'Rejected') throw new Error('Invalid status');

        const updatedInterview = await Interview.findOneAndUpdate({ title: interviewTitle }, { status: newStatus }, { new: true });

        return res.status(200).json({ message: 'Verified interview successfully', interview: updatedInterview });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const bodyCheck = (body) => {
    let errorMessage = `The following keys have error:`;
    const errorVariables = [];
    for (const key in body) {
        if (key === 'content' && body[key].blocks.length === 0) {
            errorVariables.push(key);
        }
        if (key === 'appliedYear' && typeof key === 'number') {
            errorVariables.push(key);
        }
        if (body[key].length === 0) {
            errorVariables.push(key);
        }
    }
    if (errorVariables.length === 0) errorMessage = false;
    for (const variable of errorVariables) {
        let text = ` ${variable},`;
        errorMessage += text;
    }
    return errorMessage;
};

const uploadImage = async (req, res) => {
    try{
        const file = req.file;
        if (file) {
            const image = await cloudinary.v2.uploader.upload(file.path, {
              tags: ["exp"],
              invalidate: true,
            });
            return res.json({
                "success" : 1,
                "file": {
                    "url" : image.secure_url,
                }
            });
        }else{
            return res.status(422).json({ error: 'Image not provided' });
        }
    }catch(error){
        res.json({"error": error.message});
    }
}

const interviewStatusConstants = {
    submitted: 'Submitted',
    accepted: 'Accepted',
    rejected: 'Rejected',
}

module.exports = {
    submitInterview,
    getInterviewByTitle,
    verifyInterview,
    uploadImage,
}