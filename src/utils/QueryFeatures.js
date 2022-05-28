class QueryFeatures {
  constructor(model, args) {
    this.query = model;
    this.args = args;
  }

  filter() {
    const { filter } = this.args;
    if (filter) {
      const { key, values } = filter;
      this.query = this.query.find({ [key]: { $in: values } });
    } else this.query = this.query.find();

    return this;
  }

  sort() {
    const { sort } = this.args;
    if (sort) {
      const { key, orderBy } = sort;
      this.query = this.query.sort({ [key]: orderBy });
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
