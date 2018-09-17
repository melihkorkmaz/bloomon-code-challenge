/**
 * Store bouquet specs.
 */

const bouquetSpecs = []

/**
 * Add a bouquet spec if it doesn't exist.
 * @param {Object} bouquetSpec
 */
exports.add = function(bouquetSpec) {
  // @TODO complete this
  bouquetSpecs.push(bouquetSpec)
  return bouquetSpecs
}

exports.specs = bouquetSpecs