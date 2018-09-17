const BouquetSpec = require('./models/bouquet-spec')
const Flower = require('./models/flower')

/**
 * Reduce string to flowers object.
 * @param {string} bouquetSpec Line with bouquet name and flowers
 */
const flowerNamesToObject = (bouquetSpec)=>{
  let decimalCounter = 1
  let flowerCursor = ''

  // First two char is about bouquet, so remove them.
  return bouquetSpec.split('').splice(2).reverse().reduce((prev, currentChar) => {
    if (isNaN(currentChar)) {
      decimalCounter = 1 // Reset counter
      flowerCursor = currentChar
      prev[flowerCursor] = 0
      return prev
    }
   
    prev[flowerCursor] += (decimalCounter * parseInt(currentChar))
    decimalCounter *= 10
    return prev

  }, {})
}

/**
 * Validate and parse bouquet spec.
 * @param {string} line
 * @return {?BouquetSpec} new BouquetSpec or null if line is invalid
 */
exports.parseBouquetSpecLine = function(line) {
  // @TODO complete this
  if (!line || line.length < 4) return null
  const bouquetName = line[0]
  const bouquetSize = line[1]

  // Example { c: 10, b:5, a: 15}
  const flowersObj = flowerNamesToObject(line)
  return new BouquetSpec(bouquetName, bouquetSize, flowersObj, line)
}

/**
 * Validate and parse flower.
 * @param {string} line
 * @return {?Flower} new Flower or null if line is invalid
 */
exports.parseFlowerLine = function(line) {
  if (!line || line.length < 2) return null
  return new Flower(line[0], line[1])
}

// Export for test;
if (process.env.NODE_ENV === 'test')
  exports.flowerNamesToObject = flowerNamesToObject