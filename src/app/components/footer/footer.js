export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-4">HitMagnet</h3>
            <p className="text-sm text-gray-600">
              Preview your YouTube thumbnails and titles across multiple formats
              to maximize engagement before publishing.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/impressum"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Impressum
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@hitmagnet.com"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  hello@hitmagnet.app
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/HitMagnet"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/hitmagnet"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} HitMagnet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
