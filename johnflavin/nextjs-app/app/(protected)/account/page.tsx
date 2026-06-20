import { signOut } from "@/app/actions/auth";

export default function AccountPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">My account</p>
        <h1 className="font-display text-4xl text-near-black">Account</h1>
      </div>

      <div className="space-y-8">
        <section className="border-b border-border pb-8">
          <h2 className="text-xs uppercase tracking-[0.1em] text-near-black/50 mb-4">Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-near-black/60 mb-1.5">Name</label>
              <input
                type="text"
                className="w-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-near-black/60 mb-1.5">Email</label>
              <input
                type="email"
                className="w-full border border-border bg-stone px-4 py-3 text-sm text-near-black/60 cursor-not-allowed"
                disabled
                placeholder="you@example.com"
              />
            </div>
          </div>
          <button className="mt-4 bg-near-black text-white px-6 py-2.5 text-sm hover:bg-primary transition-colors">
            Save changes
          </button>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-[0.1em] text-near-black/50 mb-4">Session</h2>
          <form action={signOut}>
            <button
              type="submit"
              className="border border-near-black/30 text-near-black px-6 py-2.5 text-sm hover:border-primary hover:text-primary transition-colors"
            >
              Sign out
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
