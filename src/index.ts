import "./polyfills";
import * as Y from "yjs";

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
 * @param savedDoc
 * @param update
 * @returns he new state of the document as an update.
 */
export function apply_update(savedDoc: Uint8Array, update: Uint8Array): Uint8Array {
  console.log("y_apply_update");
  return Y.mergeUpdates([savedDoc, update]);
}

/**
 * Apply a document update on the document and garbage-collect deleted content.
 * @param savedDoc
 * @param update
 * @returns The new state of the document as an update.
 */
export function apply_update_gc(savedDoc: Uint8Array, update: Uint8Array): Uint8Array {
  console.log("y_apply_update_gc");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, savedDoc);
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
 * @param savedDoc
 * @param stateVector
 * @returns The new state of the document as an update.
 */
export function diff_update(savedDoc: Uint8Array, stateVector: Uint8Array): Uint8Array {
  console.log("y_diff_update");
  return Y.diffUpdate(savedDoc, stateVector);
}

/**
 * Computes the state vector and encodes it into an Uint8Array
 * @param savedDoc
 * @returns The state vector of the document.
 */
export function encode_state_vector(savedDoc: Uint8Array): Uint8Array {
  console.log("y_encode_state_vector");
  return Y.encodeStateVectorFromUpdate(savedDoc);
}

/**
 * Get the map at the given key from the given savedDoc, and return it as JSON.
 * @param savedDoc
 * @param key
 * @returns The map at the given key from the given savedDoc, as JSON.
 */
export function get_map_json(savedDoc: Uint8Array, key: string): any {
  console.log("y_get_map_json");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, savedDoc);
  return doc.getMap(key).toJSON();
}

/**
 * Get the array at the given key from the given savedDoc, and return it as JSON.
 * @param savedDoc
 * @param key
 * @returns The array at the given key from the given savedDoc, as JSON.
 */
export function get_array_json(savedDoc: Uint8Array, key: string): any {
  console.log("y_get_array_json");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, savedDoc);
  return doc.getArray(key).toJSON();
}

/**
 * Get the xmlFragment at the given key from the given savedDoc, and return it as JSON.
 * @param savedDoc
 * @param key
 * @returns The xmlFragment at the given key from the given savedDoc, as JSON.
 */
export function get_xml_fragment_json(savedDoc: Uint8Array, key: string): any {
  console.log("y_get_xml_fragment_json");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, savedDoc);
  return doc.getXmlFragment(key).toJSON();
}

/**
 * Extract all text from the xmlFragment at the given key from the given savedDoc.
 * Useful for full text search.
 * @param savedDoc
 * @param key
 * @returns
 */
export function extract_xml_fragment_text(savedDoc: Uint8Array, key: string): string {
  console.log("y_extract_xml_fragment_text");
  const doc = new Y.Doc();
  Y.applyUpdate(doc, savedDoc);
  const xml = doc.getXmlFragment(key);
  // TODO
  return "";
}
