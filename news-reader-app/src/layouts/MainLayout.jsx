export default function MainLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar will go here later */}
        <main className="max-w-6xl mx-auto">{children}</main>
      </div>
    );
  }
  