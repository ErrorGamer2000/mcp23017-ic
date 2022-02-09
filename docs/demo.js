class PromisifiedBus {
  __registeredChips = {};
  __registerChip(addr, writeByte, readByte) {
    if (this.__registerChip[addr]) {
      throw new Error(`Chip with address }`);
    }
  }
}
class i2c {
  async openPromisified() {
    return new PromisifiedBus(0);
  }
}
