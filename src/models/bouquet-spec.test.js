const expect = require('chai').expect

const flowerStore = require('../stores/flower-store')
const BouquetSpec = require('./bouquet-spec')
const Flower = require('./flower')

describe('Bouquet specs', () => {
  let newBouquetSpec
  const flowerObj = { m: 10, s: 5 }

  before(() => {
    for (let i=1; i <=10; i++) {
      flowerStore.addToStock(new Flower('m', 'L'))
    }
  })

  beforeEach(() => {
    newBouquetSpec = new BouquetSpec('A', 'L', flowerObj)
  })

  it('should create bouquet spec model with given data', done => {
    expect(newBouquetSpec).to.exist
    expect(newBouquetSpec.name).to.equal('A')
    expect(newBouquetSpec.size).to.equal('L')
    expect(newBouquetSpec.flowers).to.deep.equal(flowerObj)
    done()
  })

  it('should return false if not enough flower in the store', done => {
    expect(newBouquetSpec.isReadyToBuild(flowerStore.flowers)).to.be.false
    done()
  })

  it('should return true if there is enough flower to build bouquet', done => {
    for (let i=1; i<=7; i++)
      flowerStore.addToStock(new Flower('s', 'L'))

    expect(newBouquetSpec.isReadyToBuild(flowerStore.flowers)).to.be.true
    done()
  })

  it('should build bouquet', () => {
    expect(flowerStore.stock).to.equal(17)

    newBouquetSpec.buildBouquet(flowerStore)
    expect(flowerStore.stock).to.equal(2)
    expect(newBouquetSpec.freshFlowers.length).to.equal(15)
    expect(newBouquetSpec.freshFlowers.filter(x => x.name === 'm').length).to.equal(10)
    expect(newBouquetSpec.freshFlowers.filter(x => x.name === 's').length).to.equal(5)
  })

  after(() => {
    flowerStore.reset()
  })
})