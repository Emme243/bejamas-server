class QueryFeatures {
  constructor(model, args) {
    this.query = model;
    this.args = args;
  }

  filter() {
    const { filter } = this.args;
    if (filter) {
      const [filterKey, values] = filter.split(':');
      const filterValues = values.split(',');
      this.query = this.query.find({ [filterKey]: { $in: filterValues } });
    } else this.query = this.query.find();

    return this;
  }

  sort() {
    const { sort } = this.args;
    if (sort) {
      const [sortKey, sortValue] = sort.split(':');
      const isAscending = sortValue === 'asc' || sortValue === undefined ? 1 : -1;
      this.query = this.query.sort({ [sortKey]: isAscending });
    }

    return this;
  }

  pagination() {
    const { limit, page } = this.args;
    if (limit && page) {
      const valuesToSkip = (page - 1) * limit;
      this.query = this.query.skip(valuesToSkip).limit(limit);
    }

    return this;
  }
}

module.exports = { QueryFeatures };
