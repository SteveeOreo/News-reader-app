export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} News Reader App. All rights reserved.</p>
      </footer>
    );
  }