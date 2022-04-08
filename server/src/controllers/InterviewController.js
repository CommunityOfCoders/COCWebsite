const Interview = require("../models/Interview");
const Company = require("../models/Company");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const submitInterview = async (req, res) => {
    try {
        const errorMessage = bodyCheck(req.body);
        if (errorMessage) throw new Error(errorMessage);

        const { draftID, title, createdBy, companyName, content, appliedFor, appliedYear, userId } = req.body;
        
        if (appliedFor !== 'Full Time' && appliedFor !== 'Internship') throw new Error('Please provide a valid role');

        const interviewDetails = {
            title,
            createdBy,
            userId,
            companyRequest: companyName,
            content,
            isDraft: false,
            status: interviewStatusConstants.submitted,
            appliedFor,
            appliedYear
        };            

        let createdInterview;
        if(draftID === "_"){
            createdInterview = await Interview.create(interviewDetails);
        }else{
            oldInterview = await Interview.findOne({_id: draftID});
            if (oldInterview.userId != req.userID) throw new Error("You don't have write access on this")
            createdInterview = await Interview.findOneAndUpdate({_id: draftID}, interviewDetails);
        }

        return res.status(200).json({ message: 'Submitted experience successfully for verification', interview: createdInterview });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const saveDraftInterview = async (req, res) => {
    try {
        const errorMessage = bodyCheck(req.body);
        if (errorMessage) throw new Error(errorMessage);
        const { draftID, title, createdBy, companyName, content, appliedFor, appliedYear, userId } = req.body;

        if (appliedFor !== 'Full Time' && appliedFor !== 'Internship') throw new Error('Please provide a valid role');

        const interviewDetails = {
            title,
            createdBy,
            userId,
            companyRequest: companyName,
            content,
            isDraft: true,
            status: interviewStatusConstants.submitted,
            appliedFor,
            appliedYear
        };            
        let draftInterview;
        if(draftID === "_"){
            draftInterview = await Interview.create(interviewDetails);
        }else{
            oldInterview = await Interview.findOne({_id: draftID});
            if (oldInterview.userId != req.userID) throw new Error("You don't have write access on this")
            draftInterview = await Interview.findOneAndUpdate({_id: draftID}, interviewDetails);
        }

        return res.status(200).json({ message: 'Saved Draft', interview: draftInterview });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


const getInterviewByUserID = async (req, res) => {
    try {
        const userID = req.params.id;
        const interview = await Interview.find({ userId: userID });
        return res.status(200).json(interview);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getInterviewByCompanyID = async (req, res) => {
    try{
        const companyID = req.params.id;
        const interviewList = await Interview.find({ company: companyID, isVerified: true });
        const company = await Company.findOne({ _id: companyID });
        return res.status(200).json({interviewList, company});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getInterviewByID = async (req, res) => {
    try {
        const interviewID = req.params.id;
        const interview = await Interview.findOne({ _id: interviewID });
        return res.status(200).json(interview);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getUnverifiedInterview = async (req, res, next) => {
    try{
        const unverifiedList = await Interview.find({ isVerified: false, isDraft: false });
        res.locals.cache = unverifiedList;
        next();
        return res.status(200).json({ unverifiedList });
    } catch (error){
        return res.status(400).json({ error: error.message });
    }
}

const verifyInterview = async (req, res) => {
    try {
        if (!req.body || !req.body.interviewID || !req.body.companyID) {
            return res.status(422).json({ error: 'Please provide all details' });
        }
        const {interviewID, companyID} = req.body;
        const updatedInterview = await Interview.findOneAndUpdate({ _id: interviewID }, { isVerified: true, company: companyID }, { new: true });

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
    saveDraftInterview,
    getInterviewByUserID,
    getInterviewByCompanyID,
    getInterviewByID,
    getUnverifiedInterview,
    verifyInterview,
    uploadImage,
}