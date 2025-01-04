export default function Footer() {
    return (
      <footer className="w-full py-5 bg-black text-black mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>Hair & Beauty</li>
                <li>Health & Medical</li>
                <li>Food & Dining</li>
                <li>Fitness & Sports</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">For Businesses</h3>
              <ul className="space-y-2">
                <li>Add Your Business</li>
                <li>Business Dashboard</li>
                <li>Advertising</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Contact</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>© 2024 City Directory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  