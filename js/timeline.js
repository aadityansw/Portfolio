/**
 * ProjectTimeline - Horizontal Pinned Scroll Engine powered by GSAP & ScrollTrigger
 * 
 * Creates a pinned horizontal timeline slider where scrolling advances
 * the track sideways, drawing the central axis and animating vertical
 * milestone stems, dots, and text reveals.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ProjectTimeline = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function ensureGSAP(callback) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      callback();
      return;
    }

    // Load GSAP & ScrollTrigger dynamically if not already on page
    const loadScript = (src, onload) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = onload;
      document.head.appendChild(script);
    };

    if (typeof gsap === 'undefined') {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', () => {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', () => {
          gsap.registerPlugin(ScrollTrigger);
          callback();
        });
      });
    } else if (typeof ScrollTrigger === 'undefined') {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', () => {
        gsap.registerPlugin(ScrollTrigger);
        callback();
      });
    }
  }

  class ProjectTimeline {
    constructor(options = {}) {
      this.container = typeof options.container === 'string'
        ? document.querySelector(options.container)
        : options.container;

      if (!this.container) {
        throw new Error('ProjectTimeline: container element not found.');
      }

      this.title = options.title || 'Project Storyline';
      this.periodLabel = options.periodLabel || '2020 — 2026';
      this.imageUrl = options.imageUrl || 'img/apna-agenda.webp';
      this.imageAlt = options.imageAlt || this.title;
      this.activeColor = options.activeColor || '#ff5f00';
      this.backgroundColor = options.backgroundColor || '#FFFFFF';
      this.textColor = options.textColor || '#111111';
      this.mutedTextColor = options.mutedTextColor || '#666666';
      this.topItems = options.topItems || [];
      this.bottomItems = options.bottomItems || [];

      // Reduced motion check
      this.reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

      this.init();
    }

    init() {
      this.buildDOM();
      ensureGSAP(() => {
        this.setupAnimations();
      });
    }

    buildDOM() {
      this.container.classList.add('timeline-section');
      this.container.style.setProperty('--timeline-bg', this.backgroundColor);
      this.container.style.setProperty('--timeline-accent', this.activeColor);
      this.container.style.setProperty('--timeline-text', this.textColor);
      this.container.style.setProperty('--timeline-muted', this.mutedTextColor);

      // 1. Sticky viewport
      const viewport = document.createElement('div');
      viewport.className = 'timeline-sticky-viewport';

      // 2. Slider
      const slider = document.createElement('div');
      slider.className = 'timeline-slider';
      this.sliderEl = slider;

      // 3. Hero Card (Left)
      const heroCard = document.createElement('div');
      heroCard.className = 'timeline-hero-card';
      const img = document.createElement('img');
      img.src = this.imageUrl;
      img.alt = this.imageAlt;
      img.draggable = false;
      heroCard.appendChild(img);
      slider.appendChild(heroCard);

      // 4. Track Container
      const track = document.createElement('div');
      track.className = 'timeline-track-container';

      // Central Axis line
      const axis = document.createElement('div');
      axis.className = 'timeline-center-axis';
      axis.innerHTML = `
        <div class="timeline-axis-dot"></div>
        <div class="timeline-axis-line journey-line"></div>
        <div class="timeline-axis-dot"></div>
      `;
      track.appendChild(axis);

      // Top Row
      const topRow = document.createElement('div');
      topRow.className = 'timeline-top-row';
      topRow.innerHTML = `
        <div class="timeline-header-block">
          <h2 class="timeline-title">${this.title}</h2>
        </div>
        <div class="timeline-top-milestones">
          ${this.topItems.map((item) => `
            <div class="timeline-milestone top" data-id="${item.id}">
              <div class="timeline-stem-wrapper">
                <div class="timeline-stem-dot jd-${item.id}"></div>
                <div class="timeline-stem-line jl-${item.id}"></div>
              </div>
              <div class="timeline-milestone-content">
                <h4 class="timeline-milestone-date title-${item.id}">${item.year} ${item.month}</h4>
                <p class="timeline-milestone-text description-${item.id}">${item.content}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      track.appendChild(topRow);

      // Bottom Row
      const bottomRow = document.createElement('div');
      bottomRow.className = 'timeline-bottom-row';
      bottomRow.innerHTML = `
        <div class="timeline-period-block">
          <span class="timeline-period-label">${this.periodLabel}</span>
        </div>
        <div class="timeline-bottom-milestones">
          ${this.bottomItems.map((item) => `
            <div class="timeline-milestone bottom" data-id="${item.id}">
              <div class="timeline-stem-wrapper">
                <div class="timeline-stem-line jl-${item.id}"></div>
                <div class="timeline-stem-dot jd-${item.id}"></div>
              </div>
              <div class="timeline-milestone-content">
                <h4 class="timeline-milestone-date title-${item.id}">${item.year} ${item.month}</h4>
                <p class="timeline-milestone-text description-${item.id}">${item.content}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      track.appendChild(bottomRow);

      slider.appendChild(track);
      viewport.appendChild(slider);
      this.container.appendChild(viewport);
    }

    setupAnimations() {
      const isMobile = window.innerWidth < 600;
      const slidePercent = isMobile ? -58 : -65;
      const lineWidth = isMobile ? '70%' : '98%';

      // 1. Horizontal Track Scrubbing
      const trackTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: this.container,
          start: 'top top',
          end: isMobile ? '82% 50%' : '92% bottom',
          scrub: true,
          pin: false,
        },
        defaults: { ease: 'none' },
      });

      trackTimeline.fromTo(
        this.sliderEl,
        { xPercent: 0 },
        { xPercent: slidePercent }
      );

      // 2. Central Line Growth
      if (this.reducedMotion) {
        gsap.set(this.container.querySelectorAll('.journey-line'), { width: lineWidth });
      } else {
        gsap.to(this.container.querySelector('.journey-line'), {
          width: lineWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: this.container,
            start: isMobile ? 'top 30%' : 'top 25%',
            end: isMobile ? '80% 50%' : '92% bottom',
            scrub: true,
          },
        });
      }

      // Combine and sort milestones
      const allItems = [...this.topItems, ...this.bottomItems];
      const count = allItems.length;

      allItems.forEach((item, index) => {
        const lineEl = this.container.querySelector(`.jl-${item.id}`);
        const dotEl = this.container.querySelector(`.jd-${item.id}`);
        const titleEl = this.container.querySelector(`.title-${item.id}`);
        const descEl = this.container.querySelector(`.description-${item.id}`);

        if (this.reducedMotion) {
          if (lineEl) gsap.set(lineEl, { scaleY: 1 });
          if (dotEl) gsap.set(dotEl, { scale: 1 });
          if (titleEl) gsap.set(titleEl, { opacity: 1, y: 0 });
          if (descEl) gsap.set(descEl, { opacity: 1, y: 0 });
          return;
        }

        // Initialize state
        if (lineEl) gsap.set(lineEl, { scaleY: 0 });
        if (dotEl) gsap.set(dotEl, { scale: 0 });
        if (titleEl) gsap.set(titleEl, { opacity: 0, y: 40 });
        if (descEl) gsap.set(descEl, { opacity: 0, y: 40 });

        // Calculate scroll trigger boundaries
        const startPos = Math.round(8 + (index * 70) / count);
        const endPos = Math.round(startPos + 18);

        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: this.container,
            start: `${startPos}% 30%`,
            end: `${endPos}% 50%`,
            scrub: true,
          },
        });

        if (lineEl) {
          itemTl.to(lineEl, { scaleY: 1, duration: 0.4 });
        }
        if (dotEl) {
          itemTl.to(dotEl, { scale: 1, duration: 0.4 }, '<');
        }
        if (titleEl) {
          itemTl.to(titleEl, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
        }
        if (descEl) {
          itemTl.to(descEl, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '<0.1');
        }
      });

      // Refresh on window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);
    }
  }

  return ProjectTimeline;
});
