"use client";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image
              src="/logo.png"
              alt="Vergeo Group Logo"
              width={204}
              height={24}
              className="rounded-sm"
            />

          </Link>
          <p className="text-gray-500 max-w-sm leading-relaxed mb-6 text-sm">
            Full-stack developer and automation builder based in Zambia.
            Helping businesses ship fast, scalable products globally.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/KaluMuso" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              <Image src="/icons/github.png" alt="GitHub" width={60} height={20} />
            </a>
            <a href="https://www.linkedin.com/in/kaluba-prosper-musonda/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              <Image src="/icons/linkedin.png" alt="LinkedIn" width={60} height={20} />
            </a>
            <a href="https://web.facebook.com/profile.php?id=61551917600176" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              <Image src="/icons/facebook.webp" alt="Facebook" width={60} height={20} />
            </a>
            <a href="https://wa.me/260761359005?text=Hey%20Kaluba%2C%20I%20saw%20your%20profile%20on%20your%20website%20and%20would%20like%20to%20find%20out%20more%20about%20the%20services%20you%20provide" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              <Image src="/icons/whatsapp.png" alt="WhatsApp" width={60} height={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-5 uppercase text-[10px] tracking-widest">Navigation</h4>
          <ul className="space-y-3">
            {["Projects", "Services", "About", "Waitlist", "Contact"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-5 uppercase text-[10px] tracking-widest">Legal</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-400">
        <p>© {currentYear} Kaluba Prosper Musonda. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <p>vergeosales@gmail.com</p>
          <span className="text-gray-200">|</span>
          <p>Built with ProsperNation Technology.</p>
        </div>
      </div>
    </footer>
  );
}
