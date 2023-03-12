const crypto = require("crypto");

safeToString = (value) => {
  return typeof value !== "string" ? JSON.stringify(value) : value
}

createHash = (data) => {
  return crypto.createHash("sha3-512").update(safeToString(data)).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if(!event)
    return TRIVIAL_PARTITION_KEY

  const candidate = safeToString(event.partitionKey) || createHash(event)

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(candidate)
  } else {
    return candidate;
  }
};