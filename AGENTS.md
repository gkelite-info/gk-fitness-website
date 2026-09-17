# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Strict Agent Guidelines
- **File Size Limit**: No file should exceed 300 lines of code.
- **Component Splitting**: Break down large components into smaller, reusable components to adhere to the file size limit and maintain clean architecture.
- **Full Responsiveness**: All screens must be fully responsive across all devices (mobiles, tablets, iPads, laptops, desktops). No overlapping or layout breaks.
- **No AI Comments**: Do not add ANY inline layout comments, section markers (e.g., `{/* Search Bar */}`), AI-generated comments like `// new component`, or HTML tags. Keep the code completely clean of these markers.
- **No Unnecessary React Imports**: Do not add `import React from 'react';` or `import { ReactNode } from 'react';` unless explicitly required. Rely on the new JSX transform.
- **Use Client Wisely**: Do not add `"use client";` to every component. Only use it when the component strictly requires client-side features (hooks, event listeners, etc.).
- **No Direct Supabase in UI**: Frontend `.tsx` files (components/pages) should not directly call the Supabase SDK. Instead, create helper functions or Server Actions in `api` or `actions` folders and call those helpers from the UI.
- **Reusable Components**: All reusable components (like Avatar, Buttons, Inputs, etc.) MUST be created in the `app/(screens)/components/reusable` folder. Do not create reusable components inline or in ad-hoc locations.
- Follow these rules strictly for all future development.
