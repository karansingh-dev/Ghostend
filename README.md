# Ghost End ⚡

**Ghost End** is a full-stack **Next.js mock API generator** that spins up lifelike endpoints in real time 🔗 from **JSON schemas** or **natural language** 🧠.

It produces realistic, domain-shaped data (users, products, orders, etc.) with **nested structures and validation** 🧪, backed by **Prisma + PostgreSQL** and secured with **Clerk authentication** 🔐.

Perfect for **rapid prototyping**, **testing APIs**, and **mocking realistic backend data**.

---

## 🚀 Features

- Generate REST endpoints from **JSON schema** or **natural language prompts**
- Produce realistic mock data with nested objects & arrays using `@faker-js/faker`
- Authentication & security powered by **Clerk**
- **Prisma + PostgreSQL** for schema-backed persistence
- AI-powered schema interpretation with **Google Gemini**
- Ready for both **local development** and **Dockerized deployments**

---

## ⚙️ Environment Setup

Create a `.env` file in the project root with the following values:

```env
# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

# Database (PostgreSQL + Prisma)
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>

# Google Gemini (AI-based schema parsing)
GOOGLE_GEMINI_API_KEY=
```

---

## 🛠️ Database Migrations

This project uses Prisma ORM with PostgreSQL. Whenever you update the schema in prisma/schema.prisma, run:

```bash
# Generate Prisma client
npm run db:generate

# Create and apply migration
npm run db:migrate
```

This ensures your database stays in sync with your schema changes.

---

## 💻 Running Locally (Traditional Approach)

Install dependencies:

```bash
npm install
```

Set up your .env file (see above).


Apply Prisma migrations:

```bash
npm run db:migrate
```

Generate Prisma Client:

```bash
npm run db:generate
```

Start the development server:

```bash
npm run dev
```

The app will be running at http://localhost:3000.

---

## 🐳 Running with Docker

You can also run Ghost End in a containerized environment.

1. **Build the image**
   ```bash
   docker build \
     -t ghostend:latest \
     --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key \
     --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in \
     --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard \
     --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard \
     .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 \
     -e DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database> \
     -e CLERK_SECRET_KEY=your_secret \
     -e GOOGLE_GEMINI_API_KEY=your_api_key \
     ghostend:latest
   ```

The app will be accessible at http://localhost:5000.

---

## 📚 Tech Stack

- **Frontend + Backend**: Next.js (Full-stack React)
- **Database ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: Clerk
- **AI Schema Parsing**: Google Gemini
- **Containerization**: Docker