# Ekai Global — Website

Career Guidance & Skill Development website.

## Folder Structure

```
ekai-global/
├── index.html          ← Main single-page website
├── netlify.toml        ← Netlify deployment config + headers
├── README.md           ← This file
├── css/
│   └── style.css       ← All styles (variables, layout, responsive)
├── js/
│   └── main.js         ← Navbar, animations, lead form logic
└── images/             ← Add your images/logo here (optional)
```

## Lead Form Setup (Pick One)

### Option A — Netlify Forms (Recommended, Free)
1. Add `data-netlify="true"` and `name="lead-form"` to your `<form>` tag in `index.html`.
2. That's it — Netlify captures all submissions in your dashboard at `app.netlify.com`.

### Option B — Formspree
1. Go to https://formspree.io and create a free form.
2. Copy your Form ID (e.g. `xabc1234`).
3. In `js/main.js`, find the commented Formspree block and replace `YOUR_FORM_ID`:
   ```js
   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', { ... });
   ```
4. Remove the simulation block above it.

## Deploying to Netlify via GitHub

1. Push this entire folder as a GitHub repository.
2. Go to https://app.netlify.com → "Add new site" → "Import an existing project".
3. Connect GitHub, select your repo.
4. Build settings: leave blank (it's a static site).
5. Click **Deploy site**.

## Custom Domain (GoDaddy → Netlify)

1. In Netlify: Go to **Site settings → Domain management → Add custom domain**.
2. Enter your domain (e.g. `ekaiglobal.com`) and confirm.
3. Netlify will give you nameservers (e.g. `dns1.p05.nsone.net`).
4. In **GoDaddy**:
   - Go to your domain → DNS → Nameservers → Change → Custom.
   - Paste all 4 Netlify nameservers and save.
5. DNS propagation takes up to 24–48 hours.
6. Netlify auto-provisions a free **SSL/HTTPS certificate** once DNS is active.

## Fonts Used
- **Fraunces** (headings) — loaded from Google Fonts
- **Plus Jakarta Sans** (body) — loaded from Google Fonts

## Color Reference
| Token     | Hex       | Usage                   |
|-----------|-----------|-------------------------|
| Blue      | `#1a3c7a` | Primary brand, headings |
| Orange    | `#e87c1e` | CTAs, accents, "Global" |
| Green     | `#2e8b3a` | Success, badges, checks |
| Gray      | `#5a6472` | Body text, descriptions |