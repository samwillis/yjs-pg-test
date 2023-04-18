import "./polyfills";
import * as Y from "yjs";

globalThis.yjs = Y;

/**
 * Create a new Y.Doc and return its initial state as an update.
 * @returns The initial state of the new Y.Doc as an update.
 */
export function new_doc() {
  console.log("y_new_doc");
  const doc = new Y.Doc();
  return Y.encodeStateAsUpdate(doc);
}

/**
 * Apply a document update on the document.
 * Note that this feature only merges document updates and doesn't garbage-collect
 * deleted content.
 * Use y_apply_update_gc to apply an update and garbage-collect deleted content.
 * @param bytes
 * @param update
 * @returns he new state of the document as an update.
 */
export function apply_update(bytes: Uint8Array, update: Uint8Array): Uint8Array {
  console.log("y_apply_update");
  return Y.mergeUpdates([bytes, update]);
}

/**
 * Apply a document update on the document and garbage-collect deleted content.
 * @param bytes
 * @param update
 * @returns The new state of the document as an update.
 */
export function apply_update_gc(bytes: Uint8Array, update: Uint8Array): Uint8Array {
  console.log("y_apply_update_gc");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, bytes);
  Y.applyUpdate(doc, update);
  return Y.encodeStateAsUpdate(doc);
}

/**
 * Merge several document updates into a single document update while removing
 * duplicate information.
 * Note that this feature only merges document updates and doesn't garbage-collect
 * deleted content.
 * @param updates
 * @returns The merged update.
 */
export function merge_updates(updates: Uint8Array[]): Uint8Array {
  console.log("y_merge_updates");
  return Y.mergeUpdates(updates);
}

/**
 * Encode the missing differences to another document as a single update message
 * that can be applied on the remote document. Specify a target state vector.
 * @param bytes
 * @param stateVector
 * @returns The new state of the document as an update.
 */
export function diff_update(bytes: Uint8Array, stateVector: Uint8Array): Uint8Array {
  console.log("y_diff_update");
  return Y.diffUpdate(bytes, stateVector);
}

/**
 * Computes the state vector and encodes it into an Uint8Array
 * @param bytes
 * @returns The state vector of the document.
 */
export function encode_state_vector(bytes: Uint8Array): Uint8Array {
  console.log("y_encode_state_vector");
  return Y.encodeStateVectorFromUpdate(bytes);
}

/**
 * Get the map at the given key from the given bytes, and return it as JSON.
 * @param bytes
 * @param key
 * @returns The map at the given key from the given bytes, as JSON.
 */
export function get_map_json(bytes: Uint8Array, key: string): any {
  console.log("y_get_map_json");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, bytes);
  return doc.getMap(key).toJSON();
}

/**
 * Get the array at the given key from the given bytes, and return it as JSON.
 * @param bytes
 * @param key
 * @returns The array at the given key from the given bytes, as JSON.
 */
export function get_array_json(bytes: Uint8Array, key: string): any {
  console.log("y_get_array_json");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, bytes);
  return doc.getArray(key).toJSON();
}

/**
 * Get the xmlFragment at the given key from the given bytes, and return it as JSON.
 * @param bytes
 * @param key
 * @returns The xmlFragment at the given key from the given bytes, as JSON.
 */
export function get_xml_fragment_json(bytes: Uint8Array, key: string): any {
  console.log("y_get_xml_fragment_json");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, bytes);
  return doc.getXmlFragment(key).toJSON();
}

/**
 * Extract all text from the xmlFragment at the given key from the given bytes.
 * Useful for full text search.
 * @param bytes
 * @param key
 * @returns
 */
export function extract_xml_fragment_text(bytes: Uint8Array, key: string): string {
  console.log("y_extract_xml_fragment_text");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, bytes);
  const xml = doc.getXmlFragment(key);
  // TODO
  return "";
}
