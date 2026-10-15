# Rodriguez Verse Portfolio

A responsive, fantasy-RPG-inspired personal portfolio for **Melchor John D. Rodriguez**. The site is built with plain HTML5, CSS3, vanilla JavaScript, and local SVG source files. It does not require a framework, package installation, backend, or externally hosted artwork.

The **RV**, **ADP**, and **MJ** images are local files that you provide. The RV image is displayed as a circle inside the homepage gateway portal.

## Run the Website

1. Open your existing **Rodriguez Verse** project folder in VS Code.
2. Open `index.html` in a browser. For smoother local development, use the VS Code **Live Server** extension if it is already installed. No project dependencies need to be installed.
3. To publish with GitHub Pages, upload the project files to the root of the repository you want to publish. In the repository's **Settings → Pages**, choose the correct branch and `/ (root)` as the publishing folder.

## Project Structure

Your complete project should have a structure similar to this:

```text
rodriguez-verse/
├── index.html                  # Page sections and profile content
├── README.md                   # Setup and customization instructions
├── css/
│   └── style.css               # Theme, layout, responsive rules, and effects
├── js/
│   └── main.js                 # Navigation, dragon roster, project data, and form
└── assets/
    ├── dragons/                # Local dragon SVG illustrations
    │   ├── dragon-black.svg
    │   ├── dragon-blue.svg
    │   ├── dragon-gray.svg
    │   ├── dragon-green.svg
    │   ├── dragon-pink.svg
    │   ├── dragon-red.svg
    │   └── dragon-yellow.svg
    ├── icons/
    │   └── favicon.svg
    └── images/                 # Your personal images
        ├── RV.jpg
        ├── ADP.jpg
        └── MJ.jpg
```

**Important:** The updated code package provides the revised HTML, CSS, and JavaScript. Keep the existing `assets/dragons/` and `assets/icons/` folders from your current project when replacing those files. The personal image files are not bundled; place your own copies in `assets/images/`.

## Personal Images

Save your images in `assets/images/` using these exact names, including capitalization and file extensions:

| Filename | Where it appears |
| --- | --- |
| `RV.jpg` | Homepage gateway, cropped to a circle with a glowing portal ring |
| `ADP.jpg` | Photo in the Adventurer Profile card |
| `MJ.jpg` | Image in the “Curiosity · Craft · Code” section |

If an image has a different filename, either rename it to match or update its `src` path in `index.html`. For example, if the third image is named `M MJ.jpg`, change `src="assets/images/MJ.jpg"` to `src="assets/images/M%20MJ.jpg"` or rename the file to `MJ.jpg`.

The website uses these files locally. It does not generate or download replacement images, and it does not use external image URLs.

## What Is Included

- A short, skippable magical-portal introduction.
- Responsive fantasy navigation, active section indicators, and an accessible mobile menu.
- A homepage gateway with your circular RV image, decorative stars, portal rings, and local SVG dragon companions elsewhere in the page.
- A portfolio dashboard, biography, skills cards, and an academic project quest log rendered from JavaScript data.
- Seven selectable dragon companions with distinct palettes, personalities, aura colors, and local illustrations.
- CSS-built hobby illustrations for basketball, anime, adventure, and gaming.
- Email and GitHub links, a copy-email control, and a contact form that validates input before preparing a message in the visitor's email application.
- Responsive layouts, keyboard focus styles, semantic landmarks, and reduced-motion support.

## Customize the Site

### Personal Information and Copy

Edit the relevant text in `index.html`, including the name, degree, academic details, and page copy. Review the email and GitHub links in the contact section and footer before publishing. The matching email and GitHub constants are near the top of `js/main.js`.

### Colors and Layout

Change the CSS custom properties at the top of `css/style.css`, such as `--bg`, `--cyan`, `--violet`, and `--content`. Section styles, responsive breakpoints, and the circular personal-image styling are grouped under descriptive comments. To adjust how the RV image is cropped inside its circle, edit `object-position` in the `.hero-feature-image` rule.

### Add a Project

In `js/main.js`, add another object to the `projects` array near the top. Follow the existing structure for `title`, `category`, `label`, `description`, `role`, `details`, and `action`. Use accurate project details, and only add links that are real and verified.

### Edit or Replace a Dragon

Each dragon has its own SVG file in `assets/dragons/`. Edit the SVG shapes and colors directly, or add another SVG file and update the `dragons` array in `js/main.js`. Each dragon record includes properties such as `id`, `name`, `color`, `element`, `trait`, `file`, `summary`, and `personality`. The roster supports keyboard interaction, including Tab, Enter, Space, arrow keys, Home, and End.

### Contact Form Behavior

The form validates the name, email address, and message in the browser, then creates a `mailto:` link. Because this is a static site without a backend, it does **not** send a message to a server or claim that a message was delivered. The visitor must review and send the prepared draft from their email application. Some devices may not have a default email application configured.

## Performance Notes

Decorative effects are designed to keep scrolling responsive. The full-screen SVG turbulence texture and expensive backdrop blurs are removed, star layers remain still instead of repainting continuously, floating elements use transform-based animation where appropriate, and pointer/scroll updates are throttled to animation frames. Some rotating decorations are reduced on smaller screens, and decorative animations pause while the browser tab is hidden.

## Accessibility and Implementation Notes

- The page includes semantic headings and landmarks, a skip link, labelled form fields, live validation feedback, keyboard-accessible dragon controls, visible focus indicators, and reduced-motion styles.
- The portal, fantasy effects, hobby illustrations, and dragon art use local HTML, CSS, and SVG source. Your three personal images are separate local files in `assets/images/`.
- This is a client-side static website. It has no backend or admin login, and the contact form does not send data to a server.
