function accessMiddleware(request, response, next) {
    if (request.session.passport && request.session.passport.user) {
        next();
    } else {
        response.redirect('/signin');
    }
}
module.exports = accessMiddleware;
