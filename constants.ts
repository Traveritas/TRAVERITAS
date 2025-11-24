
import { BentoItem, ContentType, BlogPost, BlogCategory } from './types';

export const BENTO_ITEMS: BentoItem[] = [
  {
    id: '1',
    type: ContentType.TEXT,
    content: "Design is not just what it looks like and feels like. Design is how it works.",
    subContent: "Steve Jobs",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: '2',
    type: ContentType.IMAGE,
    content: "https://picsum.photos/id/26/600/800",
    subContent: "Found Objects",
    rowSpan: 2,
  },
  {
    id: '3',
    type: ContentType.LINK,
    content: "Read my latest essay on spatial computing.",
    subContent: "medium.com/@user",
    colSpan: 1,
  },
  {
    id: '4',
    type: ContentType.TEXT,
    content: "Simplicity is the ultimate sophistication.",
    subContent: "Leonardo da Vinci",
  },
  {
    id: '5',
    type: ContentType.IMAGE,
    content: "https://picsum.photos/id/48/600/600",
    subContent: "Architecture Study",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: '6',
    type: ContentType.LINK,
    content: "Twitter / X",
    subContent: "@aesthetic_dev",
  },
  {
    id: '7',
    type: ContentType.TEXT,
    content: "Entropy requires no maintenance.",
    subContent: "Robert Anton Wilson",
    colSpan: 1,
  },
  {
    id: '8',
    type: ContentType.IMAGE,
    content: "https://picsum.photos/id/56/600/400",
    subContent: "Morning Light",
    colSpan: 2,
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'philosophy',
    title: 'Philosophy & Design',
    description: 'Explorations of aesthetics, interfaces, and the digital void.',
    gradient: 'from-purple-500/20 via-fuchsia-500/5 to-transparent'
  },
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'Code structure, state management, and the craft of software.',
    gradient: 'from-cyan-500/20 via-teal-500/5 to-transparent'
  },
  {
    id: 'observations',
    title: 'Observations',
    description: 'Fragments of the analog world observed through a digital lens.',
    gradient: 'from-zinc-200/10 via-zinc-500/5 to-transparent'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    categoryId: 'philosophy',
    title: "The Silence of Interfaces",
    date: "Oct 12, 2024",
    readTime: "4 min read",
    excerpt: "Why the most effective digital experiences are the ones that disappear completely, leaving only the user and their intent.",
    tags: ["Design", "Philosophy"],
    content: `
      <p class="font-sans text-lg md:text-xl text-zinc-300 leading-loose mb-8">
        We often judge interfaces by what they show us. The animations, the gradients, the typography. But the true measure of an interface is what it doesn't show.
      </p>
      <h3 class="font-serif text-3xl text-zinc-100 mt-12 mb-6 italic">The Void as a Feature</h3>
      <p class="font-sans text-zinc-400 leading-relaxed mb-6">
        When we reduce visual noise, we aren't just making things "clean." We are reducing cognitive load. Every pixel on a screen asks for a fraction of the user's attention. By removing elements, we return that attention to the user.
      </p>
      <p class="font-sans text-zinc-400 leading-relaxed mb-6">
        Consider the empty state. In traditional design, it's a failure. In minimal design, it's a breath. A moment of pause before action.
      </p>
      <blockquote class="border-l-2 border-zinc-700 pl-6 my-12 italic font-serif text-2xl text-zinc-300">
        "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
      </blockquote>
      <p class="font-sans text-zinc-400 leading-relaxed mb-6">
        This is the silence we should strive for. Not the silence of emptiness, but the silence of clarity.
      </p>
    `
  },
  {
    id: '2',
    categoryId: 'philosophy',
    title: "Digital Brutalism & The New Web",
    date: "Sep 28, 2024",
    readTime: "6 min read",
    excerpt: "Exploring the resurgence of raw, unpolished aesthetics in a world dominated by corporate memphis and sterile gradients.",
    tags: ["Culture", "Trends"],
    content: `
      <p class="font-sans text-lg md:text-xl text-zinc-300 leading-loose mb-8">
        The web is becoming polished to a fault. Rounded corners, soft shadows, friendly illustrations. It feels safe. It feels corporate.
      </p>
      <p class="font-sans text-zinc-400 leading-relaxed mb-6">
        Digital Brutalism is the reaction. It is raw HTML. It is system fonts. It is high contrast and overlapping elements. It reminds us that the web is a material, not just a picture.
      </p>
      <h3 class="font-serif text-3xl text-zinc-100 mt-12 mb-6 italic">Honesty in Materials</h3>
      <p class="font-sans text-zinc-400 leading-relaxed mb-6">
        Architectural brutalism was about truth to materials—concrete should look like concrete. Digital brutalism is about truth to the browser.
      </p>
    `
  },
  {
    id: '3',
    categoryId: 'engineering',
    title: "Aetherial State Management",
    date: "Aug 15, 2024",
    readTime: "8 min read",
    excerpt: "Rethinking how we handle application state in a world where local-first software is becoming the new standard.",
    tags: ["Engineering", "Code"],
    content: `
      <p class="font-sans text-lg md:text-xl text-zinc-300 leading-loose mb-8">
        The server is no longer the source of truth. The user is.
      </p>
      <p class="font-sans text-zinc-400 leading-relaxed mb-6">
        Local-first software changes the paradigm. We don't fetch data; we sync it. The application lives on the device, and the cloud is merely a backup, a synchronization point.
      </p>
      <div class="bg-zinc-900/50 p-6 rounded border border-zinc-800 my-8 font-mono text-sm text-zinc-400">
        const state = new CRDT(initialState);<br/>
        state.sync(cloudProvider);
      </div>
      <p class="font-sans text-zinc-400 leading-relaxed mb-6">
        This requires a shift in how we think about React hooks, rendering cycles, and data consistency.
      </p>
    `
  },
  {
    id: '4',
    categoryId: 'observations',
    title: "Notes on Light and Shadow",
    date: "Jul 02, 2024",
    readTime: "3 min read",
    excerpt: "A collection of observations on how natural light interacts with modern architecture, and what UI designers can learn from it.",
    tags: ["Photography", "Study"],
    content: `
      <p class="font-sans text-lg md:text-xl text-zinc-300 leading-loose mb-8">
        I spent the afternoon watching the shadows lengthen across the concrete floor.
      </p>
      <p class="font-sans text-zinc-400 leading-relaxed mb-6">
        In UI, we fake light. Global lighting, drop shadows. But real light is inconsistent. It bounces. It has color temperature.
      </p>
      <img src="https://picsum.photos/id/56/800/400" alt="Light study" class="w-full h-auto rounded-lg grayscale my-8 opacity-80 hover:opacity-100 transition-opacity duration-500" />
      <p class="font-sans text-zinc-400 leading-relaxed mb-6">
        When we design "dark mode," we shouldn't just invert the colors. We should dim the lights.
      </p>
    `
  }
];
