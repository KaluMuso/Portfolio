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
              alt="Prosper Nation Logo" 
              width={24} 
              height={24} 
              className="rounded-sm"
            />
            <span className="font-bold text-gray-900 text-lg">
              ProsperNation<span className="text-blue-600">.</span>
            </span>
          </Link>
          <p className="text-gray-500 max-w-sm leading-relaxed mb-6 text-sm">
            Full-stack developer and automation builder based in Zambia. 
            Helping businesses ship fast, scalable products globally.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/KaluMuso" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
               <Image src="/icons/github.png" alt="GitHub" width={20} height={20} className="opacity-70 hover:opacity-100" onError={(e) => (e.currentTarget.style.display = 'none')} />
               <span className="sr-only">GitHub</span>
            </a>
            <a href="https://x.com/king5gates" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
               <Image src="/icons/twitter.png" alt="Twitter" width={20} height={20} className="opacity-70 hover:opacity-100" onError={(e) => (e.currentTarget.style.display = 'none')} />
               <span className="sr-only">Twitter</span>
            </a>
            <a href="https://www.linkedin.com/in/kaluba-prosper-musonda/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
               <Image src="/icons/linkedin.png" alt="LinkedIn" width={20} height={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
               <Image src="/icons/facebook.webp" alt="Facebook" width={20} height={20} />
            </a>
            <a href="https://wa.me/yourphone" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
               <Image src="/icons/whatsapp.png" alt="WhatsApp" width={20} height={20} />
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
