const expect = require('chai').expect

const BouquetSpec = require('./models/bouquet-spec')
const Flower = require('./models/flower')
const parser = require('./parser')

describe('parser', () => {
  describe('#parseBouquetSpecLine', () => {
    it('does not throw error', () => {
      expect(parser.parseBouquetSpecLine).to.not.throw()
    })

    it('parses line and returns correct bouquet spec', () => {
      const bouquetSpecLine = 'BL15b1c'
      const bouquetSpec = parser.parseBouquetSpecLine(bouquetSpecLine)
      expect(bouquetSpec).to.deep.equal(
        new BouquetSpec('B', 'L', { b: 15, c: 1 }, bouquetSpecLine)
      )
    })
  })

  describe('#parseFlowerLine', () => {
    it('does not throw error', () => {
      expect(parser.parseFlowerLine).to.not.throw()
    })

    it('parses line and returns correct flower', () => {
      const flowerLine = 'cS'
      const flower = parser.parseFlowerLine(flowerLine)
      expect(flower).to.deep.equal(new Flower('c', 'S'))
    })
  })

  describe('#flowerNamesToObject', () => {
    it('should return object with quantities', () => {
      const bouquetSpec = 'AL10s4c2b'
      const result = parser.flowerNamesToObject(bouquetSpec)
      expect(result.b).to.not.undefined
      expect(result.b).to.equal(2)

      expect(result.c).to.not.undefined
      expect(result.c).to.equal(4)

      expect(result.s).to.not.undefined
      expect(result.s).to.equal(10)
    })
  })
})
