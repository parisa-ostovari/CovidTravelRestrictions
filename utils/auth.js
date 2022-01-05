// make sure that user is logged in if they try to connect to the dashboard directly
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login')
    }
    else {
        next()
    }
};

module.exports = withAuth;