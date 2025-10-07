import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">🛍️ MiniShop</h3>
            <p className="text-gray-400">
              Your one-stop destination for all your shopping needs. Quality
              products at great prices.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/products" className="hover:text-white transition">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="text-gray-400 space-y-2">
              <p>📧 support@minishop.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Commerce St, City, State</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            &copy; 2024 MiniShop. All rights reserved. Built with React,
            TypeScript, and TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
