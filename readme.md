# Test combining [yjs](https://github.com/yjs/yjs) and PostgreSQL using PLV8 and plv8ify

It impliments the same functions as https://github.com/samwillis/yjs-sqlite-test but for PostgreSQL.

`/dist/pg_yjs.sql` contains the SQL to create the Yjs functions, PLV8 is requeired.

`/test.sql` from a few quick test to show it working.

## A few things you can do

- Create a new document via sql:

```sql
INSERT INTO docs (id, doc) VALUES ('doc1', y_new_doc());
```

- Update a document via sql, passing the update as a parameter:

```sql
UPDATE docs SET doc = y_apply_update(doc, $1) WHERE id = 'doc1';
```

- Get the state vector of a document via sql:

```sql
SELECT y_encode_state_vector(doc) FROM docs WHERE id = 'doc1';
```

- Query the content of a document via sql:

```sql
SELECT doc FROM docs WHERE y_get_map_json(doc, 'myMap')->>'$.aMapKey' = 'a value';
```

- Index the content of a document by creating a generated column:
  
```sql
ALTER TABLE docs ADD COLUMN aMapKey INTEGER GENERATED ALWAYS AS (y_get_map_json(doc, 'myMap')->>'aMapKey') STORED;
CREATE INDEX docs_aMapKey ON docs (aMapKey);
SELECT doc FROM docs WHERE aMapKey = 'a value';
```

## Available functions

- `y_new_doc()`
  Create a new Y.Doc and return its initial state as an update

- `y_apply_update(bytes, update)`
  Apply a document update to the document

- `y_merge_updates(updates)`
  Merge several document updates into a single document

- `y_diff_update(bytes, stateVector)`
  Encode the missing differences to another document as a single update message 
  that can be applied on the remote document. Specify a target state vector.

- `y_encode_state_vector(bytes)`
  Computes the state vector and encodes it into an Uint8Array

- `y_get_map_json(bytes, key)`
  Get the map at the given key from the given bytes, and return it as JSONB.
  JSON is then queryable via the JSON operators.

- `y_get_array_json(bytes, key)`
  As above but for a top level array.

- `y_get_xml_fragment_json(bytes, key)`
  As above but for a top level xml fragment.
