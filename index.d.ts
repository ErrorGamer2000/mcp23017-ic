import EventEmitter from "events";

export type MCP23017Options =
  | {
      /**
       * A boolean value specifying whether interrupts should be generated when a pin's value is changed.
       * Requires extra wiring.
       */
      generateInterrupts: true;
      /**
       * Pin to use for reading interrupts on the GPA pins.
       * Should be connected to the INTA pin on the MCP23017.
       */
      pinIntA: number;
      /**
       * Pin to use for reading interrupts on the GPB pins.
       * Should be connected to the INTB pin on the MCP23017.
       */
      pinIntB: number;
    }
  | {
      /**
       * A boolean value specifying whether interrupts should be generated when a pin's value is changed.
       * Requires extra wiring.
       */
      generateInterrupts: true;
      /**
       * Pin to use for reading interrupts.
       * If this option is used, only one pin is required to read interrupts.
       * To use seperate pins for interrupt A and B, use the `pinIntA` and `pinIntB` options.
       */
      pinInt: number;
    }
  | {
      /**
       * A boolean value specifying whether interrupts should be generated when a pin's value is changed.
       * Requires extra wiring.
       */
      generateInterrupts: false;
    };

export interface PinDirConfig {
  a: [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1];
  b: [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1];
}

export class Mcp23017 extends EventEmitter {
  /**
   * Set a pin's direction to IN, or register is as an input.
   */
  static IN = 1;
  /**
   * Set a pin's direction to OUT, or register is as an output.
   */
  static OUT = 0;
  /**
   * The number of the I2C bus/adapter to open, 0 for /dev/i2c-0, 1 for /dev/i2c-1, ...
   * | Make sure to set before opening a Mcp23017 instance.
   * | Bus adresses can be found with the command `sudo i2cdetect -l`, which will list the avaliable busses in the form `i2c-x`, whic x being the bus number.
   */
  static BusNumber: number = 1;
  /**
   * Create a new MCP23017 wrapper
   * @param address The adress of the chip, a number between 0x20 and 0x27 inclusive
   * @param options Wrapper options
   */
  constructor(
    address: 0x20 | 0x21 | 0x22 | 0x23 | 0x24 | 0x25 | 0x26 | 0x27,
    options?: MCP23017Options
  );

  /**
   * Connect to the i2c Bus if needed, and upload pin direction configuration to the microchip
   * Make sure to set `Mcp23017.BusNumber` to the correct value and load a pin direction config before calling.
   */
  async open(): void;

  /**
   * Create a new pin direction configuration object
   */
  static createPinDirConfig(): PinDirConfig;
}
