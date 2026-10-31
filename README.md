# S. Deepakumar — Cyber Security & Software Engineering Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live%20Demo-deepakumar--portfolio.vercel.app-ef4444?style=for-the-badge&logo=vercel&logoColor=white)](https://deepakumar-portfolio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-DEEPAK--47--S-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DEEPAK-47-S)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Deepakumar%20S-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/deepakumar-s)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **"Engineering Secure Digital Solutions."**  
> A high-performance, responsive personal developer portfolio showcasing full-stack applications, cybersecurity projects, API integrations, and academic achievements.

---

## 🌟 Overview & Key Highlights

This repository contains the production source code for the personal portfolio of **S. Deepakumar**, Computer Science & Engineering student at Nehru Institute of Engineering and Technology (Coimbatore, Tamil Nadu) and incoming Cybersecurity Intern at AEX Xenora Technologies.

- **Cyber Aesthetic**: Dark mode UI (`#030305`) accented with glowing crimson hues (`#ef4444`), an interactive Kali Linux dragon 3D chase effect, and hardware-accelerated matrix rain canvas animation.
- **Ultra-Lightweight & Fast**: Monolithic 2.3 MB HTML refactored down to ~34 KB (98.5% reduction) with externalized CSS, JS, and modern WebP image assets.
- **Mobile-First & Fully Responsive**: Tested across viewports from 320px ultra-compact mobile up to 1920px Full HD desktop, including dynamic safe-area insets and landscape modes.
- **Accessible (WCAG 2.1 AAA Compliant)**: Full keyboard navigation, visible focus indicators, screen-reader ARIA states, and `prefers-reduced-motion` support.
- **Hardened Contact API**: Vercel Serverless Function (`api/contact.js`) with server-side validation, anti-spam honeypot, in-memory rate limiting, and Gmail SMTP integration.
- **100% Resume Synchronized**: Complete alignment with official resume projects, including AUGIS (AICTE Problem-Statement Prototype), FestivalFlow AI (Sakthi Hackfest '26), Connecting Social Problems, TVK Ward 19, Offline Exam Portal, NIET Online Voting, and SmartCampus ERP.

---

## 💻 Featured Projects Portfolio

| Project | Technologies | Key Highlights | Links |
|---|---|---|---|
| **AUGIS** (AICTE Grievance Intelligence) | Python, Django, PostgreSQL, HTMX, Chart.js, Gemini AI | Centralized institution-related complaint tracking, bureau-wise status synchronization, overlap alerts, and Gemini AI-assisted grievance scrutiny. | [Live Demo](https://college-complaints.vercel.app/) • [GitHub](https://github.com/DEEPAK-47-S/College-Complaints) |
| **FestivalFlow AI** (Smart Transit Engine) | Python, Flask, JavaScript, Leaflet.js, PostGIS, OR-Tools | AI-assisted transit-demand planning, festival passenger surge forecasting across Tamil Nadu hubs, and fleet optimization. | [Live Demo](https://sakthi-hackton-2026.vercel.app/) • [GitHub](https://github.com/DEEPAK-47-S/Sakthi_Hackton_2026) |
| **Connecting Social Problem** | React, JavaScript, HTML, CSS, Supabase / PostgreSQL | Citizen grievance and reporting platform categorized under roads, water, sanitation, agriculture, and public safety. | [Live Demo](https://connecting-social-problems-web.vercel.app/) • [GitHub](https://github.com/DEEPAK-47-S/Connecting-Social-Problems) |
| **TVK CBE North Ward 19** | Python Flask, Supabase / PostgreSQL, JavaScript, Render | Ward complaint submission and tracking portal with geo-location fields, complaint reference codes, and status progress. | [Live Demo](https://tvk-cbe-ward19.onrender.com/) • [GitHub](https://github.com/DEEPAK-47-S/TVK) |
| **Smart Exam Portal for Students** | Python Flask, SQLite, HTML5, CSS3, JavaScript | Offline LAN examination portal with separate teacher/student workflows, question management, and local submission tracking. | [GitHub](https://github.com/DEEPAK-47-S/Offline-Exam-Portal) |
| **NIET Student Election** | Python Flask, SQLite, HTML5, CSS3, JavaScript | Web-based student election system with voter registration, candidate photo management, duplicate prevention, and CSV export. | [Live Demo](https://deepakumar.pythonanywhere.com/) • [GitHub](https://github.com/DEEPAK-47-S/Online-Voting) |
| **SmartCampus ERP Platform** | Web Application, Role-Based Access, Vercel | Centralized campus management interface with distinct workflows for students, faculty, and administrators. | [Live Demo](https://smart-campus-for-colleges.vercel.app/) • [GitHub](https://github.com/DEEPAK-47-S/Smart-Campus-for-Colleges) |
| **Academic AI & Vision Experiments** | Python, OpenCV, Computer Vision, HTML/CSS | Motion object detection, real-time facial expression analysis, and responsive e-commerce storefront portal. | [GitHub](https://github.com/DEEPAK-47-S) |

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| **Core Web** | HTML5 (Semantic, SEO-Optimized), Vanilla CSS3, Modern JavaScript (ES6+ Modules) |
| **Backend & Frameworks** | Python, Django, Flask, Node.js (v20+), REST APIs, Vercel Serverless Functions |
| **Databases** | PostgreSQL, Supabase, PostGIS, SQLite |
| **Styling & Design** | Custom Design Tokens, CSS Clamp() Responsive Typography, Dark Glassmorphism, UI/UX |
| **AI / ML & Optimization** | Gemini AI, Google OR-Tools, OpenCV, Leaflet.js, Chart.js, HTMX |
| **Typography** | Google Fonts ([Outfit](https://fonts.google.com/specimen/Outfit), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)) |
| **Assets & Media** | WebP format with PNG fallbacks, SVG Icons, Responsive `<picture>` elements |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/), Render, PythonAnywhere, Git & GitHub Actions |

---

## 📁 Project Structure

```text
Deepak_Portfolio/
├── index.html                   # Primary semantic, accessible single-page layout
├── assets/
│   ├── css/
│   │   └── style.css            # Modular design system, keyframes & responsive queries
│   ├── js/
│   │   └── main.js              # Core UI interactions, Matrix RAF canvas, and form AJAX
│   ├── images/
│   │   ├── Deepak.webp          # Optimized hero profile photo (WebP, ~99 KB)
│   │   ├── Deepak.png           # Lossless PNG fallback
│   │   ├── kali-dragon-red.webp # Optimized Kali dragon background asset (~22 KB)
│   │   ├── kali-dragon-red.png  # PNG fallback
│   │   ├── kalilogolinux.png    # Local Kali emblem for intro and favicon
│   │   └── projects/            # High-resolution project preview screenshots (WebP & PNG)
│   │       ├── AUGIS Preview.webp
│   │       ├── AUGIS Preview.png
│   │       ├── FestivalFlow AI Preview.webp
│   │       ├── FestivalFlow AI Preview.png
│   │       ├── Connecting Social Problems.webp
│   │       ├── Connecting Social Problems.png
│   │       ├── TVK Ward 19 Portal Preview.webp
│   │       ├── TVK Ward 19 Portal Preview.png
│   │       ├── Offline Exam Portal Preview.webp
│   │       ├── Offline Exam Portal Preview.png
│   │       ├── NIET Student Election Preview.webp
│   │       ├── NIET Student Election Preview.png
│   │       ├── SmartCampus Preview.webp
│   │       ├── SmartCampus Preview.png
│   │       ├── Academic Projects Preview.webp
│   │       └── Academic Projects Preview.png
│   └── certificates/            # Verified training & hackathon certification PDFs
├── api/
│   └── contact.js               # Hardened, rate-limited Vercel serverless contact endpoint
├── resume/
│   └── S_Deepakumar_Resume.pdf  # Verified official resume PDF
├── .env.example                 # Template for Vercel environment variables
├── .gitignore                   # Production repository exclusions
├── package.json                 # Project dependencies & scripts
└── README.md                    # Comprehensive technical documentation
```

---

## 🚀 Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/DEEPAK-47-S/Deepak_Portfolio.git
cd Deepak_Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start a Local Development Server

Run a simple local server using Python or any static file server:

```bash
# Using Python 3
python -m http.server 3000

# Or using npx serve
npx -y serve .
```

Open `http://localhost:3000` in your browser.

---

## 📧 Contact API & Vercel Configuration

The contact form sends direct email notifications to `skdeepakumar000@gmail.com` using Nodemailer and Gmail SMTP through a Vercel Serverless Function.

### Step 1: Generate a Google App Password

1. Sign in to your Google Account: `skdeepakumar000@gmail.com`
2. Navigate to [Google Account Security](https://myaccount.google.com/security)
3. Ensure **2-Step Verification** is turned ON.
4. Search for or navigate to [App Passwords](https://myaccount.google.com/apppasswords).
5. Create an App Password with the name **"Portfolio Website"**.
6. Copy the generated 16-character code (e.g., `abcd efgh ijkl mnop`).

### Step 2: Configure Environment Variables in Vercel

In your Vercel Dashboard:
1. Open your project settings: **Settings** &rarr; **Environment Variables**.
2. Add the following variables:

| Variable Name | Value | Purpose |
|---|---|---|
| `EMAIL_USER` | `skdeepakumar000@gmail.com` | Authenticated sender Gmail address |
| `EMAIL_PASS` | `your_16_char_app_password` | Google 16-character App Password (no spaces) |

3. Trigger a redeployment in Vercel to apply the new environment variables.

---

## 🧪 Testing & Validation

### Contact Form Validation Suite

Run the automated endpoint unit tests locally:

```bash
node scratch/test_contact_api.js
```

Tests include:
- HTTP method restriction (405 on non-POST)
- Input type checking and email format validation (RFC 5322)
- Input length boundaries (name 2–100 chars, message 5–3000 chars)
- Anti-spam honeypot bot trap
- In-memory sliding window rate limiting (max 5 requests per 15 min per IP)
- Safe error fallback (503 when SMTP environment variables are unconfigured)

---

## 📱 Mobile Responsiveness Breakdown

| Device Category | Target Viewport | Validation Details |
|---|---|---|
| **Ultra-Small Mobile** | `320px` – `360px` | No horizontal scroll, full-width fluid buttons, compact profile card (`180px`), safe padding (`0.75rem`). |
| **Standard Mobile** | `375px` – `430px` | Smooth hamburger navigation, 2-column wrapped CTA buttons, responsive typography with `clamp()`. |
| **Tablet** | `768px` | 2-column project cards, balanced resume split, touch-friendly navigation drawer. |
| **Laptop & Desktop** | `1024px` – `1440px` | Sticky glassmorphic navbar, interactive Kali dragon chase, multi-column grids. |
| **Full HD / 4K** | `1920px+` | Constrained 1200px container for optimal reading ergonomics. |

---

## 👤 Author & Connect

**S. Deepakumar**  
*Computer Science and Engineering Student & Cyber Security Enthusiast*  
Nehru Institute of Engineering and Technology, Coimbatore, Tamil Nadu, India.

- 🌐 **Portfolio**: [deepakumar-portfolio.vercel.app](https://deepakumar-portfolio.vercel.app/)
- 💻 **GitHub**: [@DEEPAK-47-S](https://github.com/DEEPAK-47-S)
- 👔 **LinkedIn**: [Deepakumar S](https://linkedin.com/in/deepakumar-s)
- 🧩 **LeetCode**: [deepakumar000](https://leetcode.com/u/deepakumar000/)
- 📸 **Instagram**: [@itz_deepak._.47](https://www.instagram.com/itz_deepak._.47)
- ✉️ **Email**: [skdeepakumar000@gmail.com](mailto:skdeepakumar000@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use it for personal inspiration.
