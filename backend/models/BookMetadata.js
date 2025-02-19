const mongoose = require('mongoose');
const BookMetadataSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  reviews: [String],
  ratings: [Number]
});

module.exports = mongoose.model('BookMetadata', BookMetadataSchema);
