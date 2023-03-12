# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I create two helper functions to prevent code repetition, that way not only the main method here gets less noisy it also prevents that if a change is needed the dev working on it doesn't forget to change it in all the places it appears. I also added an early return, so its clear for who is reading the code that if no input is sent to the method TRIVIAL_PARTITION_KEY will be the return. I removed the use of let and left only constants that way being easier to follow what happens with a variable. On the tests I tried to cover as much scenarios as possibles, even a wrong typing being sent on the input.