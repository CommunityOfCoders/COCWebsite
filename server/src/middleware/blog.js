module.exports = {
    isBlogAuthorized = () => (req, res, next) => {
        if (req.user.isBlogAuthorized) return next();
        // req.flash('error_msgs', 'Please log in to access this page');
        res.redirect('/');
    }
};
