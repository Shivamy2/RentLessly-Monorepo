/**
 * Footer Component
 */

export function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-600">About</a></li>
              <li><a href="#" className="hover:text-gray-600">Blog</a></li>
              <li><a href="#" className="hover:text-gray-600">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-600">Contact</a></li>
              <li><a href="#" className="hover:text-gray-600">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-600">Help</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-600">Privacy</a></li>
              <li><a href="#" className="hover:text-gray-600">Terms</a></li>
              <li><a href="#" className="hover:text-gray-600">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-600">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-600">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-600">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Rent Lessly. Rent it effortlessly.</p>
        </div>
      </div>
    </footer>
  );
}
