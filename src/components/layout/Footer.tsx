export function Footer() {
  return (
    <footer className="py-8 border-t border-cream/10 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <div className="font-serif text-2xl mb-4 text-cream">Fortune Stories</div>
        <p className="font-sans text-sm text-cream/60 tracking-widest uppercase mb-6">Branding Experts</p>
        <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} Fortune Stories. All rights reserved.</p>
      </div>
    </footer>
  );
}
