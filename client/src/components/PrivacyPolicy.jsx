import { assets } from "../assets/assets";
import Footer from "./student/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[260px_1fr] gap-10">

          {/* Sidebar */}
          <aside className="hidden md:block sticky top-20 h-fit">
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={assets.logo || assets.sketch}
                  className="w-10 h-10"
                />
                <span className="font-semibold text-gray-700">
                  Edemy
                </span>
              </div>

              <nav className="space-y-3 text-sm text-gray-600">
                <a href="#info" className="block hover:text-blue-600">
                  Information We Collect
                </a>
                <a href="#usage" className="block hover:text-blue-600">
                  How We Use Data
                </a>
                <a href="#sharing" className="block hover:text-blue-600">
                  Sharing
                </a>
                <a href="#cookies" className="block hover:text-blue-600">
                  Cookies
                </a>
                <a href="#security" className="block hover:text-blue-600">
                  Security
                </a>
                <a href="#rights" className="block hover:text-blue-600">
                  Your Rights
                </a>
                <a href="#contact" className="block hover:text-blue-600">
                  Contact
                </a>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">

            <header className="mb-10">
              <h1 className="text-4xl font-bold text-gray-800">
                Privacy Policy
              </h1>
              <p className="text-gray-500 mt-2 text-sm">
                Effective Date: November 10, 2025
              </p>
            </header>

            <div className="space-y-10 text-gray-700 leading-relaxed">

              <section id="intro">
                <p>
                  Edemy LMS ("we", "our", or "us") values your privacy. This
                  Privacy Policy explains how we collect, use, and protect
                  information when you use our platform.
                </p>
              </section>

              <section id="info">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Information We Collect
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Account details such as name and email</li>
                  <li>Course activity and progress</li>
                  <li>Device and browser information</li>
                  <li>Payment information via secure processors</li>
                </ul>
              </section>

              <section id="usage">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  How We Use Your Data
                </h2>
                <p className="text-sm">
                  Your information helps us deliver the platform, personalize
                  courses, process enrollments, maintain security, and improve
                  learning experiences.
                </p>
              </section>

              <section id="sharing">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Data Sharing
                </h2>
                <p className="text-sm">
                  We only share information with trusted services such as
                  hosting providers, payment processors, and analytics tools.
                  We never sell personal data.
                </p>
              </section>

              <section id="cookies">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Cookies
                </h2>
                <p className="text-sm">
                  Cookies help us remember preferences and analyze usage.
                  You may disable cookies in your browser settings.
                </p>
              </section>

              <section id="security">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Security
                </h2>
                <p className="text-sm">
                  We use administrative, technical, and physical safeguards to
                  protect your data, but no system is completely secure.
                </p>
              </section>

              <section id="rights">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Your Rights
                </h2>
                <p className="text-sm">
                  Depending on your region, you may request access, correction,
                  or deletion of your personal data.
                </p>
              </section>

              <section id="contact">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Contact Us
                </h2>
                <p className="text-sm">
                  If you have questions about this policy, email us at:
                </p>

                <a
                  href="mailto:gps.96169@gmail.com"
                  className="text-blue-600 font-medium"
                >
                  rohitmathur05458@gmail.com
                </a>
              </section>

              <div className="pt-6 border-t text-sm text-gray-500">
                Last Updated: March 12, 2026
              </div>

            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}