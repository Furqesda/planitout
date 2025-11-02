### PlanItout  

Discover & Host Local Events – Cinematic, Modern, Full-Stack Web App

## Project info

**URL**: https://lovable.dev/projects/dafa7ced-38ce-4733-8856-a1c4db2f48ef

## Project Overview

PlanItout is a cinematic, modern web application that helps people discover local events, create their own experiences, and connect with others who share their vibe. The app features a premium interface with smooth animations, glassmorphism, and a cohesive, launch-ready aesthetic.


### Key Features

Explore Events: Browse local events with thumbnails, details, distance, and participants info.

Event Details Modal: View full event info, including location, date, host, and attendees.

Attend Event Flow: Mark events as attending, tracked via localStorage.

Host Event Dashboard: Create, edit, and delete your own events stored in Supabase.

Mock Authentication: Log in with any credentials (localStorage-based).

Onboarding Cards: Playful tips for first-time users on Explore and Host pages.

Smooth UI/UX: Parallax hero scroll, fade-in animations, gentle motion effects, mobile-responsive.

Search & Filter: Search events by title, city/location, and date range.

Distance Calculation: Computes distance from user location (or random 1–9 km fallback).

**Tech Stack**

Frontend: React, TypeScript, Tailwind CSS, shadcn-ui, Vite

Backend / Database: Supabase (events CRUD)

Mapping: Leaflet (for Local Magic map explorer)

State Management: React hooks + localStorage

Deployment: Lovable

**Setup Instructions**

Clone the repository:

git clone https://github.com/Furqesda/planitout.git
cd planitout
Install dependencies:
npm install
Start the development server:
npm run dev
Open your browser at http://localhost:5173 (or as prompted).
Environment Variables

Create a .env file or use .env.example for local development:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

**API / Database Notes**

Supabase table events structure:
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "location": "string",
  "date": "string",
  "maxParticipants": "number",
  "currentParticipants": "number",
  "imageUrl": "string",
  "hostEmail": "string"
}
Events can be created, edited, and deleted by the logged-in user.

Explore Events fetches both preloaded sample events and Supabase events.

**Challenges & Solutions**

Smooth parallax & scroll animations: Implemented with React + Tailwind transitions to avoid jank on mobile.

Event attendance tracking: Used localStorage for quick, client-side state management.

Mock authentication: Allowed any credentials, ensuring seamless onboarding without real auth.

Mobile responsiveness: Added a hamburger menu, scaled typography, and ensured hero animations work across screen sizes.

**AI Tools Used**

ChatGPT: Guided architecture, prompts for UI/UX improvements, and code examples

GitHub Copilot: Assisted with component creation and repetitive code

Cursor AI / Warp AI: Helped accelerate front-end development and layout tweaks

**Deployed Link: http://planitout.lovable.app/**
