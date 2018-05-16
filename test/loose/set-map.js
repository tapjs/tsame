'use strict'
var tsame = require('../..')
var t = require('tap')

t.test('set', function (t) {
  var obj = { a: 1 }
  var a = new Set([1, 2, 3, 4, obj])
  var b = new Set([obj, 2, 4, 3, 1])
  var c = new Set([4, 3, 2, 1, { a: 1 }])
  t.ok(tsame(a, b))
  t.ok(tsame(a, c))
  t.ok(tsame(b, c))
  t.notOk(tsame(new Set([1]), new Set([1,2])))
  t.notOk(tsame(new Set([1, 3, 5]), new Set([1, 6, 2])))
  t.ok(tsame(new Set(), new Set()))
  t.notOk(tsame(a, Array.from(a)))
  t.end()
})

t.test('map', function (t) {
  var obj = { a: 1 }
  var a = new Map([[1, 2], [3, 4], [5, obj], [ obj, 6 ]])
  var b = new Map([[3, 4], [5, obj], [ obj, 6 ], [1, 2]])
  // values match, but not strictly
  var c = new Map([[3, 4], [5, { a: '1' }], [ obj, 6 ], [1, 2]])
  // keys don't match
  var d = new Map([[3, 4], [5, { a: 1 }], [ { a: 1 }, 6 ], [1, 2]])
  t.ok(tsame(a, b))
  t.ok(tsame(a, c))
  t.ok(tsame(b, c))
  t.ok(tsame(new Map(), new Map()))
  t.notOk(tsame(a, Array.from(a)))
  t.notOk(tsame(a, d))
  t.notOk(tsame(a, d))
  t.end()
})
