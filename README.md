# 📚 Book Author App

A full-stack web application for managing books and authors using **Next.js (React)** for the frontend, **GraphQL with Apollo Server** for the backend, and **PostgreSQL & MongoDB** for data storage.

---

## 🚀 Features

- 📖 **Books Management:** Add, edit, delete, and list books.
- ✍️ **Authors Management:** Add, edit, delete, and list authors.
- 🌐 **GraphQL API:** Built using Apollo Server.
- 🗃 **Database:** PostgreSQL for structured data, MongoDB for metadata like reviews.
- 🏗 **Next.js Frontend:** Responsive UI with pagination and filtering.

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd book-author-app
```

## 2️⃣ Install Dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

## 3️⃣ Configure Environment Variables
### Create a .env file in both backend/ and frontend/ directories.
```bash
DATABASE_URL=postgres://user:password@postgres:5432/library
MONGO_URL=mongodb://mongodb:27017/library
PORT=4000
NEXT_PUBLIC_GRAPHQL_API=http://localhost:4000/graphql
```

## 4️⃣ Run the Application
```bash
docker-compose up --build
```

### Run Database Migrations & Populate Db
```bash
# Get the backend container name
docker ps  # Find the container name for backend-app

# Access the running backend container
docker exec -it backend-app sh

# Inside the container, run:
npx sequelize-cli db:migrate  # Apply migrations
node populateDB.js  # Populate the database

# Exit the container
exit
```

## 🔥 API & GraphQL Playground
```bash
http://localhost:4000/graphql
```

## 📡 GraphQL API Example Queries:
### 🔎 Fetch Books with Authors
```bash
query GetBooks {
  books {
    id
    title
    author {
      name
    }
  }
}
```

### ➕ Add a New Author
```bash
mutation AddAuthor {
  addAuthor(name: "New Author", biography: "Author bio", born_date: "1980-01-01") {
    id
    name
  }
}
```

### 📝 Update a Book
```bash
mutation UpdateBook {
  updateBook(id: "1", title: "Updated Title", description: "New description") {
    id
    title
  }
}
```
