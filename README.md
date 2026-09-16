# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# E-Commerce Products Dashboard

This is a React application built for the Junior Frontend Developer Technical Assessment. It manages a catalog of products against a live mock REST API, featuring CRUD operations, filtering, form validation, and optimistic UI updates.

## Setup Instructions

1. Clone this repository:
git clone https://github.com/geryakb/frontend-assessment-gery.git

2. Navigate to the project directory:
cd frontend-assessment-gery

3. Install dependencies:
nmp install

4. Start the development server
npm run dev

## Live Mock API Endpoint

the application uses 'my-json-server' for zero-backend REST API.
Endpoint: https://my-json-server.typicode.com/geryakb/frontend-assessment-gery/products

## Architecture Overview

* Framework: React (bootstrapped with Vite for fast HMR and optimized builds).
* Styling: Tailwind CSS for rapid, utility-first UI development.
* Folder Structure:
  * `/src/components`: Contains reusable UI components (`Modal.jsx`, `ProductForm.jsx`).
  * `/src/hooks`: Contains custom hooks like `useProductForm.js` to separate form logic and validation from the UI.
  * `App.jsx`: Acts as the main container managing the global state, API fetching, and filtering logic.
  * `logic-assessment.js`: Contains the vanilla JS logic exercise.

## Decisions & Trade-offs

* Optimistic UI Updates: Because `my-json-server` only simulates writes in memory (and resets frequently), waiting for a network response before updating the UI causes a sluggish experience. I implemented optimistic updates for Create, Edit, and Delete operations: the local React state is updated immediately to provide instant user feedback, and then reconciled with the server. If the network request fails, the state is rolled back to its previous version, and an error toast is shown.
* State Management: For an app of this size, I decided to use React's built-in `useState` and `useEffect` rather than introducing a heavy state management library like Redux. This keeps the bundle size small and the codebase simple.
* Custom Form Validation: I built a custom hook (`useProductForm`) for validation to demonstrate a fundamental understanding of controlled components, touched states, and dynamic error handling.

## Future Improvements

If given more time, I would improve the following:
1. Pagination: Implement traditional pagination or infinite scrolling for the product table to handle larger datasets.
2. Debounced Search: Add a debounce function to the search input to reduce the number of re-renders.