DROP TABLE IF EXISTS docs;
CREATE TABLE IF NOT EXISTS docs (id INTEGER PRIMARY KEY, doc BYTEA);

CREATE TEMPORARY TABLE logs (s TEXT, t TIMESTAMP DEFAULT current_timestamp);

-- Add a yjs document to the docs table
INSERT INTO docs (id, doc) VALUES (1, y_new_doc());

INSERT INTO logs (S) VALUES ('Table created');

DO $$

const docBytes = plv8.execute("SELECT doc FROM docs WHERE id = 1")[0].doc;
const doc = new yjs.Doc();
yjs.applyUpdate(doc, docBytes);

const myMap = doc.getMap('myMap');
myMap.set('myKey', '123');

const stateVector = plv8.execute("SELECT y_encode_state_vector(doc) as state_vector FROM docs WHERE id = 1")[0].state_vector;

const update = yjs.encodeStateAsUpdate(doc, stateVector);

plv8.execute("UPDATE docs SET doc = y_apply_update(doc, $1) WHERE id = 1", [update]);

const doc2Bytes = plv8.execute("SELECT doc FROM docs WHERE id = 1")[0].doc;
const doc2 = new yjs.Doc();
yjs.applyUpdate(doc2, doc2Bytes);
const myMap2 = doc.getMap('myMap');
const myKey2 = myMap2.get('myKey');

plv8.execute("INSERT INTO logs (S) VALUES ($1)", ['Value from map: '+myKey2]);

myMap2.set('myKey', 'Hello')

plv8.execute("UPDATE docs SET doc = y_apply_update(doc, $1) WHERE id = 1", [update]);

plv8.execute("INSERT INTO logs (S) SELECT y_get_map_json(doc, 'myMap') ->> 'myKey' FROM docs WHERE id = 1");

for (let i = 2; i <= 100; i++) {
  let doc = new yjs.Doc();
  let map = doc.getMap("myMap");
  map.set("myKey", "bar" + i);
  map.set("num", Math.floor(Math.random() * 100));
  plv8.execute("INSERT INTO docs (id, doc) VALUES ($1, $2)", [i, yjs.encodeStateAsUpdate(doc)])
}

let count = plv8.execute("SELECT count(*) FROM docs WHERE (y_get_map_json(doc, 'myMap')->>'num')::int < 50;")[0].count;
plv8.execute("INSERT INTO logs (S) VALUES ($1)", ['Count (using y_get_map_json): '+count]);

plv8.execute("ALTER TABLE docs ADD COLUMN num INTEGER GENERATED ALWAYS AS ((y_get_map_json(doc, 'myMap')->>'num')::int) STORED;");

count = plv8.execute("SELECT count(*) FROM docs WHERE num < 50;")[0].count;
plv8.execute("INSERT INTO logs (S) VALUES ($1)", ['Count (using index): '+count]);

$$ LANGUAGE plv8;

SELECT * FROM logs
-- SELECT * FROM docs;
