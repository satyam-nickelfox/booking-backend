let JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const model = require("../models/user.model");
const config = require("./jwtConfig");

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
  opts.secretOrKey = config.secret;

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      //    console.log("auth-----",jwt_playload);
      model
        .findOne({ id: jwt_payload.id })
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((err) => {
          done(err, false);
        });
    })
  );
};
