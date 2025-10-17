# SPAR Oman Mobile-First E-Commerce App

## 🎯 Project Overview

A modern, mobile-first e-commerce web application for SPAR Oman built with React, Vite, and Tailwind CSS. The app features bilingual support (English/Arabic with RTL), loyalty rewards system, and comprehensive shopping functionality.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (mobile-first responsive design)
- **State Management**: Zustand with persistence
- **Routing**: React Router v6
- **Internationalization**: i18next (English/Arabic RTL support)
- **Animations**: Framer Motion
- **Icons**: React Icons

## 🎨 Brand Identity

- **Primary Green**: #00853F (SPAR brand color)
- **Accent Red**: #E1251B (for offers/discounts)
- **Background**: White/Light gray with dark mode support
- **Typography**: Inter font family

## 📱 Features

### Core Functionality

- ✅ User authentication (dummy login)
- ✅ Home page with promotional banners
- ✅ Product browsing by categories
- ✅ Product detail pages with related items
- ✅ Shopping cart with quantity management
- ✅ Bank offers and promo code application
- ✅ Checkout with address and payment selection
- ✅ Order tracking and history
- ✅ Loyalty rewards program
- ✅ Points redemption for merchant offers
- ✅ User profile and settings

### Bilingual Support

- 🌐 English (LTR) and Arabic (RTL) interfaces
- 🌐 Dynamic layout switching based on language
- 🌐 Fully translated UI elements
- 🌐 Currency formatting (Omani Rial - OMR)

### Oman Market Features

- 🇴🇲 Bank offers (Bank Muscat, NBO, Ahli Bank, HSBC Oman)
- 🇴🇲 Cash on Delivery payment option
- 🇴🇲 Local merchant partnerships (Al Fair, Lulu, Oman Oil, etc.)
- 🇴🇲 Halal certification badges on products
- 🇴🇲 Ramadan and National Day special offers
- 🇴🇲 Weekend deals (Thursday-Friday)

### User Experience

- 📱 Mobile-first responsive design (320px - 428px optimized)
- 🎨 Modern card-based UI with rounded corners
- ⚡ Smooth page transitions and animations
- 🌙 Light/Dark mode support
- ♿ Touch-friendly interface (44px minimum tap targets)
- 🔄 Loading states and empty states
- ✨ Micro-interactions for better feedback

## 📂 Project Structure

```
frontend/
├── src/
│   ├── api/              # API utilities (ready for backend)
│   ├── assets/           # Images, logos, icons
│   ├── components/       # Reusable UI components
│   │   ├── BottomNav.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── BannerCarousel.jsx
│   │   ├── OfferCard.jsx
│   │   ├── RewardCard.jsx
│   │   └── Loading.jsx
│   ├── layout/           # Layout components
│   │   ├── Header.jsx
│   │   └── AppLayout.jsx
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── Rewards.jsx
│   │   └── Settings.jsx
│   ├── store/            # Zustand stores
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   ├── rewardsStore.js
│   │   └── themeStore.js
│   ├── data/             # Dummy data
│   │   ├── products.js (32 products)
│   │   ├── categories.js (8 categories)
│   │   ├── offers.js (banners, bank offers, promos)
│   │   └── rewards.js (merchant offers, tiers)
│   ├── utils/            # Utility functions
│   │   ├── i18n.js
│   │   └── currency.js
│   ├── locales/          # Translation files
│   │   ├── en.json
│   │   └── ar.json
│   ├── App.jsx          # Main app with routing
│   └── main.jsx         # Entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── CAPACITOR_SETUP.md
```

## 🚀 Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔐 Dummy Login

The app uses dummy authentication for demonstration:

- Any email and password combination will work
- Default user: Ahmed Al-Said
- Pre-loaded with addresses and order history

## 💾 Data Persistence

