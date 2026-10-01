# axosis — portfolio

Personal portfolio and blog of **Subash Lama Tamang**, a full-stack developer and UI/UX designer.

**Live:** [subashlamatamang.com.np](https://subashlamatamang.com.np)

![Portfolio preview](public/projects/portfolio-preview.png)

## Features

- **Graph navigation:** an Obsidian-style force-directed graph to move around the site
- **Projects and blogs:** content lives in plain TypeScript files, no CMS
- **GitHub activity:** a contribution heatmap, cached server-side for an hour
- **Contact form:** sends mail through [Resend](https://resend.com), with an optional auto-reply to the visitor
- **Light and dark themes:** the new theme grows out from the toggle in a circle, like the `swww` wallpaper transition
- **Small details:** a pixel loading screen, a jittery hand-drawn scroll hint, and [oneko](https://github.com/adryd325/oneko.js) chasing your cursor

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- TypeScript
- Tailwind CSS v4 with `@tailwindcss/typography`
- [react-force-graph-2d](https://github.com/vasturiano/react-force-graph) for the graph
- `lucide-react` and `react-icons` for icons
- Resend for email

## Getting started

Requires Node.js 20 or newer.

```bash
git clone git@github.com:frgnc-subash/portfolio.git
cd portfolio
npm install
cp .env.example .env
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Environment variables

These are only needed for the contact form. Everything else works without them.

| Variable          | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `RESEND_API_KEY`  | API key from your Resend dashboard                           |
| `SENDER_EMAIL`    | "From" address; must be on a domain verified in Resend       |
| `SENDER_NAME`     | Display name on outgoing mail                                |
| `RECEIVE_EMAIL`   | Inbox that receives contact form messages                    |
| `SEND_AUTO_REPLY` | Set to `false` to stop sending the visitor a confirmation    |

## Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start the dev server          |
| `npm run build` | Create a production build     |
| `npm run start` | Serve the production build    |
| `npm run lint`  | Run ESLint                    |

## Project structure

```
app/
  api/contact/               contact form endpoint (Resend)
  api/github-contributions/  cached GitHub contribution data
  blogs/                     blog list and [slug] post pages
  projects/                  projects page
  contact/                   contact page
  layout.tsx                 root layout, fonts, theme script
  loading.tsx                loading screen
  page.tsx                   home page
components/
  layouts/                   navbar, footer, theme toggle, background, oneko
  ui/                        graph and GitHub contributions
data/
  blogData.ts                blog posts
  projectData.ts             projects
lib/seo.ts                   per-page metadata and JSON-LD
public/                      images, logos, oneko sprite
```

## Adding content

- **Project:** add an entry to `PROJECTS` in `data/projectData.ts` and put its screenshot in `public/projects/`.
- **Blog post:** add an entry to `BLOG_POSTS` in `data/blogData.ts`. The `content` field is HTML, and images go in `public/blog/`.

---

Made by [axosis](https://github.com/frgnc-subash).
