/**
 * Simulate the flower storage facility.
 */

// Maximum capacity of the storage facility.
const DEFAULT_MAX_FLOWERS = 256

/**
 * Flower store class to hold and manage store state
 */
function FlowerStore() {
  /**
   * Sample flowers object. To reach an object key is faster than to find any item from an array.
   * { "a" : { "L" : [], "S" : []},  b : { "L" : [] } }
   */
  let flowers = {}
  let stock = 0

  this.addToStock = (flower) => {
    if (stock >= DEFAULT_MAX_FLOWERS) {
      console.error(`This facility can not have more than ${DEFAULT_MAX_FLOWERS} flowers at a time.`)
      process.exit(1)
      return
    }
  
    const { name, size } = flower
  
    if (!flowers[name])
      flowers[name] = {}
  
    if (!flowers[name][size])
      flowers[name][size] = []
  
    flowers[name][size].push(flower)

    stock++
  }

  this.getFromStock = (quantity, name, size) => {
    const targetFlowers = flowers[name][size]
    stock -= quantity

    // Mutate the store.
    return targetFlowers.splice(targetFlowers.length - quantity, quantity)
  }

  this.reset = () => {
    flowers = {}
    stock = 0
  }

  Object.defineProperty(this, 'stock', { get : () => stock })
  Object.defineProperty(this, 'flowers', { get : () => flowers })
}
module.exports = new FlowerStore()