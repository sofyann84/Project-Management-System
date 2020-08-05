//Midleware Configuration

const check = {
    isLoggedIn: (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/')
        }
    }
  }
  
  module.exports = check;