# Profind Handover Pack (Non-Technical Owner)
username/email:Ojayak7@gmail.com

## What this is
This document shows how to use the site day-to-day and what to do if something breaks.

## Daily use (admin)
1) Open the website
2) Log in with your admin email + password
3) Go to **Dashboard**
4) Use these sections:
   - **My Listings**: create, edit, delete listings
   - **Inquiries**: view messages from customers and update status
   - **Messages**: chat with customers/agents
   - **Price Alerts**: view alerts set by users
   - **Admin Panel**: approve/reject listings, verify agents, manage users, view all inquiries/messages

## Create a listing
1) Dashboard -> **Create Listing**
2) Fill in property details
3) Upload photos
4) Publish

## Review inquiries
1) Dashboard -> **Inquiries**
2) Click a message
3) Mark as **Contacted** or **Closed**

## If something breaks
1) Refresh the page
2) Try again in a few minutes
3) If still broken, contact the developer

## Support contact
Name: __________________________
Phone/WhatsApp: _________________
Email: __________________________

---

# Technical notes (for developer)

## Local start
- Backend: `npm run server`
- Frontend: `npm run dev`

## Environment (.env)
- `MONGODB_URI`
- `JWT_SECRET`

## Admin access
Set user role to `admin` in the database:
```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

Use only direct DB role updates for initial admin bootstrap.
