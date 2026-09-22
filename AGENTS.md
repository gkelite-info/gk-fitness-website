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
- **SaaS Responsive Design**: All UI components must follow strict production-ready SaaS responsive patterns:
  - **Mobiles (`<768px`)**: Stack elements vertically (1 column). Forms and inputs must be `w-full`. Action buttons must stack vertically (`flex-col`) if there are multiple, or be full-width. Use `whitespace-nowrap` for labels to prevent weird text wrapping, and `text-right` or `break-words` for dynamic values. Avatars/icons in headers should center align. Use horizontal scrolling (`overflow-x-auto`) for complex tables instead of squishing them. Modal max-heights should safely avoid edges (e.g., `max-h-[85vh]`).
  - **Tablets/iPads (`md: 768px - 1024px`)**: Use 2-column grids (`grid-cols-2`) for KPI cards or dashboards. Use `flex-row` and `justify-between` for toolbars, headers, and action buttons. Modals should have generous padding.
  - **Laptops/Desktops (`lg: 1024px` and `xl: 1280px+`)**: Use 3-column or 4-column grids (`grid-cols-3`, `grid-cols-4`) for KPI cards. Utilize full horizontal layouts. Side-by-side split panels (e.g., charts on left, lists on right) should use a flex layout like `flex-[2]` for main content and `flex-1` for sidebars. **Avoid stretched components and oversized fonts**: Do not scale up font sizes excessively (e.g., avoid `text-[56px]` or huge paddings) just because the screen is larger. Maintain standard SaaS typography (e.g., max `text-3xl` or `text-4xl` for key numbers, `text-sm`/`text-base` for standard content) and constrain maximum widths for readability (e.g., `max-w-5xl` or using multi-column grid layouts for details pages instead of single massive columns).
  - **Global Rules**: NEVER use inline fonts (`font-['Inter']`). NEVER allow elements to overlap or spill out of their containers. Always enforce a safe `gap` between flex items. Use `shrink-0` on critical icons/labels to prevent squishing. Ensure all text respects the global font definitions.
- Follow these rules strictly for all future development.
