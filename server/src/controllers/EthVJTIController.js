const EthUser = require("../models/EthVJTIWallet");
const sendEmail = require("../utility/sendEmail");

const generateOTP = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

const sendMailToSingerUser = async (otp, email) => {
    const mailSubject = "EthVJTI Launch NFT One Time Password";
    const mailData = `Your OTP for EthVJTI Launch NFT is: ${otp}`;
    await sendEmail(email, mailSubject, mailData);
};

const sendOTP = async (req, res) => {
    try {
        const { email, walletAddress } = req.body;
        const newOTP = generateOTP();

        sendMailToSingerUser(newOTP, email);

        const userDetails = {
            email,
            walletAddress,
            isMinted: false,
            emailVerificationOTP: newOTP,
        };

        const userCheck = await EthUser.findOne({
            email: email,
          })
            .lean();

        let newUser;
        if(userCheck){
            if(userCheck.isMinted){
                return res.status(400).json({ error: "NFT is already minted for this user" });
            }
            newUser = await EthUser.findByIdAndUpdate(
                userCheck._id,
                userDetails,
                {new: true}
            );
        }else{
            res.status(404).json({error: "Email ID was not registered"});
        }

        return res
            .status(200)
            .json({
                message: `OTP Sent to ${email}`,
                user: newUser,
            });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const userCheck = await EthUser.findOne({
            email: email,
          })
            .lean();
        if(userCheck && userCheck.emailVerificationOTP == otp){
            await EthUser.findByIdAndUpdate(userCheck._id, {isMinted: true, emailVerificationOTP: ""});
            return res.status(200).json({ message: "OTP Correct", email: email });
        }
        return res.status(400).json({ error: "OTP not valid" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    sendOTP,
    verifyOTP
}