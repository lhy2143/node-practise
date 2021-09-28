function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

function factorialTwo(n, result = 1) {
  result = result * n;
  if (n === 1) return result;
  return factorialTwo(n - 1, result);
}

function Fibonacci(n) {
  if (n <= 1) {
    return 1;
  }

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

function FibonacciTwo(n, previous = 1, forward = 1) {
  if (n === 1) {
    return forward;
  }
  return FibonacciTwo(n - 1, forward, previous + forward);
}

function ListNode(val, next) {
  this.val = val === void 0 ? 0 : val;
  this.next = next === void 0 ? 0 : next;
}

function transform(array) {
  let index = array.length - 1;
  let node = new ListNode(undefined, undefined);
  while (index > 0) {
    let temp = new ListNode(undefined, undefined);
    temp.next = array[index];
    temp.val = array[index - 1];
    node.next = temp;
    node.val = array[index - 2];
    index = index - 1;
  }
  return node;
}
