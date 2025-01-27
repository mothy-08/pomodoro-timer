import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold text-zinc-300">404 | Page not found</h1>
      <Link
        href="/"
        className="hover-text-zinc-100 rounded-lg bg-zinc-800 px-3 py-2 text-zinc-400 transition-colors hover:bg-zinc-700"
      >
        Go back
      </Link>
    </main>
  );
}
