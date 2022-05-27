class QueryFeatures {
  constructor(model, args) {
    this.model = model;
    this.args = args;
  }

  filter() {
    const { filter } = this.args;
    if (filter) {
      const [filterKey, values] = filter.split(':');
      const filterValues = values.split(',');
      this.model = this.model.find({ [filterKey]: { $in: filterValues } });
    } else this.model = this.model.find();

    return this;
  }

  sort() {
    const { sort } = this.args;
    if (sort) {
      const [sortKey, sortValue] = sort.split(':');
      const isAscending = sortValue === 'asc' || sortValue === undefined ? 1 : -1;
      this.model = this.model.sort({ [sortKey]: isAscending });
    }

    return this;
  }

  pagination() {
    const { limit, page } = this.args;
    if (limit && page) {
      const valuesToSkip = (page - 1) * limit;
      this.model = this.model.skip(valuesToSkip).limit(limit);
    }

    return this;
  }
}

module.exports = { QueryFeatures };
