/**
 * Bouquet spec.
 * @class
 */
class BouquetSpec {
  /**
   * Default constructor.
   * @param {string} name
   * @param {string} size
   * @param {Object} flowers Map of flower name to quantity.
   */
  constructor(name, size, flowers, fullName) {
    this.name = name
    this.size = size
    this.flowers = flowers
    this.freshFlowers = []
    this.fullName = fullName
  }

  isReadyToBuild(flowersInTheStore) {
    
    return Object.keys(this.flowers).every(name => {
      const numberOfFlowerNeeded = this.flowers[name]
      const size = this.size

      return (flowersInTheStore[name]
        && flowersInTheStore[name][size]
        && flowersInTheStore[name][size].length >= numberOfFlowerNeeded)
    })
  }

  buildBouquet(flowerStore) {
    Object.keys(this.flowers).forEach(flowerName => {
      const quantity = this.flowers[flowerName]
      const flowersObjFromStore = flowerStore.getFromStock(quantity, flowerName, this.size)
      this.freshFlowers = [...this.freshFlowers, ...flowersObjFromStore]
    })
  }
}

module.exports = BouquetSpec
