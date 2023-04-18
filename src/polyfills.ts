// Yjs uses the globalThis.crypto.getRandomValues function to generate random numbers.
// this isn't available in plv8, so we need to provide a polyfill.
// TODO: should be cryptographically secure random numbers
globalThis.crypto = {
  getRandomValues: <T extends ArrayBufferView | null>(arr: T) => {
    // TODO: fix types - this is a hack
    if (arr === null) {
      throw new TypeError("Failed to execute 'getRandomValues' on 'Crypto': The provided value is null");
    }
    for (let i = 0; i < (arr as Uint8Array).length; i++) {
      (arr as Uint8Array)[i] = Math.floor(Math.random() * 256);
    }
    return arr;
  },
  subtle: null as any,
  randomUUID: null as any,
}
