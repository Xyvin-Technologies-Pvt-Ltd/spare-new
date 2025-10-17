# SPAR Oman - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Login

Use any email and password to login (dummy authentication).

Example:

- Email: `ahmed@example.com`
- Password: `password`

---

## 📱 Explore the App

### Main Features to Try

1. **Home Page**

   - Browse promotional banners
   - Explore product categories
   - View featured products
   - Check out special offers

2. **Shopping**

   - Click on any product to view details
   - Add items to cart
   - Adjust quantities
   - Apply bank offers for discounts

3. **Checkout**

   - Review your cart
   - Select delivery address
   - Choose payment method
   - Place your order

4. **Rewards**

   - Check your loyalty points (1,245 points)
   - Browse merchant offers
   - Redeem points for vouchers

5. **Settings**
   - Switch language (English ↔ Arabic)
   - Toggle theme (Light ↔ Dark)
   - View profile information

---

## 🌐 Test Bilingual Support

Click the language toggle in Settings to switch between:

- **English (LTR)** - Left to Right layout
- **Arabic (RTL)** - Right to Left layout

All text, including product names and descriptions, will change accordingly.

---

## 🎨 Test Dark Mode

Toggle dark mode in Settings to see the entire app adapt to dark theme.

---

## 🛍️ Sample Shopping Flow

1. Login with any credentials
2. Browse products on home page
3. Click "Fresh Bananas" product
4. Set quantity to 2
5. Click "Add to Cart"
6. Click cart icon in header
7. Apply a bank offer (10% discount)
8. Proceed to checkout
9. Select an address
10. Choose "Cash on Delivery"
11. Place order
12. View order in Orders tab

---

## 💳 Bank Offers

Test the bank offer feature:

- **Bank Muscat**: 10% off
- **National Bank of Oman**: 15% off (weekends)
- **Ahli Bank**: 12% cashback
- **HSBC Oman**: 8% discount

---

## 🎁 Rewards System

Default points: **1,245 points**

Try redeeming points for:

- Al Fair voucher (500 points)
- Lulu discount (200 points)
- Oman Oil fuel credit (150 points)
- Movie tickets (300 points)

---

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📱 Convert to Mobile App

Follow the instructions in `CAPACITOR_SETUP.md` to convert this web app into native iOS and Android applications.

---

## 🎯 Key Pages

| Page           | Route          | Description             |
| -------------- | -------------- | ----------------------- |
| Login          | `/`            | Authentication page     |
| Home           | `/home`        | Main shopping page      |
| Product Detail | `/product/:id` | Individual product page |
| Cart           | `/cart`        | Shopping cart           |
| Checkout       | `/checkout`    | Order checkout          |
| Orders         | `/orders`      | Order history           |
| Rewards        | `/rewards`     | Loyalty program         |
| Settings       | `/settings`    | User preferences        |

---

## 🔍 Dummy Data

The app includes:

- **32 Products** across 8 categories
- **5 Promotional Banners**
- **4 Bank Offers**
- **10 Merchant Rewards**
- **4 Sample Orders**
- **2 User Addresses**
- **1,245 Loyalty Points**

---

## 🌟 Mobile-First Design

The app is optimized for mobile devices:

- Best viewed on screens 320px - 428px wide
- Touch-friendly buttons (44px minimum)
- Swipeable carousels
- Bottom navigation for thumb access
- Safe area support for notched devices

---

## 💡 Pro Tips

1. **Test on Mobile**: Use browser dev tools to simulate mobile devices
2. **RTL Testing**: Switch to Arabic to see proper RTL layout
3. **Dark Mode**: Toggle dark mode to see themed components
4. **Animations**: Notice smooth transitions between pages
5. **Persistence**: Cart and preferences are saved in localStorage

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
npm run dev -- --port 3000
```

### Dependencies Issue

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
npm run build -- --debug
```

---

## 📚 Learn More

- See `PROJECT_OVERVIEW.md` for detailed documentation
- See `CAPACITOR_SETUP.md` for mobile app conversion
- Check `frontend/src/` for code structure

---

## 🎉 Enjoy Shopping at SPAR Oman!

**Happy Coding! 🚀**
