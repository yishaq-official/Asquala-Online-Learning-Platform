import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Asquala Logo"
              width={40}
              height={40}
              className="w-9 h-9 object-contain"
            />
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-foreground">Asquala</span>
              <span className="text-xs text-muted-foreground">
                — Modern Online Learning Platform
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <Link href="#courses" className="hover:text-foreground">
              Courses
            </Link>
            <Link href="#categories" className="hover:text-foreground">
              Categories
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Asquala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
