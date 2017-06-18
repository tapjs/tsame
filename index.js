'use strict'

module.exports = shallow
shallow.strict = strict

function isArguments (object) {
  return Object.prototype.toString.call(object) === '[object Arguments]'
}

function strict (a, b) {
  return deeper(a, b, [], [])
}

function deeper (a, b, ca, cb) {
  if (a === b) {
    return true
  } else if (typeof a !== 'object' || typeof b !== 'object') {
    return false
  } else if (a === null || b === null) {
    return false
  } else if (Buffer.isBuffer(a) && Buffer.isBuffer(b)) {
    if (a.equals) {
      return a.equals(b)
    } else {
      if (a.length !== b.length) return false

      for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false

      return true
    }
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  } else if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source &&
    a.global === b.global &&
    a.multiline === b.multiline &&
    a.lastIndex === b.lastIndex &&
    a.ignoreCase === b.ignoreCase
  } else if (isArguments(a) || isArguments(b)) {
    if (!(isArguments(a) && isArguments(b))) return false

    var slice = Array.prototype.slice
    return deeper(slice.call(a), slice.call(b), ca, cb)
  } else {
    if (a.constructor !== b.constructor) return false

    var ka = Object.keys(a)
    var kb = Object.keys(b)
    // don't bother with stack acrobatics if there's nothing there
    if (ka.length === 0 && kb.length === 0) return true
    if (ka.length !== kb.length) return false

    var cal = ca.length
    while (cal--) if (ca[cal] === a) return cb[cal] === b
    ca.push(a); cb.push(b)

    ka.sort(); kb.sort()
    for (var j = ka.length - 1; j >= 0; j--) if (ka[j] !== kb[j]) return false

    var key
    for (var k = ka.length - 1; k >= 0; k--) {
      key = ka[k]
      if (!deeper(a[key], b[key], ca, cb)) return false
    }

    ca.pop(); cb.pop()

    return true
  }
}

function shallow (a, b) {
  return shallower(a, b, [], [])
}

function shallower (a, b, ca, cb) {
  if (typeof a !== 'object' && typeof b !== 'object' && a == b) {
    return true
  } else if (a === null || b === null) {
    return a == b
  } else if (typeof a !== 'object' || typeof b !== 'object') {
    return false
  } else if (Buffer.isBuffer(a) && Buffer.isBuffer(b)) {
    if (a.equals) {
      return a.equals(b)
    } else {
      if (a.length !== b.length) return false

      for (var j = 0; j < a.length; j++) if (a[j] != b[j]) return false

      return true
    }
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  } else if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source &&
    a.global === b.global &&
    a.multiline === b.multiline &&
    a.lastIndex === b.lastIndex &&
    a.ignoreCase === b.ignoreCase
  } else if (isArguments(a) || isArguments(b)) {
    var slice = Array.prototype.slice
    return shallower(slice.call(a), slice.call(b), ca, cb)
  } else {
    var ka = Object.keys(a)
    var kb = Object.keys(b)
    // don't bother with stack acrobatics if there's nothing there
    if (ka.length === 0 && kb.length === 0) return true
    if (ka.length !== kb.length) return false

    var cal = ca.length
    while (cal--) if (ca[cal] === a) return cb[cal] === b
    ca.push(a); cb.push(b)

    ka.sort(); kb.sort()
    for (var k = ka.length - 1; k >= 0; k--) if (ka[k] !== kb[k]) return false

    var key
    for (var l = ka.length - 1; l >= 0; l--) {
      key = ka[l]
      if (!shallower(a[key], b[key], ca, cb)) return false
    }

    ca.pop(); cb.pop()

    return true
  }
}
