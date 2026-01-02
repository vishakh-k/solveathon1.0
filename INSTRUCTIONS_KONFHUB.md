# How to Integrate KonfHub with Your Website

Using KonfHub is an **excellent choice**. It saves you from writing complex backend code for:
- User secure login/signup
- Payment gateway integration (UPI, Cards, etc.)
- Ticket ID generation and email confirmations
- Participant data management (CSV exports)

Since they handle the heavy lifting for a small fee + GST, it allows you to focus purely on the event itself.

## Step-by-Step Integration Guide

### Phase 1: Set up KonfHub
1. **Create an Account:** Go to [KonfHub.com](https://konfhub.com/) and sign up as an Organizer.
2. **Create Event:** Click **"Create Event"** and enter details:
   - **Title:** Solve-A-Thon 1.0
   - **Date/Time:** Feb 18-19, 2026
   - **Venue:** Srinivas Institute of Technology
3. **Create Tickets:**
   - Go to the **"Tickets"** section.
   - Create a ticket type (e.g., "Team Registration").
   - Set the price (e.g., ₹250 or ₹500).
   - *Tip:* You can ask for "Team Name" and "Team Leader" details in the "Checkout Form" settings on KonfHub.
4. **Publish:** Once ready, publish the event.

### Phase 2: Connect to Your Website
You have two options to connect it to your HTML site.

#### Option A: Direct Link (Simplest & Recommended)
This redirects users to the official KonfHub page to complete payment.
1. On your KonfHub Event Dashboard, find the **"Event URL"** (e.g., `https://konfhub.com/solveathon-sit`).
2. **Copy this URL.**
3. Open your `index.html` file.
4. detailed below, find the "Register" buttons and replace `href="#"` with your link.

#### Option B: Embed Widget (Advanced)
This allows users to buy tickets *inside* your website without leaving.
1. On KonfHub Dashboard, look for **"Embed Code"** or "Widget".
2. It will give you an `<iframe>` or a `<script>` tag.
3. Paste that code into a new section in your `index.html` (e.g., create a `<section id="tickets">`).

### Phase 3: Updating Your Code
I have prepared the code spots for you. You just need to paste the link.

**In `frontend/index.html`:**

**1. Navbar Button:**
```html
<!-- Line ~46 -->
<li><a href="PASTE_YOUR_KONFHUB_LINK_HERE" target="_blank" class="nav-btn">Register Now</a></li>
```

**2. Hero Section Button:**
```html
<!-- Line ~76 -->
<a href="PASTE_YOUR_KONFHUB_LINK_HERE" target="_blank" class="btn primary-btn glow-effect">Register Mission</a>
```

*(Note: adding `target="_blank"` is good practice so your website stays open in the background)*
