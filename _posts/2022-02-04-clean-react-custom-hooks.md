---
layout: post
title: Building clean React, with custom hooks 🎣
permalink: /writing/clean-react-custom-hooks
tags:
  - react
  - ts
render_with_liquid: false
---

Building maintainable production-ready React components can be a challenge.

There are a lot of things to worry about; such as:

- class or functional components
- sharing state across components
- handling events
- retrieving and modifying data from multiple APIs

All of these concerns can lead to a bloated component 😳, spanning multiple event handlers, data fetching, and transformation functions. In this post, I'll explain some of the tools to reduce this complexity in a way that you'll be confident when releasing to production; **hooks** 🎣.

![Gif of Spongebob Hook with caption 'im going to have some fun'](https://media.giphy.com/media/l1AsJtaK9CGE8Gn84/giphy.gif)

## What are React hooks?

React Hooks allow you to _hook_ into React state and lifecycle features within a functional component. You're able to control when a function is evaluated, when to re-render components, update state, and more.

React provides a few hooks which can be used on their own or in combination with custom hooks. In this guide, I'll focus on the following base hooks:

- useState
- useReducer
- useEffect
- useMemo

others include:

- useContext
- useCallback
- useRef
- useImperativeHandle
- useLayoutEffect

You can get a detailed explanation about these hooks [here](https://reactjs.org/docs/hooks-reference.html), but I'll be explaining them in practice below.

## Basic hooks in action 🎬

### useState 🗿

useState is likely the most common hook in any functional component. If you'd like your component to have any state and be able to re-render, he's your guy 👉😎👉

```javascript
function MyComponent() {
  const [search, setSearch] = useState("");
  return (
    <>
      <input onChange={(e) => setSearch(e.target.value)} />
      <p>Searching for: {search}</p>
    </>
  );
}
```

In this example, after each keystroke, our stateful value and UI is updated. If we used a normal variable instead, such as:

```javascript
function MyComponent() {
  let search = "";
  return (
    <>
      <input
        onChange={(e) => {
          search = e.target.value;
          console.log(search);
        }}
      />
      <p>Searching for: {search}</p>
    </>
  );
}
```

You'll notice that the variable is up to date in your console, but doesn't update in the UI. This is the purpose of using `useState`, and why hooks are used to hook into React's lifecycle updates.

Some other things to keep in mind:

- stateful values from `useState` are immutable and should only be updated using the provided function
- stateful values can be any type, such as string, char, number, or objects.
- functions which operate on the variables in place won't work, such as [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

### useReducer 🤏

useReducer means what it implies, a way of providing two values to get one back, very similar to the [reduce](**https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce**) method. You can use it very similarly to the `useState` hook, but it handles complex scenarios much more easily.

```javascript
function MyComponent() {
  const [counter, dispatch] = useReducer((state, action) => state + action, 0);
  return (
    <>
      <button onClick={() => dispatch(1)}>Click me</button>
      <p>Incremented # of times: {counter}</p>
    </>
  );
}
```

In this example, after each button click, we're dispatching an action (in this case a simple `1` value), which gets passed to our reducer function. The value returned from there will be used to compute the new stateful value. However, it's much more useful when you've got many ways to update state.

```javascript
function MyComponent() {
  const [search, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET": {
        return action.payload;
      }
      case "CLEAR": {
        return "";
      }
      case "CAPITALIZE": {
        return state.toUpperCase();
      }
    }
  }, "");
  return (
    <>
      <input
        value={search}
        onChange={(e) => dispatch({ type: "SET", payload: e.target.value })}
      />
      <button onClick={() => dispatch({ type: "CLEAR" })}>clear</button> <button
        onClick={() => dispatch({ type: "CAPITALIZE" })}
      >
        capitalize
      </button>
      <p>Searching for: {search}</p>
    </>
  );
}
```

Some things to keep in mind:

- anything returned from your reducer will be the new stateful value
- the action (second argument in your reducer function) can be any value you choose, but in most cases will be an object with a key of `type`

### useEffect 🍹

Implicit in the name of the hook, you're able to calculate side effects. It's particularly useful when trying to evaluate or update something on a state change or re-render.

```typescript
function MyComponent() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("I will log once");
  }, []);

  useEffect(() => {
    console.log(
      "I will log whenever any state or a re-render occurs",
      name,
      search
    );
  });

  useEffect(() => {
    console.log("I will log every time search is updated", search, name);
  }, [search]);

  return (
    <>
      <input onChange={(e) => setSearch(e.target.value)} />
      <input onChange={(e) => setName(e.target.value)} />
    </>
  );
}
```

Some things to keep in mind:

- the second argument provided is the dependency array
- a useEffect will re-evaluate whenever its dependencies change
- providing no dependency array will evaluate every re-render/state change.
- providing an empty dependency array will only evaluate once when the component initially re-renders (useful for making initial API requests on component load)

### useMemo 📝

The shape of this hook is very similar to useEffect, but instead of performing side-effects, it's used to perform taxing calculations. The use of this hook can dramatically increase performance when you're doing complex filtering or modification to data.

Assuming this initial code:

```typescript
function MyComponent() {
const movies = ["My Neighbor Totoro", "Kiki's Delivery Service" "The Secret World of Arrietty"];
  const [search, setSearch] = useState("");
const [name, setName] = useState("");


const filteredMovies = movies.filter(movie => movie.startsWith(search))

console.log(filteredMovies, movies, search)

  return (
    <>
      <input onChange={(e) => setSearch(e.target.value)} />
      <input onChange={(e) => setName(e.target.value)} />
    </>
  );
}
```

It appears to work just fine with a few movies, but once this list is filtering many items and with much more complex logic, our component will be inefficient. It'll recompute and calculate our filtered movies even when the conditions which impact the filter (search) aren't updated, and instead on each render.

To solve that, we can filter our movies in a useMemo hook.

```typescript
function MyComponent() {
const movies = ["My Neighbor Totoro", "Kiki's Delivery Service" "The Secret World of Arrietty"];
  const [search, setSearch] = useState("");
const [name, setName] = useState("");
  const filteredItems = useMemo(() => movies.filter(movie => movie.startsWith(search)), [search]);

useEffect(() => { console.log("recomputed filteredItems", filteredItems) }, [filteredItems])

  return (
    <>
      <input onChange={(e) => setSearch(e.target.value)} />
      <input onChange={(e) => setName(e.target.value)} />
    </>
  );
}
```

Now each time we change the search, our list of movies will be filtered, however changing the name won't cause a recalculation, improving the performance of our component!

In the future, this might not be necessary with some new features in React mentioned at React Conf 2021.

{% youtube lGEMwh32soc %}

## Making your own custom hooks 🙌

Now that you know about some of the foundational hooks, let's look at building our own! Custom hooks can be built out of many or a single base hook, to provide abstracted functions or state.

```typescript
import { useDebounce } from "use-debounce";

function useMovieFilter(movies) {
  const [filter, dispatch] = useReducer((state, action) => {}, {
    search: "",
  });

  const [debouncedFilter] = useDebounce(filter, 1000);

  const filteredMovies = useMemo(() => {
    if (filter.search.length == 0) return movies;

    return movies.filter((movie) =>
      movie.title.startsWith(debouncedFilter.search)
    );
  }, [movies, debouncedFilter]);

  return {
    filteredMovies,
  };
}
```

In this example, we're providing our hook with a list of movies, which will be filtered by a search and view filter. In addition, we've improved the performance by taking advantage of a debounce function, and ultimately delaying the re-render of the component until the user pauses typing.

So what have we gotten so far by adding our own custom hook?

- It can be reused anywhere else we'll want to filter and search for movies
- The logic is organized in one place and does not pollute the component definition
- It'll be easier to test, as we won't need to rely on rendering anything!
- this hook is built using another hook, meaning we get ultimately reusability!

## Testing your custom hook 🐛

Testing a hook provides the confidence that there won't be unexpected changes, and this can be done quite trivially with [React Hook Testing Library](https://github.com/testing-library/react-hooks-testing-library).

With this testing library, one doesn't need to render out any UI to test functionality and can directly interact with the hook.

```javascript
// useCounter.js
import { useState, useCallback } from "react";

export function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((x) => x + 1), []);

  return { count, increment };
}

// useCounter.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "./useCounter";

test("should increment counter", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

In the returned result, you'll be able to access a few things, such as previous and current results, as well as call methods directly without worrying about the following error:

```
Invariant Violation: Hooks can only be called inside the body of a function component.
```
