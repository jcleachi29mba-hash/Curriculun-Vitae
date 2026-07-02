(function () {
  "use strict";

  const data = profileData;

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function renderHero() {
    setText("profile-name", data.name);
    setText("profile-title", data.title);
    setText("nav-name", data.name.split(" ")[0]);
    setText("footer-name", data.name);
    setText("footer-year", new Date().getFullYear());

    const tagline = document.getElementById("profile-tagline");
    if (tagline) tagline.textContent = `"${data.tagline}"`;

    const photo = document.getElementById("profile-photo");
    if (photo) {
      photo.src = data.photo;
      photo.alt = `Foto de ${data.name}`;
      photo.onerror = () => {
        photo.src = "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(data.name) +
          "&size=400&background=0ea5e9&color=fff&bold=true&format=svg";
      };
    }

    document.title = `${data.name} — Currículo Vitae`;

    const contactsEl = document.getElementById("profile-contacts");
    if (contactsEl) {
      contactsEl.innerHTML = data.contacts.map(c => {
        const inner = `<i class="fa-solid ${c.icon.startsWith("fa-") ? c.icon : "fa-solid " + c.icon}"></i><span>${c.value}</span>`;
        return c.href
          ? `<a href="${c.href}" class="contact-chip" target="_blank" rel="noopener noreferrer">${inner}</a>`
          : `<span class="contact-chip">${inner}</span>`;
      }).join("");
    }

    const skillsEl = document.getElementById("profile-skills");
    if (skillsEl) {
      skillsEl.innerHTML = data.skills.map(s =>
        `<span class="skill-tag"><i class="fa-solid fa-microchip"></i>${s}</span>`
      ).join("");
    }
  }

  function renderExperience() {
    const container = document.getElementById("experience-list");
    if (!container) return;

    container.innerHTML = data.experience.map((exp, i) => `
      <article class="timeline__item" style="--delay: ${i * 0.15}s">
        <div class="timeline__marker">
          <i class="${exp.icon}"></i>
        </div>
        <div class="timeline__card">
          <div class="timeline__header">
            <div>
              <h3 class="timeline__role">${exp.role}</h3>
              <p class="timeline__company">
                <i class="fa-solid fa-building"></i> ${exp.company}
              </p>
            </div>
            <div class="timeline__meta">
              <span class="timeline__period"><i class="fa-regular fa-calendar"></i> ${exp.period}</span>
              <span class="timeline__location"><i class="fa-solid fa-location-dot"></i> ${exp.location}</span>
            </div>
          </div>
          <ul class="timeline__highlights">
            ${exp.highlights.map(h => `<li><i class="fa-solid fa-check"></i>${h}</li>`).join("")}
          </ul>
        </div>
      </article>
    `).join("");
  }

  function renderEducation() {
    const container = document.getElementById("education-list");
    if (!container) return;

    container.innerHTML = data.education.map(edu => `
      <div class="edu-item">
        <h4 class="edu-item__degree">${edu.degree}</h4>
        <p class="edu-item__institution"><i class="fa-solid fa-landmark"></i> ${edu.institution}</p>
        <p class="edu-item__period"><i class="fa-regular fa-calendar"></i> ${edu.period}</p>
        <p class="edu-item__desc">${edu.description}</p>
      </div>
    `).join("");
  }

  function renderCourses() {
    const container = document.getElementById("courses-list");
    if (!container) return;

    container.innerHTML = data.courses.map(course => `
      <div class="course-item">
        <div class="course-item__badge"><i class="fa-solid fa-award"></i></div>
        <div>
          <h4 class="course-item__name">${course.name}</h4>
          <p class="course-item__meta">${course.issuer} · ${course.year}</p>
        </div>
      </div>
    `).join("");
  }

  function renderLanguages() {
    const container = document.getElementById("languages-list");
    if (!container) return;

    container.innerHTML = data.languages.map(lang => `
      <div class="lang-item">
        <div class="lang-item__header">
          <span class="lang-item__name"><i class="fa-solid fa-globe"></i> ${lang.name}</span>
          <span class="lang-item__level">${lang.level}</span>
        </div>
        <div class="lang-item__bar">
          <div class="lang-item__fill" style="width: ${lang.percent}%"></div>
        </div>
      </div>
    `).join("");
  }

  function renderFooter() {
    const container = document.getElementById("footer-social");
    if (!container) return;

    container.innerHTML = data.social.map(s =>
      `<a href="${s.href}" class="footer__link" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">
        <i class="${s.icon}"></i>
      </a>`
    ).join("");
  }

  function initNavbar() {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("nav-toggle");
    const links = document.querySelector(".navbar__links");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("navbar--scrolled", window.scrollY > 50);
    });

    toggle?.addEventListener("click", () => {
      links.classList.toggle("navbar__links--open");
      const icon = toggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    });

    document.querySelectorAll(".navbar__links a").forEach(link => {
      link.addEventListener("click", () => {
        links.classList.remove("navbar__links--open");
        const icon = toggle?.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".timeline__item, .card, .section__header").forEach(el => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }

  renderHero();
  renderExperience();
  renderEducation();
  renderCourses();
  renderLanguages();
  renderFooter();
  initNavbar();
  initScrollAnimations();
})();
