# Tempo Frontend challenge

# Solution Improvement

#### Code improvements:
  - Removed all `vars` from the code to avoid confusion with context and code understanding. `const` was used instead;
  - For better readability, the interfaces have been renamed to have the `I` prefix;
  - The logic to get information about teams and members was removed from within the component and placed in a hook to separate responsibilities;
  - Use of `Promise.All` instead of `for .. in` to get information from team members for performance reasons and not needing to do it sequentially;

#### Improvements on the teams/members page:
  - Improved user experience by displaying a friendlier error component when the request to the backend fails;
  - Added the search field by name and treatment if no result is found.
  - Small refactoring in the List component to fix types and make it more readable
  - Writing missing unit tests

#### Search Input Component:
  - Debounce the user typing to avoid several filtering;
  - Uses HTML5 input search type for better semantics;
  - Implemented to be reusable;

#### Future improvements:
  - Lazy loading pages;
  - Tests for the API;
  - Use some lib like (msw)[https://mswjs.io/] to do the most complete tests;


## To Run the project you must run:

```
npm install
```

## after the installation finished, you can run:

```
npm start
```

#### The project will open in your browser with the following url http://localhost:3000;

## To run the tests yo must run

```
npm run test
```