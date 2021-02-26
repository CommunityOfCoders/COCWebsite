module.exports = getBaseURL = () => {
    if (process.env.NODE_ENV === "production")
        return "https://communityofcoders.in"
    return "http://localhost:3000"
}