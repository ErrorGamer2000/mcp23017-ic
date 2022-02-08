//TODO Remove all jsdoc - they are for development only

/**
 * @typedef {import("./index").MCP23017Options} MCP23017Options
 * @typedef {import("./index").PinDirConfig} PinDirConfig
 */

const {
  range,
  clone,
  isOne,
  invariant,
  REGISTERS: cmd,
  getProp,
  setProp,
  toBinaryArray
} = require("./utils.js");
const EventEmitter = require("events");
const i2c = require("i2c-bus");

/**
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  if (ms <= 0) {
    return Promise.resolve();
  }
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
}

/** @type {i2c.PromisifiedBus} */
let bus = null;

class Mcp23017 extends EventEmitter {
  static BusNumber = 1;
  /**
   *
   * @param {0x20 | 0x21 | 0x22 | 0x23 | 0x24 | 0x25 | 0x26 | 0x27} address
   * @param {MCP23017Options} options
   */
  constructor(address, options = { generateInterrupts: false }) {
    super();
    invariant(
      typeof address === "number",
      new TypeError(
        `Expected address to be of type number, not type ${typeof address}.`
      )
    );
    invariant(
      isOne(address, [0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27]),
      new Error(
        `Invalid chip address: got 0x${address.toString(
          16
        )}, expected 0x20 - 0x27.`
      )
    );
    setProp(this, "address", address);
    setProp(this, "pinDir", [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    setProp(this, "pinValues", [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    setProp(this, "loadedConfig", false);
    setProp(this, "interrupts", !!options.generateInterrupts);

    if (!!options.generateInterrupts) {
      invariant(
        options.pinInt || (options.pinIntA && options.pinIntB),
        new Error("Must specify interrupt pins to generate interrupts.")
      );
    }
  }

  async open() {
    if (!bus) {
      bus = await i2c.openPromisified(Mcp23017.BusNumber);
    }
    /** @type {number} */
    const address = getProp(this, "address");
    /** @type {number[][]} */
    const pinDir = getProp(this, "pinDir");
    const toNum = (v) => parseInt(clone(v).reverse().join(""), 2);

    let rowA = toNum(pinDir[0]);
    let rowB = toNum(pinDir[1]);

    await bus.writeByte(address, cmd.IODIRA, rowA);
    await bus.writeByte(address, cmd.IODIRB, rowB);
  }

  /**
   *
   * @returns {PinDirConfig}
   */
  static createPinDirConfig() {
    return {
      a: [0, 0, 0, 0, 0, 0, 0, 0],
      b: [0, 0, 0, 0, 0, 0, 0, 0]
    };
  }
}
