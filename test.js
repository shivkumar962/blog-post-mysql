
function test() {
  const a = 'testing';
  function sum() {
    console.log('sum->>>>>>>>>>>', a);
  }

  return sum;
}

let result = test();
console.log(result);
result();