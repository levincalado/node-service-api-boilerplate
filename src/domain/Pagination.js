const { attributes } = require('structure');

const Pagination = attributes({
  search: {
    type: String,
    nullable: true,
  },
  page: {
    type: Number,
    nullable: true,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    nullable: true,
    default: 12,
  },
})(
  class Pagination {
    // Add validation functions below
    // e.g.:
    //
    // isLegal() {
    //   return this.age >= User.MIN_LEGAL_AGE;
    // }
  },
);

module.exports = Pagination;
