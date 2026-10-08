/**
 * WorksWheel - 3D Interactive Drum & Ring Wheel Component
 * 
 * Converted to pure Vanilla JavaScript & CSS for seamless static site integration.
 * At rest, items sit in a ring tangent to a circle. The first scroll/drag gesture
 * blows the ring open into a vertical 3D perspective drum that sweeps projects into view.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.WorksWheel = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // --- Geometry Constants ---
  const CARD_H = 0.38;
  const CARD_MAX_W = 0.34;
  const CARD_RATIO = 1.45;
  const STEP = 40;        // degrees between cards on the drum
  const DRUM = 2.22;      // drum radius, in card heights
  const LENS = 2.7;       // perspective distance
  const RING_R = 1.14;    // ring radius
  const BOW = 1.82;       // lateral curvature radius
  const TITLE_RATIO = 0.124;
  const INDEX_RATIO = 0.04;
  const CULL = 1.6;

  // --- Physics & Easing Constants ---
  const WHEEL_UNITS = 900;
  const DRAG_UNITS = 420;
  const SETTLE = 140;
  const EASE = 0.12;

  // --- Math Utilities ---
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rad = (deg) => (deg * Math.PI) / 180;
  const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

  function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
    return (
      `translateX(${m * bowAt(drumDeg, bow)}px)` +
      ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
      ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
    );
  }

  class WorksWheel {
    constructor(options = {}) {
      this.container = typeof options.container === 'string'
        ? document.querySelector(options.container)
        : options.container;

      if (!this.container) {
        throw new Error('WorksWheel: container element not found.');
      }

      this.items = options.items || [];
      this.label = options.label || "Works '26";
      this.action = options.action !== undefined ? options.action : "View Case Study &rarr;";
      this.showToolbar = options.showToolbar !== false;

      // Interaction State
      this.turn = 0;
      this.target = 0;
      this.active = 0;
      this.stage = { w: 0, h: 0 };
      this.metrics = {};
      this.isDragging = false;
      this.dragStartY = 0;
      this.dragDistance = 0;
      this.settleTimer = null;
      this.animationFrame = null;

      // Accessibility / reduced motion
      this.reducedMotion = false;
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion = motionQuery.matches;
      motionQuery.addEventListener('change', (e) => {
        this.reducedMotion = e.matches;
      });

      this.init();
    }

    init() {
      this.buildDOM();
      this.setupObservers();
      this.attachEvents();
      this.startLoop();
    }

    buildDOM() {
      this.container.innerHTML = '';
      this.container.classList.add('works-wheel-section');
      this.container.setAttribute('aria-label', this.label);

      // 1. Stage element
      this.stageEl = document.createElement('div');
      this.stageEl.className = 'works-wheel-stage';
      this.stageEl.tabIndex = 0;
      this.stageEl.setAttribute('role', 'listbox');
      this.stageEl.setAttribute('aria-label', this.label);

      // 2. Wheel track
      this.wheelTrack = document.createElement('div');
      this.wheelTrack.className = 'works-wheel-track';
      this.stageEl.appendChild(this.wheelTrack);

      // 3. Center rest label
      this.labelEl = document.createElement('div');
      this.labelEl.className = 'works-wheel-label';
      this.labelEl.textContent = this.label;
      this.container.appendChild(this.labelEl);

      // 4. Front card title display
      this.titleContainer = document.createElement('div');
      this.titleContainer.className = 'works-wheel-title-container';
      this.titleContainer.style.opacity = '0';
      this.titleEl = document.createElement('div');
      this.titleEl.className = 'works-wheel-title';
      this.descEl = document.createElement('div');
      this.descEl.className = 'works-wheel-desc';
      this.titleContainer.appendChild(this.titleEl);
      this.titleContainer.appendChild(this.descEl);
      this.container.appendChild(this.titleContainer);

      // 5. Index list
      this.indexEl = document.createElement('ol');
      this.indexEl.className = 'works-wheel-index';
      this.container.appendChild(this.indexEl);

      // 6. Optional Toolbar / hint
      if (this.showToolbar) {
        this.toolbarEl = document.createElement('div');
        this.toolbarEl.className = 'works-wheel-toolbar';
        this.toolbarEl.innerHTML = `
          <button type="button" class="works-wheel-nav-btn prev-btn" aria-label="Previous Project" title="Previous Project">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span class="works-wheel-hint">Scroll / Drag wheel</span>
          <button type="button" class="works-wheel-nav-btn next-btn" aria-label="Next Project" title="Next Project">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        `;
        this.container.appendChild(this.toolbarEl);
      }

      this.container.appendChild(this.stageEl);

      // Render cards & index buttons
      this.renderItems();
    }

    renderItems() {
      this.wheelTrack.innerHTML = '';
      this.indexEl.innerHTML = '';
      this.cardEls = [];
      this.indexBtns = [];

      const count = this.items.length;
      if (count === 0) return;

      this.items.forEach((item, i) => {
        // Card link or wrapper
        const card = document.createElement(item.href ? 'a' : 'div');
        card.id = `works-wheel-card-${i}`;
        card.className = 'works-wheel-card';
        card.setAttribute('role', 'option');
        card.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        if (item.href) {
          card.href = item.href;
          if (item.target) card.target = item.target;
        }

        // Inner face
        const face = document.createElement('span');
        face.className = 'works-wheel-card-face';

        // Image
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.loading = 'lazy';
        img.draggable = false;
        face.appendChild(img);

        // Optional category tag
        if (item.tag || item.category) {
          const tag = document.createElement('span');
          tag.className = 'works-wheel-card-tag';
          tag.textContent = item.tag || item.category;
          face.appendChild(tag);
        }

        // Action badge
        if (this.action && item.href) {
          const actionBadge = document.createElement('span');
          actionBadge.className = 'works-wheel-card-action';
          actionBadge.innerHTML = `
            <span>${this.action}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          `;
          face.appendChild(actionBadge);
        }

        card.appendChild(face);

        // Prevent accidental click when dragging
        card.addEventListener('click', (e) => {
          if (this.dragDistance > 6) {
            e.preventDefault();
            e.stopPropagation();
          }
        });

        this.wheelTrack.appendChild(card);
        this.cardEls.push(card);

        // Index listing item
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `works-wheel-index-btn ${i === 0 ? 'active' : ''}`;
        btn.textContent = item.title;
        btn.addEventListener('click', () => {
          this.to(i + 1);
        });
        li.appendChild(btn);
        this.indexEl.appendChild(li);
        this.indexBtns.push(btn);
      });

      this.updateMetrics();
    }

    updateMetrics() {
      const w = this.stageEl.clientWidth;
      const h = this.stageEl.clientHeight;
      if (!w || !h) return;

      this.stage = { w, h };
      const count = this.items.length;

      const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
      const cardH = cardW / CARD_RATIO;
      const drumR = cardH * DRUM;
      const ringR = cardH * RING_R;
      const ringScale = count
        ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
        : 1;

      this.metrics = {
        cardW,
        cardH,
        ringR,
        ringScale,
        drumR,
        bow: cardH * BOW,
        depth: cardH * LENS,
        titleSize: cardH * TITLE_RATIO,
        indexSize: cardH * INDEX_RATIO,
      };

      // Set perspective on stage
      this.stageEl.style.perspective = `${this.metrics.depth}px`;

      // Set dimensions on cards
      this.cardEls.forEach((card) => {
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;
        card.style.marginLeft = `${-cardW / 2}px`;
        card.style.marginTop = `${-cardH / 2}px`;
      });

      // Scale text dynamically
      if (this.labelEl) {
        this.labelEl.style.fontSize = `${Math.max(this.metrics.titleSize, 28)}px`;
      }
      if (this.titleEl) {
        this.titleEl.style.fontSize = `${Math.max(this.metrics.titleSize * 0.8, 22)}px`;
      }
      if (this.indexEl) {
        this.indexEl.style.fontSize = `${Math.max(this.metrics.indexSize, 12)}px`;
      }
    }

    setupObservers() {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateMetrics();
      });
      this.resizeObserver.observe(this.stageEl);
    }

    attachEvents() {
      // 1. Wheel scrolling
      this.onWheel = (e) => {
        const last = Math.max(this.items.length - 1, 0);
        const next = this.target + e.deltaY / WHEEL_UNITS;
        if (next > 0 && next < last + 1) {
          e.preventDefault();
        }
        this.to(next);
        clearTimeout(this.settleTimer);
        this.settleTimer = setTimeout(() => {
          this.to(Math.round(this.target));
        }, SETTLE);
      };
      this.stageEl.addEventListener('wheel', this.onWheel, { passive: false });

      // 2. Pointer Dragging
      this.onPointerDown = (e) => {
        this.isDragging = true;
        this.dragStartY = e.clientY;
        this.dragDistance = 0;
        this.stageEl.setPointerCapture(e.pointerId);
      };

      this.onPointerMove = (e) => {
        if (!this.isDragging) return;
        const delta = this.dragStartY - e.clientY;
        this.dragDistance += Math.abs(delta);
        this.to(this.target + delta / DRAG_UNITS);
        this.dragStartY = e.clientY;
      };

      this.onPointerUp = () => {
        this.isDragging = false;
        if (this.target > 1) {
          this.to(Math.round(this.target));
        }
      };

      this.stageEl.addEventListener('pointerdown', this.onPointerDown);
      this.stageEl.addEventListener('pointermove', this.onPointerMove);
      this.stageEl.addEventListener('pointerup', this.onPointerUp);
      this.stageEl.addEventListener('pointercancel', this.onPointerUp);

      // 3. Keyboard Navigation
      this.onKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          this.to(Math.round(this.target) + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          this.to(Math.round(this.target) - 1);
        }
      };
      this.stageEl.addEventListener('keydown', this.onKeyDown);

      // 4. Toolbar Controls
      if (this.toolbarEl) {
        const prevBtn = this.toolbarEl.querySelector('.prev-btn');
        const nextBtn = this.toolbarEl.querySelector('.next-btn');

        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            this.to(Math.max(Math.round(this.target) - 1, 0));
          });
        }
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            const last = Math.max(this.items.length - 1, 0);
            this.to(Math.min(Math.round(this.target) + 1, last + 1));
          });
        }
      }
    }

    to(next) {
      const last = Math.max(this.items.length - 1, 0);
      this.target = clamp(next, 0, last + 1);
    }

    startLoop() {
      const draw = () => {
        this.animationFrame = requestAnimationFrame(draw);
        const count = this.items.length;
        if (!count || !this.stage.h) return;

        const gap = this.target - this.turn;
        if (Math.abs(gap) < 0.0005) {
          this.turn = this.target;
        } else {
          this.turn += gap * (this.reducedMotion ? 1 : EASE);
        }

        const t = this.turn;
        const m = clamp(t, 0, 1);
        const pos = Math.max(0, t - 1);
        const { ringR, ringScale, drumR, bow } = this.metrics;

        // Pull drum backward so front face sits on picture plane
        if (this.wheelTrack) {
          this.wheelTrack.style.transform = `translateZ(${-m * drumR}px)`;
        }

        for (let i = 0; i < count; i++) {
          const d = i - pos;
          const drumDeg = d * STEP;
          const card = this.cardEls[i];
          if (card) {
            card.style.transform = place(
              d * (360 / count),
              drumDeg,
              ringR,
              drumR,
              bow,
              m
            );
            card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? '0' : '1';
            card.style.zIndex = Math.round(100 - Math.abs(d) * 2);
          }

          const face = card ? card.firstElementChild : null;
          if (face) {
            face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
          }
        }

        // Transition center label vs front card title
        if (this.labelEl) {
          this.labelEl.style.opacity = String(1 - m);
        }

        const last = Math.max(count - 1, 0);
        const near = clamp(Math.round(pos), 0, last);

        if (this.titleContainer) {
          this.titleContainer.style.opacity = String(m);
          const activeItem = this.items[near];
          if (activeItem) {
            this.titleEl.textContent = activeItem.title;
            this.descEl.textContent = activeItem.description || activeItem.tag || '';
          }
        }

        if (this.active !== near) {
          this.active = near;
          this.indexBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === near);
          });
          this.cardEls.forEach((card, idx) => {
            card.setAttribute('aria-selected', idx === near ? 'true' : 'false');
          });
        }
      };

      this.animationFrame = requestAnimationFrame(draw);
    }

    setItems(newItems) {
      this.items = newItems || [];
      this.turn = 0;
      this.target = 0;
      this.active = 0;
      this.renderItems();
    }

    destroy() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      clearTimeout(this.settleTimer);
      this.container.innerHTML = '';
    }
  }

  return WorksWheel;
});
