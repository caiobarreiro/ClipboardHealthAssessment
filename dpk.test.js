const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns hashed event if input doesn't contain partitionKey", () => {
    const input = {
      someOtherProperty: "someValue"
    }

    const trivialKey = deterministicPartitionKey(input);

    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(JSON.stringify(input)).digest("hex"));
  });

  it("Returns partitionKey (less than max length) sent on input", () => {
    const resultPartitionKey = "426755f21baae75fb141b047cd3ae11bc820076a2ce839d269ba3317f10a64d75c3decc1fda9fae302133c2dc8f10afb966948260dfbb6a289658372b619954b"
   
    const input = {
      partitionKey: resultPartitionKey
    }

    const trivialKey = deterministicPartitionKey(input);

    expect(trivialKey).toBe(resultPartitionKey);
  });

  it("Returns stringfied partitionKey (less than max length and not a string) sent on input", () => {
    const resultPartitionKey = "1234"
   
    const input = {
      partitionKey: 1234
    }

    const trivialKey = deterministicPartitionKey(input);

    expect(trivialKey).toBe(resultPartitionKey);
  });

  it("Returns hashed partitionKey (greater than max length) sent on input", () => {
    const resultPartitionKey = "1426755f21baae75fb141b047cd3ae11bc820076a2ce839d269ba3317f10a64d75c3decc1fda9fae302133c2dc8f10afb966948260dfbb6a289658372b619954b426755f21baae75fb141b047cd3ae11bc820076a2ce839d269ba3317f10a64d75c3decc1fda9fae302133c2dc8f10afb966948260dfbb6a289658372b619954b"
   
    const input = {
      partitionKey: resultPartitionKey
    }
    
    const trivialKey = deterministicPartitionKey(input);

    expect(trivialKey).toBe(crypto.createHash("sha3-512").update(resultPartitionKey).digest("hex"));
  });
});
