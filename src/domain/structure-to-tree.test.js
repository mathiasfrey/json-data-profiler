const s2t = require('./structure-to-tree');

test('adds 1 + 2 to equal 3', () => {

  const data = {
    "collection": [
      {"one": 1},
      {"one": 2}
    ]
  }

  const tree = s2t.getTree(data);
  expect(tree).toStrictEqual({
    "name": "collection", "type": "Array",
    "children": [{"name": "one", "type": "number"}],
    "length": 2,
  });
});