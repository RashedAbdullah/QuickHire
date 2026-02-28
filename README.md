# QuickHire – Frontend

QuickHire Frontend is built using Next.js and Tailwind CSS.  
It provides a clean, responsive, and professional job board UI based on the provided Figma design.

---

## 🌐 Live URL

https://quckhire-frontend.dirasah.org

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Responsive Design
- Component-based Architecture

---

## ✨ Features

- Job Listings Page
- Search by job title
- Filter by category
- Filter by location
- Job Detail Page
- Apply Now form with validation
- Basic Admin View (Add/Delete jobs)
- Fully responsive layout
- Clean and professional UI
- Reusable components

---

## 📁 Project Structure

```
src/app/
src/assets/
src/components/
src/config/
src/context/
src/hooks/
src/lib/
scr/models/
src/services/
```

- `app/` → Routing and pages
- `components/` → Reusable UI components
- `lib/` → Utilities
- `models/` → TypeScript interfaces
- `service/` → API Hanlders

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/RashedAbdullah/QuickHire
   cd quickhire
   ```

2. **Create Environment File**

   Create `.env` with the following:

   ```
   NEXT_PUBLIC_API_BASE_URL = http://localhost:3000
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

   App will run at: http://localhost:3000

---

## 📱 Responsive Design

- Mobile-first approach
- Optimized for Mobile, Tablet, Desktop
- Clean spacing system
- Minimal corporate UI

---

## 🔗 API Integration

Frontend connects to backend using:

```
NEXT_PUBLIC_API_URL
```

Make sure backend is running before testing features like job creation and applications.

---

## 📌 Notes

- UI closely follows the provided Figma design.
- Minor spacing adjustments made for responsiveness.
- Code structured for clarity and maintainability.

---

### 🌐 Backend URL

https://quckhire-frontend.dirasah.org