- **Cart**: Persisted in localStorage
- **User Session**: Persisted in localStorage
- **Rewards Points**: Persisted in localStorage
- **Theme Preference**: Persisted in localStorage
- **Language Preference**: Persisted in localStorage

## 🎁 Dummy Data

### Products (32 items)

- Fruits & Vegetables (4 items)
- Dairy & Eggs (4 items)
- Beverages (4 items)
- Snacks (4 items)
- Bakery (4 items)
- Meat & Seafood (4 items)
- Household (4 items)
- Personal Care (4 items)

### Bank Offers (4 offers)

- Bank Muscat: 10% off
- National Bank of Oman: 15% weekend discount
- Ahli Bank: 12% cashback
- HSBC Oman: 8% discount

### Merchant Offers (10 offers)

- Al Fair, Lulu, Carrefour (Retail)
- Oman Oil (Fuel)
- City Cinema, VOX Cinemas (Entertainment)
- Restaurants (Dining)
- Muscat Pharmacy (Healthcare)
- Fitness First (Fitness)

## 🌟 Key Features for Oman Market

### Payment Options

- Credit/Debit Card
- Cash on Delivery (very popular in Oman)
- Loyalty Points redemption

### Localization

- Omani Rial (OMR) currency with proper formatting
- Arabic RTL support with proper layout
- Local measurement units (kg, litre, pieces)

### Special Offers

- Ramadan Specials section
- National Day Offers
- Weekend Deals (Thursday-Friday)
- Bank-specific discounts

### Social Integration (UI Ready)

- WhatsApp share buttons
- WhatsApp customer support
- Referral program

## 📱 Mobile-First Design

- Optimized for 320px - 428px screen widths
- Touch-friendly UI (minimum 44px tap targets)
- Bottom navigation for easy thumb access
- Safe area insets for notched devices
- Capacitor-ready for native app conversion

## 🔄 State Management

### Auth Store

- User authentication
- Profile management
- Language preference
- User addresses

### Cart Store

- Add/remove items
- Quantity management
- Apply offers/discounts
- Calculate totals

### Rewards Store

- Points balance
- Earn/redeem points
- Tier system
- Redemption history

### Theme Store

- Light/Dark mode
- Persistent preference

## 🌐 Internationalization

All text is translatable through i18next:

- UI labels and buttons
- Product names and descriptions
- Category names
- Offer descriptions
- Error messages
- Success notifications

## 🎨 Design System

### Colors

- Primary: #00853F (SPAR Green)
- Accent: #E1251B (SPAR Red)
- Success: Green shades
- Warning: Yellow shades
- Error: Red shades
- Info: Blue shades

### Typography

- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800, 900

### Spacing

- Base: 4px (Tailwind default)
- Mobile padding: 16px (p-4)
- Card radius: 16px (rounded-2xl)

### Shadows

- Cards: shadow-sm
- Buttons: shadow-lg
- Elevated: shadow-xl

## 🔮 Future Enhancements

### Backend Integration

- Real authentication API
- Product catalog from database
- Order processing system
- Payment gateway integration
- Push notifications

### Advanced Features

- Store locator with maps
- Barcode scanner for products
- Recipe suggestions
- Subscription service
- Wishlist/Favorites
- Product reviews and ratings
- Order scheduling
- Multiple delivery time slots

### Analytics

- User behavior tracking
- Conversion funnel analysis
- Product performance metrics
- A/B testing capability

## 📦 Capacitor Conversion

The app is ready to be converted to native iOS and Android apps using Capacitor. See `CAPACITOR_SETUP.md` for detailed instructions.

## 🧪 Testing

For testing, use any email/password combination to login. The app includes:

- Dummy products with images from Unsplash
- Realistic order history
- Sample rewards and offers
- Pre-configured user addresses

## 📄 License

Proprietary - SPAR Oman

## 👥 Credits

Built with modern web technologies for the Omani market.

---

**Version**: 1.0.0  
**Last Updated**: October 2024
