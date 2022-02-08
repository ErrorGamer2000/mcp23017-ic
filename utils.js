const clone = require("just-clone"),
  range = require("just-range");
function isOne(val, set) {
  return set.includes(val);
}
function invariant(cond, err = new Error("Assertion Failed!")) {
  if (!cond) throw err;
}
const REGISTERS = {
  IODIRA: 0x00,
  IODIRB: 0x01,
  IPOLA: 0x02,
  IPOLB: 0x03,
  GPINTENA: 0x04,
  GPINTENB: 0x05,
  DEFVALA: 0x06,
  DEFVALB: 0x07,
  INTCONA: 0x08,
  INTCONB: 0x09,
  IOCON: 0x0a,
  //IOCON: 0x0b,
  GPPUA: 0x0c,
  GPPUB: 0x0d,
  INTFA: 0x0e,
  INTFB: 0x0f,
  INTCAPA: 0x10,
  INTCAPB: 0x11,
  GPIOA: 0x12,
  GPIOB: 0x13,
  OLATA: 0x14,
  OLATB: 0x15
};
let private = new WeakMap();
function setProp(thisarg, n, v) {
  let p = private.get(thisarg) || Object.create(null);
  p[n] = v;
  if (!private.has(thisarg)) {
    private.set(thisarg, p);
  }

  return v;
}
function getProp(thisarg, n) {
  let p = private.get(thisarg) || Object.create(null);

  return p[n];
}
function toBinaryArray(byte) {
  return ("0".repeat(8 - (byte = byte.toString(2)).length) + byte)
    .split("")
    .reverse()
    .map(Number);
}

module.exports = {
  clone,
  range,
  isOne,
  invariant,
  REGISTERS,
  getProp,
  setProp,
  toBinaryArray
};
