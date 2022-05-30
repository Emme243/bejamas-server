class QueryFeatures {
  constructor(model, args) {
    this.query = model;
    this.args = args;
  }

  filter() {
    const { filter } = this.args;
    let filterQuery = {};
    if (filter) {
      filterQuery = filter.reduce((previous, filterInput) => {
        const { type, key, values } = filterInput;
        if (type === 'IN') previous[key] = { $in: values };
        if (type === 'RANGE') previous[key] = { $gte: values[0], $lte: values[1] };
        return previous;
      }, {});
    }
    this.query = this.query.find(filterQuery);

    return this;
  }

  sort() {
    const { sort } = this.args;
    if (sort) {
      const { by, type } = sort;
      this.query = this.query.sort({ [by]: type });
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
