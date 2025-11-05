# 🛍️ Advanced E-commerce App

A modern, fully responsive e-commerce application built with React, TypeScript, and Redux Toolkit. Features product browsing, shopping cart functionality, and a beautiful user interface powered by React Bootstrap.

## ✨ Features

- **🏠 Homepage**: Featured products carousel and company story
- **📱 Responsive Design**: Mobile-first approach with Bootstrap grid system
- **🛒 Shopping Cart**: Add/remove items with Redux state management
- **🔍 Product Details**: Detailed product views with high-quality images
- **📋 Category Filtering**: Browse products by category
- **⚡ Fast Performance**: Built with Vite for lightning-fast development
- **🎨 Modern UI**: Clean, professional design with React Bootstrap
- **🔔 Toast Notifications**: User-friendly feedback for cart actions
- **📱 Mobile Optimized**: Responsive buttons and layouts for all screen sizes

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript
- **State Management**: Redux Toolkit + React Redux
- **Data Fetching**: TanStack React Query (React Query)
- **Routing**: React Router DOM v7
- **UI Framework**: React Bootstrap + Bootstrap 5.3
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: CSS3 + Bootstrap
- **Loading States**: React Loading Skeleton

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Cart.tsx            # Shopping cart dropdown
│   ├── CategorySelector.tsx # Product category filter
│   ├── Footer.tsx          # Page footer
│   ├── ImageWithFallback.tsx # Image component with error handling
│   ├── NavBar.tsx          # Navigation bar
│   ├── ProductCard.tsx     # Product display card
│   └── ProductList.tsx     # Product grid layout
├── pages/               # Page components
│   ├── HomePage.tsx        # Landing page with carousel
│   ├── ProductDetailspage.tsx # Individual product details
│   ├── CartPage.tsx        # Shopping cart page
│   └── CheckoutPage.tsx    # Checkout process
├── redux/               # State management
│   ├── store.ts            # Redux store configuration
│   └── cartSlice.ts        # Shopping cart state slice
├── hooks/               # Custom React hooks
│   ├── UseAppDispatch.ts   # Typed dispatch hook
│   ├── UseCategories.ts    # Category data hook
│   └── useProducts.ts      # Product data hook
├── context/             # API and context
│   └── api.ts              # API endpoints and functions
├── types/               # TypeScript type definitions
│   ├── Product.ts          # Product interface
│   ├── Cart.ts             # Cart item interface
│   └── User.ts             # User interface
└── assets/              # Static assets
```

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🎯 Key Features Explained

### 🛒 Shopping Cart

- **Redux Integration**: Persistent cart state across the application
- **Add/Remove Items**: Easy cart management with visual feedback
- **Toast Notifications**: Immediate user feedback for all cart actions

### 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Flexible Grid**: Adapts from 1 column (mobile) to 6 columns (large screens)
- **Smart Button Layout**: Buttons stack on mobile, side-by-side on larger screens

### 🖼️ Image Handling

- **Fallback Support**: Automatic fallback to placeholder images
- **Optimized Loading**: Efficient image loading with proper error handling
- **Responsive Images**: Images scale appropriately for different screen sizes

### ⚡ Performance Optimizations

- **React Query**: Intelligent caching and background updates
- **Code Splitting**: Optimized bundle sizes with Vite
- **TypeScript**: Enhanced developer experience and fewer runtime errors

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
```

### API Integration

The app uses the [Fake Store API](https://fakestoreapi.com/) for product data:

- Products: `/products`
- Categories: `/products/categories`
- Single Product: `/products/{id}`

## 🎨 Styling

The application uses a combination of:

- **Bootstrap 5.3**: For responsive grid and utility classes
- **React Bootstrap**: For consistent component styling
- **Custom CSS**: For specific styling needs and animations

## 🚀 Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- [React Bootstrap](https://react-bootstrap.github.io/) for the UI components
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [TanStack Query](https://tanstack.com/query) for data fetching

---

Built with ❤️ using React, TypeScript, and modern web technologies.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
