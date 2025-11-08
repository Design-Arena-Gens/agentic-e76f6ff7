import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-30 dark:opacity-40">
          <div className="h-72 w-[60rem] bg-gradient-to-tr from-brand-600 to-brand-900 rounded-full" />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-600/10">Premium Real Estate</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl">
              Discover spaces that feel like home
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Explore curated listings, immersive tours, and personalized consultations. Schedule a meeting with our experts to plan your next move.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-white shadow-lg shadow-brand-600/30 transition hover:translate-y-[-1px] hover:bg-brand-700 active:translate-y-[0]"
              >
                Dashboard
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 text-slate-700 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur border border-slate-200 dark:border-slate-800 p-4 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1505691723518-36a5ac3b2d51?q=80&w=1200&auto=format&fit=crop"
                alt="Modern home"
                className="rounded-xl object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Verified Listings",
              description: "Every property is vetted for quality and authenticity.",
            },
            {
              title: "Virtual Tours",
              description: "Experience properties with immersive 3D walkthroughs.",
            },
            {
              title: "Expert Guidance",
              description: "Get personalized advice from seasoned professionals.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-white/5 backdrop-blur p-6 transition hover:shadow-xl hover:shadow-brand-600/10"
            >
              <div className="h-10 w-10 rounded-lg bg-brand-600/10 text-brand-700 flex items-center justify-center mb-4">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 15-5-5 1.41-1.41L11 13.17l6.59-6.59L19 8Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{f.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
