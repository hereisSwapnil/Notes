exports.isLoggedIn = function (req, res, next) {
    if (req.user) {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        return res.redirect('/'); // User is not authenticated, redirect to the home page
    }
};
