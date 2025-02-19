export default function Layout({ children }) {
  return (
    <div className="split-screen">
      {/* Left (Books & Authors Section) */}
      <div className="split-left">
        <div className="card">
          {children}
        </div>
      </div>

      {/* Right (Black Area - Reduced to 25%) */}
      <div className="split-right">
        <h1>📚 BookVerse</h1>
        <p>Discover, Read & Manage Your Favorite Books & Authors</p>
        <div className="badges">
          <span>🔥 Explore New Books</span> <br />
          <span>📖 Connect with Authors</span> <br />
          <span>⭐ Read & Write Reviews</span>
        </div>
      </div>
    </div>
  );
}
