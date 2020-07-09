const { attributes } = require('structure');

const User = attributes({
  id: Number,
  name: {
    type: String,
    required: true,
    empty: false,
  },
  createdAt: Date,
  updatedAt: Date,
})(class User {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;

module.exports = User;
