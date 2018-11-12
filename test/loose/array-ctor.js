'use strict'

const RealArray = Array
const Arry = class Array extends RealArray {}
const Ayyr = class ArrayLike extends RealArray {
  someMethod () { return 5 }
}
const t = require('tap')
var d = require('../..')

t.test('array-likes match if they are called "Array"', t => {
  const a = new Arry()
  a.push(1, 2, 3)
  const b = [1, 2, 3]
  t.ok(d(a, b))
  t.notEqual(a.constructor, b.constructor)
  const c = new Ayyr()
  c.push(1, 2, 3)
  t.ok(d(c, a), 'array-likes are same when loose')
  t.end()
})
