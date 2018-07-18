const Maybe = require("./maybe");
const forward = new Map([
  [ "value", m => m.value ],
  [ "or", (m, args) => m.or(...args) ],
  [ "catch", (m, args) => m.catch(...args) ]
]);

const Safe = obj => new Proxy(Maybe(obj), {
  get : (m, key) => key === "value"
    ? m.value()
    : forward.has(key)
      ? (...args) => Better(forward.get(key)(m, args))
      : Better(m.then(({ [key] : val }) => val))
});

module.exports = Safe;
