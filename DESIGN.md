# Design System Strategy: Kinetic Legacy

## 1. Overview & Creative North Star

The Creative North Star for this design system is **"Kinetic Legacy."**

This system is designed to move beyond the static nature of traditional sports templates. It balances the heavy, authoritative weight of classic athletic branding with a modern, editorial fluidity. We achieve this by rejecting rigid grid lines and "boxed" thinking. Instead, we use intentional asymmetry, overlapping elements, and high-contrast typography scales to create a sense of forward motion.

Every layout should feel like a captured moment of action—stable yet ready to move. This is achieved through the tension between the slab-serif weight of the display type and the airy, sophisticated layering of the UI containers.

## 2. Colors

Our palette is anchored by a deep, commanding navy and ignited by a vibrant, energetic yellow. The neutral scale is not "grey," but a series of cool, atmospheric blues that maintain the brand’s depth even in white space.

### Color Principles

- **The "No-Line" Rule:** We do not use 1px solid borders to define sections. To separate a hero from a feature section, use a shift from `surface` to `surface_container_low`. Boundaries are felt through tonal transitions, not drawn with lines.

- **Surface Hierarchy & Nesting:** Treat the UI as physical layers. A primary dashboard might sit on `surface`. A content card on that dashboard should use `surface_container_lowest` to "lift" it visually. For secondary content, use `surface_container_high` to create a "recessed" feel.

- **The "Glass & Gradient" Rule:** For floating elements or high-impact CTAs, use Glassmorphism. Apply `surface_container` with a 70-80% opacity and a `20px` backdrop-blur.

- **Signature Textures:** Use subtle linear gradients for primary backgrounds, transitioning from `primary` (#002c4d) to `primary_container` (#004371) at a 135-degree angle. This adds a "pro-stadium" shimmer that flat hex codes cannot replicate.

## 3. Typography

The typography system is a dialogue between two extremes: the technical precision of **Inter** and the heritage-inspired impact of **Bevan**.

- **Display (Bevan):** Used exclusively for high-impact headlines and "hero" moments. It conveys the strength and "Legacy" of the brand.

- **Headlines & Titles (Inter - Bold/Semi-Bold):** Inter provides the "Kinetic" technical feel. Large headlines should use tight letter-spacing (-0.02em) to feel cohesive and modern.

- **Body & Labels (Inter):** Focus on readability. Use `body-lg` for editorial introductions and `label-md` for technical stats or player data.

The hierarchy is intentionally dramatic. A `display-lg` headline should tower over `body-md` text, creating an "Editorial" look that prioritizes visual impact over uniform density.

## 4. Elevation & Depth

In this design system, depth is a product of light and layering, never "structural" lines.

- **Tonal Layering:** Avoid shadows for static elements. If a card needs to stand out, place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#e9eff5) background. This creates a soft, natural lift.

- **Ambient Shadows:** For interactive floating elements (e.g., a hovered player card), use a high-spread, low-opacity shadow.

- _Token:_ `box-shadow: 0 20px 40px rgba(0, 44, 77, 0.08);` (Note the navy tint in the shadow to maintain color harmony).

- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` at 15% opacity. It should be felt, not seen.

- **Glassmorphism:** Use for navigation bars and overlays. By blurring the `primary` background behind a semi-transparent surface, we maintain a sense of place while focusing the user's attention.

## 5. Components

### Buttons

- **Primary:** High-impact `secondary_container` (#ffbb00) background with `on_secondary_fixed` (#261900) text. Use `md` (0.375rem) roundedness.

- **Secondary:** `primary` background with `on_primary` text. This is for high-authority actions.

- **Tertiary (The "Ghost"):** No background. Use a `title-sm` Inter font with a small arrow icon. The "Kinetic" feel comes from a subtle underline that appears on hover.

### Cards & Sections

- **Layout:** Forbid the use of divider lines. Separate content using the `spacing-12` (3rem) scale or background color shifts.

- **Player Cards:** Use `xl` (0.75rem) roundedness. Use a `primary_container` gradient overlay on images to ensure text legibility.

- **Nesting:** Place `surface_container_highest` chips inside `surface_container_low` cards for a tactile, nested effect.

### Input Fields

- **Style:** Avoid the "box" look. Use a `surface_container_highest` background with a `none` border. On focus, transition to a `primary` "Ghost Border" (20% opacity).

### Chips

- **Action Chips:** Use `full` (9999px) roundedness with `surface_container_highest` and `on_surface_variant` text. They should feel like smooth, physical pebbles.

## 6. Do's and Don'ts

### Do:

- **Do** use asymmetrical margins (e.g., `spacing-24` on the left, `spacing-16` on the right) for editorial layouts.

- **Do** overlap elements. Let a player's head or a piece of equipment break the boundary of a container to create 3D depth.

- **Do** use the `tertiary` (#003131) accents for data-heavy sections to provide a "technical" relief from the navy/yellow brand colors.

### Don't:

- **Don't** use 1px black or grey borders. This immediately cheapens the "High-End" feel.

- **Don't** use default Inter tracking. Tighten the headlines for a more professional, "tight" athletic look.

- **Don't** use drop shadows on everything. Let tonal shifts (the Surface Hierarchy) do 90% of the work.

- **Don't** use standard "center-aligned" everything. Look for opportunities to align text to the left while imagery sits off-grid to the right.
