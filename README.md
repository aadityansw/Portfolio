# Aaditya Narayan — Personal Portfolio

## 📝 To-Do

### 🔴 High Priority

* [ ] Adding Website in Website Section.
* [ ] Adding Updated Resume in Resume Section.
* [ ] Optimsing teh SEO of The Website.

### 🟡 Improvements


### 🟢 Final Polish

---

## 📌 Project Overview

This is a personal portfolio and resume website for **Aaditya Narayan**.

The website is designed to showcase personal information, professional experience, projects, and resume details in a clean portfolio format.

It is built as a lightweight static website using HTML and CSS, with custom fonts and image assets.

### Core Purpose

The project serves as:

* A personal portfolio
* An online professional profile
* A showcase for projects and work
* An online resume
* A central place to present professional information

---

## 🗂️ Project Structure

```text
.
├── about/
├── css/
├── fonts/
├── img/
├── Resume/
├── work/
├── aaditya_narayan_resume.pdf
├── humans.txt
├── index.html
└── README.md
```

### `about/`

Contains the files and resources related to the **About** section of the portfolio.

This section is intended to present personal information, background, skills, experience, and other relevant details.

### `css/`

Contains the website's CSS stylesheets.

These files control the visual appearance of the website, including:

* Layout
* Typography
* Colors
* Spacing
* Navigation
* Sections
* Responsive styling

### `fonts/`

Contains custom font files used throughout the website.

These fonts help maintain the project's intended typography and visual identity.

### `img/`

Contains images and other visual assets used by the portfolio.

Examples may include:

* Profile images
* Project images
* Background images
* Icons
* Other graphical assets

### `Resume/`

Contains resources related to the website's resume section.

This directory separates resume-related website content from the rest of the project.

### `work/`

Contains files and resources related to the **Work/Projects** section.

This is where portfolio projects and professional work are organized.

### `aaditya_narayan_resume.pdf`

The downloadable PDF version of Aaditya Narayan's resume.

It can be used as the primary downloadable resume from the portfolio.

### `humans.txt`

Contains information about the creator of the website.

### `index.html`

The main entry point of the website.

This file contains the primary HTML structure and provides access to the different sections of the portfolio.

### `README.md`

The project's documentation file.

It contains information about the project structure, purpose, and current development tasks.

---

## 🚀 How to Add More Projects

### 1. Adding a Project Card to the Grid (`index.html`)

Inside the `<div class="grid" id="projectGrid">` section, duplicate any project block and adjust your details:

```html
<a href="work/your-project/index.html" class="work-item" data-category="flutter">
  <div class="work-item-image">
    <img src="img/your-project.webp" alt="Project Name" loading="lazy">
  </div>
  <div class="work-item-info">
    <div class="work-item-tags">
      <span class="work-item-tag">Flutter</span>
      <span class="work-item-tag">Firebase</span>
    </div>
    <div class="work-item-company">Your Project Name</div>
    <div class="work-item-description">One sentence summary of your project</div>
    <div class="work-item-action">View Case Study &rarr;</div>
  </div>
</a>
```

- **Categories**: Set `data-category="flutter"`, `web`, `systems`, or `uiux`. Multiple categories can be space-separated (e.g. `flutter systems`).

### 2. Adding to the Project Archive & Index Table

Inside `<tbody id="archiveTableBody">`, duplicate any `<tr>` row:

```html
<tr data-search="keyword title stack context">
  <td><strong>2025</strong></td>
  <td>
    <span class="archive-project-name">Project Name</span>
    <span class="archive-mobile-sub">Flutter • Dart • Firebase</span>
  </td>
  <td class="hide-mobile">Company or Role</td>
  <td class="hide-mobile">
    <div class="archive-tags-cell">
      <span class="work-item-tag">Flutter</span>
      <span class="work-item-tag">Dart</span>
    </div>
  </td>
  <td><a href="URL" class="archive-link">View &nearr;</a></td>
</tr>
```

- **Search**: The `data-search` attribute allows instant real-time filtering as visitors type into the archive search bar.

---

## 🛠️ Technologies

The project currently uses a simple static web structure:

* **HTML5** — Website structure and semantic markup
* **CSS3** — Styling, CSS Grid, Geist font typography, responsive design
* **JavaScript** — Client-side category filtering, view mode switching, real-time search, clipboard toast
* **Custom Fonts** — Geist (Light, Regular, Medium, SemiBold)
* **Images** — WebP & optimized visual assets
* **PDF** — Downloadable resume

---

## 📂 Organization

The project follows a simple separation of responsibilities:

| Directory/File               | Responsibility           |
| ---------------------------- | ------------------------ |
| `index.html`                 | Main website & projects showcase |
| `about/`                     | About section            |
| `work/`                      | Projects and case studies|
| `Resume/`                    | Resume-related content   |
| `css/`                       | Styling                  |
| `fonts/`                     | Geist Typography         |
| `img/`                       | Images and visual assets |
| `aaditya_narayan_resume.pdf` | Downloadable resume      |
| `humans.txt`                 | Creator information      |
| `README.md`                  | Project documentation    |

---

## 👤 Author

**Aaditya Narayan**

Personal portfolio and professional website.

