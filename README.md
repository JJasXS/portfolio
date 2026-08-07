# Jason Portfolio

Personal portfolio / digital name card website for **Jason Choo Jie Sern**.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- next-themes (light / dark)

## Getting started

```bash
cd jason-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Edit your content

All personal content lives in `src/data/`:

| File | Purpose |
|------|---------|
| `personal.ts` | Name, contact, LinkedIn/GitHub, about text |
| `journey.ts` | Education & career timeline |
| `skills.ts` | Skills + "Always Learning" items |
| `projects.ts` | Project cards |
| `experience.ts` | Internships, leadership, volunteering |
| `achievements.ts` | Awards / certifications (placeholders ready) |

Replace placeholders such as `[LINKEDIN URL]`, `[GITHUB URL]`, and achievement entries when ready.

## Contact form backend

The enquiry form posts to `POST /api/contact`.

Open `src/app/api/contact/route.ts` and connect:

- Resend / SMTP
- n8n webhook
- Database storage

Comments in that file show where to plug in.

## Digital card download

`Download Card Image` generates a PNG name card (`Jason-Choo-Card.png`) that can be saved to Photos / Camera Roll.

## Deploy

Works on Vercel, or any Node host / VPS:

```bash
npm run build
npm start
```
