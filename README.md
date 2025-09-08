#### 1) What is the difference between var, let, and const?

- Answer:
  var is the old way to declare variables. It has function scope and we can be redeclared.

  let is the way to declare variables, it is block scoped and we can reassign the value, but can not redeclare in the same scope.

  const is the way to declare variables, it is also blocked scope, but we can not reassign its value once declared.

#### 2) What is the difference between map(), forEach(), and filter()?

- Answer:
  forEach(): just loops through the array and we can access each item. It doesn’t return a new array.
  map(): also loops, but it creates and returns a new array with the results of a function.
  filter() → loops and returns a new array with only the items that passed a given condition.

#### 3) What are arrow functions in ES6?

- Answer:
  Arrow functions are a shorter way to write functions in ES6.
  They use the "=>" syntax and don’t need the function keyword.
  They also don’t have their own "this", they use the "this" from their surrounding scope.

#### 4) How does destructuring assignment work in ES6?

- Answer:
  For array:
  const numbers = [10, 20, 30, 40];
  We can assign these values in different variables
  const [a, b, ...rest] = numbers; that means
  a = 10
  b = 20
  rest = [30, 40]

        For objects:
        const students = {
                name: "john",
                age: 22
        }
        const {name, age} = students
                name = "john"
                age = 22

#### 5) Explain template literals in ES6. How are they different from string concatenation?

- Answer:
  Template literals, are a new way to define strings in JavaScript, offering enhanced features. They are enclosed by backticks (``) instead of quotes.

          We can create strings easily using backticks ``, we can insert variables directly and dynamically using ${}.
          It also allow multi-line strings without

          const name = "john";
          const message = `Hello, ${name}!`; //output: Hello, john!

          Difference from string concatenation:
          Instead of doing "Hello, " + name + "!", template literals are cleaner and easier to read.
