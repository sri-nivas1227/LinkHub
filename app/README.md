# LinkHub

## Design System & Implementation Brief: LinkHub
1. Aesthetic DNA (The "Vibe")
Theme: Deep Midnight Minimalist.

Color Palette:

Background: #09090b (Zinc 950) for the main canvas.

Surface: #18181b (Zinc 900) for cards and modals.

Accent: Indigo-500 (#6366f1) for primary actions, with a subtle Emerald-400 glow for success states.

Text: Zinc-100 (Primary) and Zinc-400 (Secondary).

Typography: Sans-serif (Inter or Geist). Use tight tracking (tracking-tight) for headings to give it a premium feel.

Effects: Glassmorphism on the Navbar, subtle 1px borders (border-zinc-800), and soft shadows.

2. Layout Structure (Mobile-First)
The app should feel like a high-end mobile app even on a desktop browser.

Navbar
Sticky/Fixed: Top blur effect (backdrop-blur-md).

Content: Minimal logo "LH" on the left, a "Search" icon, and a "User Profile" avatar on the right.

The "Feed" (Collections & Links)
Container: Max-width of max-w-md (approx. 450px) to keep the mobile feel on desktop. Center this container.

Collections: Horizontal scrolling pill-shaped badges at the top to filter categories (e.g., "Reading," "Dev Tools," "Inspiration").

Link Cards: * Vertical stack.

Each card should feature a small favicon, a bold title, and a truncated URL.

Include a "Quick Copy" icon button on each card.

Footer
Style: Minimalist text. "Built with LinkHub © 2026."

Floating Action Button (FAB): A prominent "+" button fixed at the bottom right for mobile, or bottom center, to quickly add a new link.

3. Tech Stack Requirements
Framework: Next.js (App Router).

Styling: Tailwind CSS.

Icons: Lucide-react (for clean, thin-stroke icons).

Animations: Framer Motion (use simple initial={{ opacity: 0, y: 10 }} for list items).

4. Feature Enhancements for "Vibecoding"
Skeleton States: Add shimmer effects while links are loading.

Empty State: A beautiful, centered illustration or icon when a collection is empty.

Hover Effects: On desktop, cards should subtly lift or glow when hovered. On mobile, use active-press scaling (scale-95).

5. Instructions for the Agent
"Using Next.js and Tailwind CSS, build the LinkHub interface described above. Focus on high-quality spacing (gap, padding). Ensure the dark theme uses Zinc scales for a sophisticated look rather than pure black. Use a mobile-first approach where the UI stays centered in a slim column on large screens. Prioritize smooth transitions between collection filters."