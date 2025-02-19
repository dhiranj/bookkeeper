const { sequelize } = require('./config/database');
const Author = require('./models/Author');
const Book = require('./models/Book');
const Review = require('./models/review'); // MongoDB Review Model
const mongoose = require('mongoose');

const authors = [
  { name: 'J.K. Rowling', biography: 'British author, best known for the Harry Potter series.', born_date: '1965-07-31' },
  { name: 'George R.R. Martin', biography: 'American novelist, best known for A Song of Ice and Fire.', born_date: '1948-09-20' },
  { name: 'J.R.R. Tolkien', biography: 'English writer, best known for The Lord of the Rings.', born_date: '1892-01-03' }
];

const books = [
  { title: 'Harry Potter and the Philosopher\'s Stone', description: 'The first book in the Harry Potter series.', published_date: '1997-06-26', authorName: 'J.K. Rowling' },
  { title: 'A Game of Thrones', description: 'The first book in A Song of Ice and Fire series.', published_date: '1996-08-06', authorName: 'George R.R. Martin' },
  { title: 'The Fellowship of the Ring', description: 'The first book in The Lord of the Rings series.', published_date: '1954-07-29', authorName: 'J.R.R. Tolkien' }
];

async function populateDB() {
  try {
    // 1️⃣ **Reset & Sync PostgreSQL**
    await sequelize.sync({ force: true });
    console.log('✅ PostgreSQL Database Synced.');

    // 2️⃣ **Insert Authors**
    const authorInstances = await Author.bulkCreate(authors, { returning: true });
    console.log('✅ Authors Added.');

    // 3️⃣ **Insert Books**
    const bookInstances = await Promise.all(
      books.map(async (book) => {
        const author = authorInstances.find(a => a.name === book.authorName);
        if (author) {
          return await Book.create({ ...book, author_id: author.id });
        }
      })
    );
    console.log('✅ Books Added.');

    // 4️⃣ **Connect to MongoDB**
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB.');

    // 5️⃣ **Manually Create Book Metadata in MongoDB to Get `_id`**
    const mongoBooks = await Promise.all(
      bookInstances.map(async (book) => {
        const newBook = new Review({
          bookId: new mongoose.Types.ObjectId(), // Generate MongoDB `_id`
          review: `Review for ${book.title}`,
          rating: Math.floor(Math.random() * 5) + 1
        });
        await newBook.save();
        return newBook;
      })
    );
    console.log('✅ Reviews Added.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error populating database:', error);
    process.exit(1);
  }
}

// Run the script
populateDB();
