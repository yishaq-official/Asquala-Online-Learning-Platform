import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative transition-transform group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Asquala Logo"
              width={56}
              height={56}
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl sm:text-[26px] tracking-tight text-foreground leading-none">
              Asquala
            </span>
            <span className="text-[11px] uppercase font-semibold tracking-wider text-muted-foreground mt-1">
              Online Learning
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link
            href="#courses"
            className="transition-colors hover:text-foreground hover:font-semibold"
          >
            Courses
          </Link>
          <Link
            href="#categories"
            className="transition-colors hover:text-foreground hover:font-semibold"
          >
            Categories
          </Link>
          <Link
            href="#features"
            className="transition-colors hover:text-foreground hover:font-semibold"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="transition-colors hover:text-foreground hover:font-semibold"
          >
            About
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
