import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Bar with Back Link */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <span>Back to Asquala</span>
        </Link>
      </div>

      {/* Main Auth Container */}
      <div className="my-auto py-6 flex flex-col items-center">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3.5 group mb-8">
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

        {/* Auth Form Card */}
        <div className="w-full max-w-md bg-card border border-border shadow-xs rounded-2xl p-7 sm:p-9">
          {children}
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Asquala. Structured online learning for real-world mastery.
      </div>
    </div>
  );
}
tion 