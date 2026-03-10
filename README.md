# ShopSphere - React E-Commerce Assessment

ShopSphere is a production-ready e-commerce application built in **React + JavaScript** for the Frontend Engineering interview assignment. It focuses on a polished shopping experience with clean component structure, responsive design, and a complete cart + mock checkout workflow.

## Features

- Product listing page with responsive grid
- Search by keyword
- Category filtering
- Sorting by price, rating, and name
- Product details page
- Add to cart with quantity selection
- Cart page with quantity updates and remove actions
- Persistent cart using `localStorage`
- Mock checkout form with basic validation
- Order success confirmation page
- Clean, mobile-friendly UI

## Tech Stack

- React
- JavaScript (ES6+)
- Vite
- React Router DOM
- Plain CSS

## Project Structure

```bash
src/
  components/
  context/
  data/
  pages/
  styles/
  utils/
```

## Getting Started

```bash
npm install
npm run dev
```

For production build:

```bash
npm run build
npm run preview
```

## Key Decisions

### Why local mock data?
To keep the solution reliable and easy to review without depending on a third-party API or backend availability.

### Why Context API?
The app scope is moderate, so React Context with `useReducer` keeps cart logic centralized without adding unnecessary complexity.

### Why React Router?
It creates a more complete shopping experience by separating the catalog, product details, cart, checkout, and success pages.

## Improvements With More Time

- Add unit and integration tests
- Add pagination or infinite scrolling for larger catalogs
- Add wishlist support
- Add discount code handling
- Improve accessibility further with keyboard interaction enhancements and live announcements
- Integrate a real backend or commerce API

## Submission Notes

This project was built specifically as a fully functional e-commerce application using React and JavaScript.
