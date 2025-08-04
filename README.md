
#  Cloud Hosting Articles Dashboard

A full-featured admin dashboard for managing articles and comments related to cloud hosting services. Built with **Next.js**, **React**, and **Tailwind CSS**, this project includes authentication, authorization, and CRUD functionality for both users and admins.

---

##  Features

-  **Authentication** with JWT and bcryptjs
-  **Role-based access**:
  - Users can add, edit, and delete their own comments
  - Admins can manage all articles and comments
-  Articles Table for admin with full CRUD
-  Fast and responsive UI with Tailwind CSS
-  Schema validation with Zod and React Hook Form
-  Token stored in cookies and verified via server

---

##  Tech Stack

- **Framework:** Next.js 14, React 18
- **Styling:** Tailwind CSS
- **Database:** Prisma ORM with SQLite (can switch to PostgreSQL)
- **Auth:** JSON Web Token (JWT), bcryptjs
- **Forms & Validation:** React Hook Form, Zod
- **API Communication:** Axios
- **UI Enhancements:** SweetAlert2, React Toastify, React Icons, React Paginate

---

##  Project Structure

- `app/api/`  API routes
- `components/`  Reusable UI components
- `lib/`  Helper functions (e.g., token verification, session handling)
- `middlewares/`  Middleware for authentication and role checks
- `prisma/schema.prisma`  Database schema

---

##  Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo.git

# 2. Navigate to the project directory
cd your-repo

# 3. Install dependencies
npm install

# 4. Generate and migrate Prisma schema
npx prisma generate
npx prisma migrate dev --name init

# 5. Start the development server
npm run dev
```

---

##  Admin Credentials

Use the following credentials to access the admin dashboard and manage articles/comments:

- **Email:** `admin@gmail.com`
- **Password:** `123456`

> Once logged in, navigate to the articles table to add/edit/delete content.

---

##  Screenshots (Optional)

> You can add images here to showcase your UI, dashboard, login screen, etc.

---

##  Notes

- The project does **not use Next.js Route Handlers** (e.g., `app/api/route.ts`)  it follows traditional API route setup.
- JWT is stored in cookies and verified on each request for secure session handling.
- You can easily switch from SQLite to PostgreSQL by updating the Prisma schema and `.env` configuration.

---


