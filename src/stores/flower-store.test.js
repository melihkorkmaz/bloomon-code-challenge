const expect = require('chai').expect

const Flower = require('../models/flower')
const flowerStore = require('./flower-store')

describe('Flower store', () => {
  it('should add flower to stock', () => {
    expect(flowerStore.stock).to.equal(0)

    flowerStore.addToStock(new Flower('a', 'L'))
    flowerStore.addToStock(new Flower('b', 'S'))
    flowerStore.addToStock(new Flower('b', 'S'))
    flowerStore.addToStock(new Flower('b', 'S'))
        
    expect(flowerStore.stock).to.equal(4)

    // Test flower A
    expect(flowerStore.flowers.a).to.not.undefined
    expect(flowerStore.flowers.a.L).to.not.undefined
    expect(flowerStore.flowers.a.L.length).to.equal(1)

    // Test flower B
    expect(flowerStore.flowers.b).to.not.undefined
    expect(flowerStore.flowers.b.S).to.not.undefined
    expect(flowerStore.flowers.b.S.length).to.equal(3)
  })

  it('should remove request flowers from store', () => {
    expect(flowerStore.stock).to.equal(4)
        
    // Get 2 bS from store
    const flowers = flowerStore.getFromStock(2, 'b', 'S')

    expect(flowerStore.stock).to.equal(2) // Check latest stock size
    expect(flowers.length).to.equal(2)
    expect(flowers.every(x => (x.name === 'b' && x.size === 'S'))).to.be.true
  })

  it('should reset stock', () => {
    expect(flowerStore.stock).to.equal(2)
    flowerStore.reset()
    expect(flowerStore.stock).to.equal(0)
    expect(flowerStore.flowers).to.deep.equal({})
  })
})