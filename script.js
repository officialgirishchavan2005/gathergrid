/**
 * GATHERGRID — Interactive Community Events Discovery (Static Demo)
 * Pure Vanilla JavaScript (no external dependencies or backend).
 */

(() => {
  'use strict';

  const STORAGE_KEY = 'gathergrid_saved_events';
  const TODAY_ISO = '2026-11-25';

  /**
   * 16 Fictional Demonstration Events
   */
  const EVENTS = [
    {
      id: 'evt-01',
      title: 'Midnight Synth & Modular Jam',
      category: 'Music',
      date: '2026-11-27',
      time: '20:30 – 23:30',
      venue: 'Substation B, Canal District',
      price: 18,
      host: 'Patchwork Sound Collective',
      capacity: 'In-person · 45 spots',
      description:
        'An open-table modular synthesizer showcase and live quadraphonic jam. Bring headphones to audition patches or grab a seat on the velvet floor cushions while local electronic artists build generative loops from scratch.',
      tags: ['Live Electronics', 'Patch Cables Provided', 'Late Night'],
      collections: ['creative-minds', 'learn-new'],
      image: 'assets/event-synth.svg'
    },
    {
      id: 'evt-02',
      title: 'Hand-Built Ceramic Vessels',
      category: 'Art & Design',
      date: '2026-11-28',
      time: '10:30 – 13:30',
      venue: 'Kiln & Kind Studio, North Loop',
      price: 35,
      host: 'Mira Solis & Studio Assistants',
      capacity: 'Workshop · 14 seats',
      description:
        'Learn coil and slab-building techniques to sculpt two stoneware vessels without a pottery wheel. All clay, underglazes, and kiln firing are included; finished pieces are ready for pickup two weeks later.',
      tags: ['Beginner Friendly', 'Materials Included', 'Small Group'],
      collections: ['this-weekend', 'creative-minds', 'learn-new'],
      image: 'assets/event-ceramics.svg'
    },
    {
      id: 'evt-03',
      title: 'Local-First Web & Tiny Tools Hacknight',
      category: 'Technology',
      date: '2026-11-26',
      time: '18:30 – 21:30',
      venue: 'Foundry Commons, Suite 400',
      price: 0,
      host: 'Neighborhood Web Guild',
      capacity: 'Meetup · 60 spots',
      description:
        'A relaxed evening of five-minute lightning demos and co-working around offline-capable web apps, personal wikis, and single-file utilities. Sparkling tea and warm pretzels on the house.',
      tags: ['Lightning Talks', 'Open Source', 'Zero Frameworks'],
      collections: ['free-community', 'learn-new'],
      image: 'assets/event-hacknight.svg'
    },
    {
      id: 'evt-04',
      title: 'Saturday Sunrise Rooftop Run & Espresso',
      category: 'Fitness',
      date: '2026-11-28',
      time: '07:30 – 09:30',
      venue: 'Skyline Deck, Harborview',
      price: 0,
      host: 'Harbor Striders Club',
      capacity: 'Social Run · Open',
      description:
        'Meet for an easy-pace 5K harbor loop followed by rooftop stretching and batch-brewed espresso overlooking the water. All paces welcome with a dedicated no-drop walk/jog group.',
      tags: ['All Paces', '5K Loop', 'Free Coffee'],
      collections: ['this-weekend', 'free-community'],
      image: 'assets/event-rooftop-run.svg'
    },
    {
      id: 'evt-05',
      title: 'Fermentation Lab: Wild Kimchi & Kraut',
      category: 'Food',
      date: '2026-11-29',
      time: '14:00 – 16:30',
      venue: 'Salt & Starter Kitchen, Elm Row',
      price: 28,
      host: 'Chef Jun Park',
      capacity: 'Kitchen Lab · 16 seats',
      description:
        'Dive into lacto-fermentation ratios, seasonal spice pastes, and jar troubleshooting. Every participant goes home with two weighted glass crocks ready to bubble on the kitchen counter.',
      tags: ['Take-Home Jars', 'Plant-Forward', 'Tasting Flight'],
      collections: ['this-weekend', 'learn-new'],
      image: 'assets/event-fermentation.svg'
    },
    {
      id: 'evt-06',
      title: 'Bootstrapped Founders & Indie Makers Breakfast',
      category: 'Business',
      date: '2026-12-01',
      time: '08:30 – 10:30',
      venue: 'Paperplane Café, Midtown',
      price: 15,
      host: 'Calm Ledger Circle',
      capacity: 'Roundtable · 24 seats',
      description:
        'Skip the pitch decks and talk real numbers over cardamom buns and filter coffee. Structured peer tables for solo builders, micro-studios, and neighborhood shop owners.',
      tags: ['Peer Roundtable', 'Breakfast Included', 'No Pitching'],
      collections: ['learn-new'],
      image: 'assets/event-founders.svg'
    },
    {
      id: 'evt-07',
      title: 'Neighborhood Zine Swap & Risograph Open House',
      category: 'Art & Design',
      date: '2026-11-29',
      time: '12:00 – 17:00',
      venue: 'Presshouse Annex, Arts Quarter',
      price: 0,
      host: 'Ink & Drum Print Co-op',
      capacity: 'Open House · Drop-in',
      description:
        'Browse 40+ independent micro-zines, watch live two-color Soy-ink Risograph printing demos on the hour, and trade your own folded mini-booklets at the community swap table.',
      tags: ['Printmaking', 'Drop-In', 'Zine Library'],
      collections: ['this-weekend', 'creative-minds', 'free-community'],
      image: 'assets/event-risograph.svg'
    },
    {
      id: 'evt-08',
      title: 'Winter Courtyard Lantern Walk & Swap',
      category: 'Community',
      date: '2026-11-28',
      time: '17:30 – 20:00',
      venue: 'Maple Square Courtyard',
      price: 0,
      host: 'Maple Block Stewards',
      capacity: 'Neighborhood · Open',
      description:
        'An early-evening lantern stroll through Maple Square followed by a coat, book, and houseplant cutting swap under string lights. Warm spiced cider served from thermoses.',
      tags: ['Family Friendly', 'Book & Plant Swap', 'Outdoor'],
      collections: ['this-weekend', 'free-community'],
      image: 'assets/event-lanterns.svg'
    },
    {
      id: 'evt-09',
      title: 'Creative Coding with Shaders & Sound',
      category: 'Technology',
      date: '2026-12-03',
      time: '19:00 – 21:30',
      venue: 'Signal Lab, Docklands',
      price: 22,
      host: 'Amina Rao',
      capacity: 'Hands-on · 22 seats',
      description:
        'Write your first audio-reactive GLSL fragment shader in the browser using real-time microphone input. Bring a laptop; starter templates and math cheat-sheets provided.',
      tags: ['GLSL Shaders', 'Bring Laptop', 'Audio-Reactive'],
      collections: ['creative-minds', 'learn-new'],
      image: 'assets/event-shaders.svg'
    },
    {
      id: 'evt-10',
      title: 'Candlelit Vinyl Listening Session: Ambient & Jazz',
      category: 'Music',
      date: '2026-12-04',
      time: '20:00 – 22:30',
      venue: 'Velvet Grooves Loft, Old Town',
      price: 14,
      host: 'Deep Listening Society',
      capacity: 'Listening Room · 32 seats',
      description:
        'Phones tucked away, custom horn speakers turned warm. Tonight we play two full sides of 1970s Japanese ambient jazz and contemporary electro-acoustic pressings uninterrupted.',
      tags: ['Phone-Free Hour', 'Hi-Fi Audio', 'Herbal Tea'],
      collections: ['creative-minds'],
      image: 'assets/event-vinyl.svg'
    },
    {
      id: 'evt-11',
      title: 'Urban Sketching & Architectural Ink Walk',
      category: 'Art & Design',
      date: '2026-12-05',
      time: '10:00 – 12:30',
      venue: 'Civic Conservatory Steps',
      price: 0,
      host: 'Linework Rovers',
      capacity: 'Walking Sketch · 30 spots',
      description:
        'Meet at the conservatory steps for three 25-minute observational drawing stops along historic ironwork facades. Any sketchbook and pen works — zero formal art training needed.',
      tags: ['Outdoor Walk', 'All Skill Levels', 'Sketchbook Share'],
      collections: ['creative-minds', 'free-community', 'learn-new'],
      image: 'assets/event-sketching.svg'
    },
    {
      id: 'evt-12',
      title: 'Mobility, Breathwork & Cold Plunge Social',
      category: 'Fitness',
      date: '2026-12-06',
      time: '09:00 – 11:30',
      venue: 'Bathhouse Nine, Pier 4',
      price: 24,
      host: 'Tidepool Movement',
      capacity: 'Wellness · 18 spots',
      description:
        'Forty-five minutes of guided joint mobility and nasal breathwork followed by optional three-minute cold plunges, cedar sauna rounds, and electrolyte tonic.',
      tags: ['Sauna & Plunge', 'Guided Breathwork', 'Sunday Reset'],
      collections: ['learn-new'],
      image: 'assets/event-breathwork.svg'
    },
    {
      id: 'evt-13',
      title: 'Storytelling for Ethical Brands Workshop',
      category: 'Business',
      date: '2026-12-08',
      time: '18:00 – 20:30',
      venue: 'Mercantile Studio, Floor 3',
      price: 30,
      host: 'Kora Editorial',
      capacity: 'Workshop · 20 seats',
      description:
        'Craft clear, jargon-free narrative messaging for community-minded products and cultural organizations. Leave with a crisp one-page voice guide and live peer critique.',
      tags: ['Editorial Strategy', 'Live Critique', 'Workbook Included'],
      collections: ['learn-new'],
      image: 'assets/event-storytelling.svg'
    },
    {
      id: 'evt-14',
      title: 'Late-Night Dumpling Folding & Tea Pairing',
      category: 'Food',
      date: '2026-12-10',
      time: '19:30 – 22:00',
      venue: 'Lantern Noodle Collective',
      price: 38,
      host: 'Lin & Mei Kitchen',
      capacity: 'Supper Workshop · 14 seats',
      description:
        'Roll dough from scratch, master three classic pleat patterns with ginger-mushroom and chili-pork fillings, and feast together alongside roasted oolong pairings.',
      tags: ['Dinner Included', 'Hands-On', 'Tea Pairing'],
      collections: ['learn-new'],
      image: 'assets/event-dumplings.svg'
    },
    {
      id: 'evt-15',
      title: 'Repair Café: Fix Electronics, Bikes & Textiles',
      category: 'Community',
      date: '2026-12-12',
      time: '11:00 – 15:00',
      venue: 'Cedar Hall Community Hub',
      price: 0,
      host: 'Fix-It Volunteers Network',
      capacity: 'Drop-in · Open',
      description:
        'Bring a wobbly lamp, torn jacket, or squeaky commuter bike and learn to repair it side-by-side with volunteer tinkerers, solderers, and menders.',
      tags: ['Sustainability', 'Skill Sharing', 'Tools Provided'],
      collections: ['free-community', 'learn-new'],
      image: 'assets/event-repair.svg'
    },
    {
      id: 'evt-16',
      title: 'Open Hardware & E-Ink Dashboard Build',
      category: 'Technology',
      date: '2026-12-15',
      time: '18:30 – 21:00',
      venue: 'Sparkbench Makerspace',
      price: 20,
      host: 'Low-Power Lab',
      capacity: 'Build Night · 16 seats',
      description:
        'Assemble and flash an open-source ESP32 e-ink desk display that tracks transit arrivals and neighborhood events without glowing screens. Demo boards lent for the evening.',
      tags: ['Microcontrollers', 'E-Ink', 'Solder-Free'],
      collections: ['learn-new'],
      image: 'assets/event-hardware.svg'
    }
  ];

  const COLLECTION_LABELS = {
    'this-weekend': 'This Weekend',
    'creative-minds': 'Creative Minds',
    'free-community': 'Free Community Events',
    'learn-new': 'Learn Something New'
  };

  const HERO_COLLAGE_IDS = ['evt-02', 'evt-01', 'evt-04', 'evt-07'];

  // Application State
  const state = {
    search: '',
    category: 'All',
    dateRange: 'all',
    selectedCalendarDate: null,
    price: 'all',
    sort: 'date-asc',
    collection: null,
    calendarYear: 2026,
    calendarMonth: 10, // 0-indexed: 10 = November 2026
    savedIds: loadSavedIds(),
    activeModalEventId: null
  };

  // DOM References
  const dom = {
    headerSearchInput: document.getElementById('header-search-input'),
    headerSearchForm: document.getElementById('header-search-form'),
    heroSearchInput: document.getElementById('hero-search-input'),
    heroSearchForm: document.getElementById('hero-search-form'),
    discoverySearchInput: document.getElementById('discovery-search-input'),
    mobileSearchInput: document.getElementById('mobile-search-input'),
    mobileSearchForm: document.getElementById('mobile-search-form'),

    dateSelect: document.getElementById('date-filter-select'),
    priceSelect: document.getElementById('price-filter-select'),
    sortSelect: document.getElementById('sort-select'),
    categoryPills: document.querySelectorAll('.category-pill'),
    quickTags: document.querySelectorAll('.quick-tag'),

    collectionCards: document.querySelectorAll('.collection-card'),
    clearCollectionBtn: document.getElementById('clear-collection-btn'),

    activeFiltersBar: document.getElementById('active-filters-bar'),
    activeFilterChips: document.getElementById('active-filter-chips'),
    resetFiltersInline: document.getElementById('reset-filters-inline'),
    emptyResetBtn: document.getElementById('empty-reset-btn'),

    resultsSummary: document.getElementById('results-summary'),
    eventsGrid: document.getElementById('events-grid'),
    emptyState: document.getElementById('empty-state'),
    heroCollageCards: document.getElementById('hero-collage-cards'),

    calPrevBtn: document.getElementById('cal-prev-btn'),
    calNextBtn: document.getElementById('cal-next-btn'),
    calMonthLabel: document.getElementById('cal-month-label'),
    calGrid: document.getElementById('calendar-grid'),
    calClearDateBtn: document.getElementById('cal-clear-date-btn'),
    agendaKicker: document.getElementById('agenda-kicker'),
    agendaTitle: document.getElementById('agenda-title'),
    agendaSubtitle: document.getElementById('agenda-subtitle'),
    agendaList: document.getElementById('agenda-list'),

    headerSavedBtn: document.getElementById('header-saved-btn'),
    mobileSavedBtn: document.getElementById('mobile-saved-btn'),
    footerSavedBtn: document.getElementById('footer-saved-btn'),
    headerSavedCount: document.getElementById('header-saved-count'),
    mobileSavedCount: document.getElementById('mobile-saved-count'),

    eventModalBackdrop: document.getElementById('event-modal-backdrop'),
    eventModal: document.getElementById('event-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalSecondaryClose: document.getElementById('modal-secondary-close'),
    modalSaveBtn: document.getElementById('modal-save-btn'),
    modalSaveLabel: document.getElementById('modal-save-label'),
    modalImg: document.getElementById('modal-event-image'),
    modalCategory: document.getElementById('modal-event-category'),
    modalDate: document.getElementById('modal-event-date'),
    modalPrice: document.getElementById('modal-event-price'),
    modalTitle: document.getElementById('modal-event-title'),
    modalHost: document.getElementById('modal-event-host'),
    modalTime: document.getElementById('modal-event-time'),
    modalVenue: document.getElementById('modal-event-venue'),
    modalCapacity: document.getElementById('modal-event-capacity'),
    modalDesc: document.getElementById('modal-event-description'),
    modalTags: document.getElementById('modal-event-tags'),

    savedDrawerBackdrop: document.getElementById('saved-drawer-backdrop'),
    savedDrawer: document.getElementById('saved-drawer'),
    savedDrawerClose: document.getElementById('saved-drawer-close'),
    savedDrawerList: document.getElementById('saved-drawer-list'),
    savedDrawerFooter: document.getElementById('saved-drawer-footer'),
    clearAllSavedBtn: document.getElementById('clear-all-saved-btn'),

    mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
    mobileNavBackdrop: document.getElementById('mobile-nav-backdrop'),
    mobileNavDrawer: document.getElementById('mobile-nav-drawer'),
    mobileNavClose: document.getElementById('mobile-nav-close'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-link[href]'),

    hostForm: document.getElementById('host-event-form'),
    hostConfirmation: document.getElementById('host-demo-confirmation'),
    confEventTitle: document.getElementById('conf-event-title'),
    confEventSummary: document.getElementById('conf-event-summary'),
    hostResetDemoBtn: document.getElementById('host-reset-demo-btn'),

    newsletterForm: document.getElementById('newsletter-form'),
    newsletterEmail: document.getElementById('newsletter-email'),
    newsletterError: document.getElementById('newsletter-error'),
    newsletterSuccess: document.getElementById('newsletter-success'),

    toastRegion: document.getElementById('toast-region')
  };

  // Focus restoration tracking for accessible dialogs
  let activeDialog = null;
  let lastFocusedTrigger = null;

  /* ========================================================================
     UTILITIES
     ======================================================================== */
  function loadSavedIds() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((id) => EVENTS.some((e) => e.id === id)) : [];
    } catch {
      return [];
    }
  }

  function persistSavedIds() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedIds));
    } catch {
      // Ignore storage quota / private mode restrictions gracefully
    }
  }

  function formatDateDisplay(isoDate) {
    const [year, month, day] = isoDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  function formatLongDate(isoDate) {
    const [year, month, day] = isoDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function formatPrice(price) {
    return price === 0 ? 'Free' : `$${price}`;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    dom.toastRegion.appendChild(toast);
    window.setTimeout(() => {
      toast.remove();
    }, 2600);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /* ========================================================================
     FILTERING & SORTING
     ======================================================================== */
  function matchesDateRange(eventDate, range) {
    switch (range) {
      case 'this-weekend':
        return eventDate === '2026-11-28' || eventDate === '2026-11-29';
      case 'this-week':
        return eventDate >= '2026-11-25' && eventDate <= '2026-11-30';
      case 'next-week':
        return eventDate >= '2026-12-01' && eventDate <= '2026-12-07';
      case 'december':
        return eventDate.startsWith('2026-12-');
      default:
        return true;
    }
  }

  function getFilteredEvents() {
    const query = state.search.trim().toLowerCase();

    const filtered = EVENTS.filter((ev) => {
      if (state.category !== 'All' && ev.category !== state.category) {
        return false;
      }

      if (state.collection && !ev.collections.includes(state.collection)) {
        return false;
      }

      if (state.price === 'free' && ev.price !== 0) {
        return false;
      }
      if (state.price === 'paid' && ev.price === 0) {
        return false;
      }

      if (state.selectedCalendarDate) {
        if (ev.date !== state.selectedCalendarDate) return false;
      } else if (!matchesDateRange(ev.date, state.dateRange)) {
        return false;
      }

      if (query) {
        const haystack = `${ev.title} ${ev.category} ${ev.venue} ${ev.host} ${ev.description} ${ev.price === 0 ? 'free' : ''}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (state.sort) {
        case 'date-desc':
          return b.date.localeCompare(a.date) || a.title.localeCompare(b.title);
        case 'price-asc':
          return a.price - b.price || a.date.localeCompare(b.date);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'date-asc':
        default:
          return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
      }
    });

    return filtered;
  }

  /* ========================================================================
     RENDERING
     ======================================================================== */
  function renderHeroCollage() {
    const items = HERO_COLLAGE_IDS.map((id) => EVENTS.find((e) => e.id === id)).filter(Boolean);
    dom.heroCollageCards.innerHTML = items
      .map(
        (ev) => `
      <button type="button" class="collage-card" data-open-modal="${ev.id}" aria-label="Open details for ${escapeHtml(ev.title)}">
        <img class="collage-card-img" src="${ev.image}" alt="${escapeHtml(ev.title)}">
        <div class="collage-card-body">
          <div class="collage-card-meta">
            <span>${escapeHtml(ev.category)}</span>
            <span>${formatDateDisplay(ev.date)}</span>
          </div>
          <h3 class="collage-card-title">${escapeHtml(ev.title)}</h3>
          <p class="collage-card-venue">${escapeHtml(ev.venue)}</p>
        </div>
      </button>
    `
      )
      .join('');
  }

  function renderCollectionCounts() {
    Object.keys(COLLECTION_LABELS).forEach((key) => {
      const count = EVENTS.filter((ev) => ev.collections.includes(key)).length;
      const badge = document.querySelector(`[data-collection-count="${key}"]`);
      if (badge) {
        badge.textContent = `${count} events`;
      }
    });
  }

  function renderCollectionsState() {
    dom.collectionCards.forEach((card) => {
      const isMatch = card.dataset.collectionId === state.collection;
      card.classList.toggle('is-active', isMatch);
      card.setAttribute('aria-pressed', String(isMatch));
    });
    dom.clearCollectionBtn.hidden = !state.collection;
  }

  function renderActiveFilterChips() {
    const chips = [];

    if (state.search.trim()) {
      chips.push({ key: 'search', label: `Search: "${state.search.trim()}"` });
    }
    if (state.category !== 'All') {
      chips.push({ key: 'category', label: `Category: ${state.category}` });
    }
    if (state.collection) {
      chips.push({ key: 'collection', label: `Collection: ${COLLECTION_LABELS[state.collection]}` });
    }
    if (state.selectedCalendarDate) {
      chips.push({ key: 'calendarDate', label: `Date: ${formatDateDisplay(state.selectedCalendarDate)}` });
    } else if (state.dateRange !== 'all') {
      const selectedOpt = dom.dateSelect.options[dom.dateSelect.selectedIndex];
      chips.push({ key: 'dateRange', label: `When: ${selectedOpt ? selectedOpt.text : state.dateRange}` });
    }
    if (state.price !== 'all') {
      chips.push({ key: 'price', label: `Price: ${state.price === 'free' ? 'Free Only' : 'Paid Only'}` });
    }

    if (chips.length === 0) {
      dom.activeFiltersBar.hidden = true;
      dom.activeFilterChips.innerHTML = '';
      return;
    }

    dom.activeFiltersBar.hidden = false;
    dom.activeFilterChips.innerHTML = chips
      .map(
        (chip) => `
      <button type="button" class="filter-chip" data-clear-chip="${chip.key}" aria-label="Remove ${escapeHtml(chip.label)} filter">
        <span>${escapeHtml(chip.label)}</span>
        <span aria-hidden="true">&times;</span>
      </button>
    `
      )
      .join('');
  }

  function renderEventsGrid() {
    const items = getFilteredEvents();
    dom.resultsSummary.textContent = `Showing ${items.length} of ${EVENTS.length} events`;

    if (items.length === 0) {
      dom.eventsGrid.innerHTML = '';
      dom.eventsGrid.hidden = true;
      dom.emptyState.hidden = false;
      return;
    }

    dom.emptyState.hidden = true;
    dom.eventsGrid.hidden = false;

    const useFeaturedLead = items.length >= 3;

    dom.eventsGrid.innerHTML = items
      .map((ev, index) => {
        const isSaved = state.savedIds.includes(ev.id);
        const leadClass = useFeaturedLead && index === 0 ? ' is-featured-lead' : '';
        const freeClass = ev.price === 0 ? ' is-free' : '';

        return `
        <article class="event-card${leadClass}">
          <div class="event-card-media">
            <img src="${ev.image}" alt="${escapeHtml(ev.title)}" loading="lazy">
            <span class="card-cat-badge" data-cat="${escapeHtml(ev.category)}">${escapeHtml(ev.category)}</span>
            <button
              type="button"
              class="card-save-btn${isSaved ? ' is-saved' : ''}"
              data-toggle-save="${ev.id}"
              aria-pressed="${isSaved}"
              aria-label="${isSaved ? 'Remove from saved events' : 'Save event'}: ${escapeHtml(ev.title)}"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>

          <div class="event-card-body">
            <div class="event-card-topmeta">
              <span class="event-date-chip">${formatDateDisplay(ev.date)} · ${escapeHtml(ev.time.split('–')[0].trim())}</span>
              <span class="event-price-tag${freeClass}">${formatPrice(ev.price)}</span>
            </div>

            <h3 class="event-card-title">
              <button type="button" class="event-card-title-btn" data-open-modal="${ev.id}">
                ${escapeHtml(ev.title)}
              </button>
            </h3>

            <p class="event-card-desc">${escapeHtml(ev.description)}</p>

            <div class="event-card-footer">
              <span class="event-card-venue" title="${escapeHtml(ev.venue)}">${escapeHtml(ev.venue)}</span>
              <button type="button" class="card-details-btn" data-open-modal="${ev.id}">Details</button>
            </div>
          </div>
        </article>
      `;
      })
      .join('');
  }

  function renderCalendar() {
    const year = state.calendarYear;
    const month = state.calendarMonth;
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startWeekday = firstDay.getDay();

    dom.calMonthLabel.textContent = firstDay.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

    const cells = [];
    for (let s = 0; s < startWeekday; s += 1) {
      cells.push('<div class="cal-day-spacer" aria-hidden="true"></div>');
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      const iso = `${year}-${mm}-${dd}`;
      const dayEvents = EVENTS.filter((ev) => ev.date === iso);
      const isSelected = state.selectedCalendarDate === iso;
      const isToday = iso === TODAY_ISO;

      const classes = ['cal-day-btn'];
      if (dayEvents.length > 0) classes.push('has-events');
      if (isSelected) classes.push('is-selected');
      if (isToday) classes.push('is-today');

      const dotsHtml = dayEvents
        .slice(0, 3)
        .map(() => '<span class="cal-dot" aria-hidden="true"></span>')
        .join('');

      const ariaDesc =
        dayEvents.length > 0
          ? `${formatLongDate(iso)}, ${dayEvents.length} ${dayEvents.length === 1 ? 'event' : 'events'}`
          : `${formatLongDate(iso)}, no events`;

      cells.push(`
        <button
          type="button"
          class="${classes.join(' ')}"
          data-cal-date="${iso}"
          aria-pressed="${isSelected}"
          aria-label="${ariaDesc}"
        >
          <span class="cal-day-num">${day}</span>
          <span class="cal-dots">${dotsHtml}</span>
        </button>
      `);
    }

    dom.calGrid.innerHTML = cells.join('');
    dom.calClearDateBtn.hidden = !state.selectedCalendarDate;
    renderCalendarAgenda();
  }

  function renderCalendarAgenda() {
    if (!state.selectedCalendarDate) {
      const monthPrefix = `${state.calendarYear}-${String(state.calendarMonth + 1).padStart(2, '0')}-`;
      const monthEvents = EVENTS.filter((ev) => ev.date.startsWith(monthPrefix)).slice(0, 4);

      dom.agendaKicker.textContent = 'CALENDAR SPOTLIGHT';
      dom.agendaTitle.textContent = 'Click a marked date';
      dom.agendaSubtitle.textContent = 'Select any highlighted day to filter the discovery grid and inspect that date’s lineup.';

      if (monthEvents.length === 0) {
        dom.agendaList.innerHTML =
          '<div class="agenda-empty">No demo events are scheduled in this month. Use the arrows to check November or December 2026.</div>';
        return;
      }

      dom.agendaList.innerHTML = monthEvents
        .map(
          (ev) => `
        <button type="button" class="agenda-item" data-open-modal="${ev.id}">
          <div class="agenda-item-top">
            <span>${formatDateDisplay(ev.date)}</span>
            <span>${formatPrice(ev.price)}</span>
          </div>
          <h4 class="agenda-item-title">${escapeHtml(ev.title)}</h4>
          <span class="agenda-item-venue">${escapeHtml(ev.venue)}</span>
        </button>
      `
        )
        .join('');
      return;
    }

    const dayEvents = EVENTS.filter((ev) => ev.date === state.selectedCalendarDate);
    dom.agendaKicker.textContent = 'FILTERED BY DATE';
    dom.agendaTitle.textContent = formatLongDate(state.selectedCalendarDate);

    if (dayEvents.length === 0) {
      dom.agendaSubtitle.textContent = 'No events are scheduled on this date.';
      dom.agendaList.innerHTML = `
        <div class="agenda-empty">
          Nothing on the calendar for ${formatDateDisplay(state.selectedCalendarDate)}. Try Nov 26–29 or Dec 1–15, or
          <button type="button" class="legend-clear-btn" data-clear-cal-date="true">clear the date filter</button>.
        </div>
      `;
      return;
    }

    dom.agendaSubtitle.textContent = `${dayEvents.length} ${dayEvents.length === 1 ? 'event' : 'events'} happening — main grid filtered to match.`;
    dom.agendaList.innerHTML =
      dayEvents
        .map(
          (ev) => `
        <button type="button" class="agenda-item" data-open-modal="${ev.id}">
          <div class="agenda-item-top">
            <span>${escapeHtml(ev.category)} · ${escapeHtml(ev.time)}</span>
            <span>${formatPrice(ev.price)}</span>
          </div>
          <h4 class="agenda-item-title">${escapeHtml(ev.title)}</h4>
          <span class="agenda-item-venue">${escapeHtml(ev.venue)}</span>
        </button>
      `
        )
        .join('') +
      `<button type="button" class="btn btn-ghost btn-sm" id="agenda-jump-grid">View filtered grid &uarr;</button>`;
  }

  function renderSavedState() {
    const count = state.savedIds.length;
    dom.headerSavedCount.textContent = String(count);
    dom.mobileSavedCount.textContent = String(count);

    // Update modal button if open
    if (state.activeModalEventId) {
      updateModalSaveButton(state.activeModalEventId);
    }

    // Update Saved Drawer list
    const savedEvents = state.savedIds
      .map((id) => EVENTS.find((ev) => ev.id === id))
      .filter(Boolean);

    if (savedEvents.length === 0) {
      dom.savedDrawerFooter.hidden = true;
      dom.savedDrawerList.innerHTML = `
        <div class="saved-empty">
          <p><strong>No saved events yet.</strong></p>
          <p>Click the bookmark icon on any event card or inside an event modal to keep a local shortlist.</p>
        </div>
      `;
      return;
    }

    dom.savedDrawerFooter.hidden = false;
    dom.savedDrawerList.innerHTML = savedEvents
      .map(
        (ev) => `
      <div class="saved-item">
        <img src="${ev.image}" alt="${escapeHtml(ev.title)}">
        <div>
          <div class="saved-item-meta">${formatDateDisplay(ev.date)} · ${formatPrice(ev.price)}</div>
          <h3 class="saved-item-title">${escapeHtml(ev.title)}</h3>
          <div class="saved-item-actions">
            <button type="button" class="saved-action-link" data-saved-open="${ev.id}">View details</button>
            <button type="button" class="saved-action-link saved-remove-btn" data-saved-remove="${ev.id}">Remove</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');
  }

  function renderAll() {
    renderCollectionsState();
    renderActiveFilterChips();
    renderEventsGrid();
    renderCalendar();
    renderSavedState();
  }

  /* ========================================================================
     EVENT ACTIONS & SYNC
     ======================================================================== */
  function syncSearchInputs(value) {
    state.search = value;
    [dom.headerSearchInput, dom.heroSearchInput, dom.discoverySearchInput, dom.mobileSearchInput].forEach((input) => {
      if (input && input.value !== value) {
        input.value = value;
      }
    });
    renderActiveFilterChips();
    renderEventsGrid();
  }

  function setCategory(category) {
    state.category = category;
    dom.categoryPills.forEach((pill) => {
      const active = pill.dataset.category === category;
      pill.classList.toggle('is-active', active);
      pill.setAttribute('aria-pressed', String(active));
    });
    renderActiveFilterChips();
    renderEventsGrid();
  }

  function resetAllFilters() {
    state.search = '';
    state.category = 'All';
    state.dateRange = 'all';
    state.selectedCalendarDate = null;
    state.price = 'all';
    state.collection = null;

    [dom.headerSearchInput, dom.heroSearchInput, dom.discoverySearchInput, dom.mobileSearchInput].forEach((input) => {
      if (input) input.value = '';
    });
    dom.dateSelect.value = 'all';
    dom.priceSelect.value = 'all';
    dom.dateSelect.disabled = false;

    setCategory('All');
    renderCollectionsState();
    renderCalendar();
  }

  function toggleSaveEvent(eventId) {
    const ev = EVENTS.find((item) => item.id === eventId);
    if (!ev) return;

    const exists = state.savedIds.includes(eventId);
    if (exists) {
      state.savedIds = state.savedIds.filter((id) => id !== eventId);
      showToast(`Removed “${ev.title}” from Saved Events`);
    } else {
      state.savedIds = [...state.savedIds, eventId];
      showToast(`Saved “${ev.title}” locally`);
    }

    persistSavedIds();
    renderEventsGrid();
    renderSavedState();
  }

  function updateModalSaveButton(eventId) {
    const isSaved = state.savedIds.includes(eventId);
    dom.modalSaveBtn.classList.toggle('is-saved', isSaved);
    dom.modalSaveBtn.setAttribute('aria-pressed', String(isSaved));
    dom.modalSaveLabel.textContent = isSaved ? 'Saved in Browser' : 'Save Event';
  }

  /* ========================================================================
     ACCESSIBLE MODALS & DRAWERS (Focus Trap + Escape + Restore Focus)
     ======================================================================== */
  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hidden && el.offsetParent !== null);
  }

  function openAccessibleLayer(backdropEl, dialogEl, triggerEl) {
    if (activeDialog) {
      closeActiveLayer(false);
    }

    lastFocusedTrigger = triggerEl || document.activeElement;
    activeDialog = { backdropEl, dialogEl };

    backdropEl.hidden = false;
    if (dialogEl.hasAttribute('hidden')) {
      dialogEl.hidden = false;
    }
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(() => {
      const focusables = getFocusableElements(dialogEl);
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        dialogEl.focus();
      }
    });
  }

  function closeActiveLayer(restoreFocus = true) {
    if (!activeDialog) return;
    const { backdropEl, dialogEl } = activeDialog;

    backdropEl.hidden = true;
    if (dialogEl === dom.mobileNavDrawer) {
      dialogEl.hidden = true;
      dom.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }

    document.body.style.overflow = '';
    activeDialog = null;
    state.activeModalEventId = null;

    if (restoreFocus && lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    }
    lastFocusedTrigger = null;
  }

  function openEventModal(eventId, triggerEl) {
    const ev = EVENTS.find((item) => item.id === eventId);
    if (!ev) return;

    state.activeModalEventId = eventId;
    dom.modalImg.src = ev.image;
    dom.modalImg.alt = ev.title;
    dom.modalCategory.textContent = ev.category;
    dom.modalDate.textContent = formatLongDate(ev.date);
    dom.modalPrice.textContent = ev.price === 0 ? 'Free Entry' : `$${ev.price} Demo Ticket`;
    dom.modalPrice.classList.toggle('is-free', ev.price === 0);
    dom.modalTitle.textContent = ev.title;
    dom.modalHost.textContent = `Hosted by ${ev.host}`;
    dom.modalTime.textContent = ev.time;
    dom.modalVenue.textContent = ev.venue;
    dom.modalCapacity.textContent = ev.capacity;
    dom.modalDesc.textContent = ev.description;
    dom.modalTags.innerHTML = ev.tags.map((tag) => `<span class="modal-tag">${escapeHtml(tag)}</span>`).join('');

    updateModalSaveButton(eventId);
    openAccessibleLayer(dom.eventModalBackdrop, dom.eventModal, triggerEl);
  }

  function openSavedDrawer(triggerEl) {
    renderSavedState();
    openAccessibleLayer(dom.savedDrawerBackdrop, dom.savedDrawer, triggerEl);
  }

  function openMobileNav(triggerEl) {
    dom.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    openAccessibleLayer(dom.mobileNavBackdrop, dom.mobileNavDrawer, triggerEl);
  }

  document.addEventListener('keydown', (e) => {
    if (!activeDialog) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeActiveLayer(true);
      return;
    }

    if (e.key === 'Tab') {
      const focusables = getFocusableElements(activeDialog.dialogEl);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ========================================================================
     FORM VALIDATION (HOST EVENT & NEWSLETTER)
     ======================================================================== */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  }

  function setFieldError(inputEl, errorEl, message) {
    if (message) {
      inputEl.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
      return false;
    }
    inputEl.removeAttribute('aria-invalid');
    errorEl.textContent = '';
    return true;
  }

  function handleHostFormSubmit(e) {
    e.preventDefault();

    const titleEl = document.getElementById('host-title');
    const categoryEl = document.getElementById('host-category');
    const dateEl = document.getElementById('host-date');
    const timeEl = document.getElementById('host-time');
    const venueEl = document.getElementById('host-venue');
    const priceEl = document.getElementById('host-price');
    const organizerEl = document.getElementById('host-organizer');
    const emailEl = document.getElementById('host-email');
    const descEl = document.getElementById('host-description');

    const checks = [
      setFieldError(
        titleEl,
        document.getElementById('err-host-title'),
        titleEl.value.trim().length < 4 ? 'Please enter an event title (at least 4 characters).' : ''
      ),
      setFieldError(
        categoryEl,
        document.getElementById('err-host-category'),
        !categoryEl.value ? 'Please choose a category.' : ''
      ),
      setFieldError(
        dateEl,
        document.getElementById('err-host-date'),
        !dateEl.value ? 'Please pick a sample event date.' : ''
      ),
      setFieldError(
        timeEl,
        document.getElementById('err-host-time'),
        timeEl.value.trim().length < 3 ? 'Please enter a time window (e.g. 18:30 – 21:00).' : ''
      ),
      setFieldError(
        venueEl,
        document.getElementById('err-host-venue'),
        venueEl.value.trim().length < 3 ? 'Please enter a fictional venue or neighborhood.' : ''
      ),
      setFieldError(
        priceEl,
        document.getElementById('err-host-price'),
        priceEl.value === '' || Number(priceEl.value) < 0 ? 'Enter 0 for free or a valid USD amount.' : ''
      ),
      setFieldError(
        organizerEl,
        document.getElementById('err-host-organizer'),
        organizerEl.value.trim().length < 2 ? 'Please enter a host or collective name.' : ''
      ),
      setFieldError(
        emailEl,
        document.getElementById('err-host-email'),
        !isValidEmail(emailEl.value) ? 'Please enter a valid contact email address.' : ''
      ),
      setFieldError(
        descEl,
        document.getElementById('err-host-description'),
        descEl.value.trim().length < 20 ? 'Please add at least 20 characters describing your event.' : ''
      )
    ];

    if (checks.includes(false)) {
      const firstInvalid = dom.hostForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const priceNum = Number(priceEl.value);
    dom.confEventTitle.textContent = titleEl.value.trim();
    dom.confEventSummary.innerHTML = `
      <div><dt>Category</dt><dd>${escapeHtml(categoryEl.value)}</dd></div>
      <div><dt>Date &amp; Time</dt><dd>${formatDateDisplay(dateEl.value)} · ${escapeHtml(timeEl.value.trim())}</dd></div>
      <div><dt>Venue</dt><dd>${escapeHtml(venueEl.value.trim())}</dd></div>
      <div><dt>Entry</dt><dd>${priceNum === 0 ? 'Free' : `$${priceNum}`}</dd></div>
      <div><dt>Host</dt><dd>${escapeHtml(organizerEl.value.trim())}</dd></div>
      <div><dt>Status</dt><dd>Demo validated (not published)</dd></div>
    `;

    dom.hostForm.hidden = true;
    dom.hostConfirmation.hidden = false;
    showToast('Demo event validated locally (not published)');
  }

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = dom.newsletterEmail.value.trim();

    if (!isValidEmail(email)) {
      dom.newsletterError.textContent = 'Please enter a valid email address (for example: neighbor@example.demo).';
      dom.newsletterError.hidden = false;
      dom.newsletterSuccess.hidden = true;
      dom.newsletterEmail.setAttribute('aria-invalid', 'true');
      dom.newsletterEmail.focus();
      return;
    }

    dom.newsletterEmail.removeAttribute('aria-invalid');
    dom.newsletterError.hidden = true;
    dom.newsletterSuccess.textContent = `Demo confirmed for ${email} — this is a static demo, so no real subscription was created.`;
    dom.newsletterSuccess.hidden = false;
    dom.newsletterForm.reset();
  }

  /* ========================================================================
     EVENT LISTENERS
     ======================================================================== */
  function bindEvents() {
    // Synced search inputs
    [dom.headerSearchInput, dom.heroSearchInput, dom.discoverySearchInput, dom.mobileSearchInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', (e) => {
        syncSearchInputs(e.target.value);
      });
    });

    dom.headerSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      scrollToSection('explore');
    });

    dom.heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      scrollToSection('explore');
    });

    dom.mobileSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeActiveLayer(false);
      scrollToSection('explore');
    });

    // Quick tags in hero
    dom.quickTags.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.collection) {
          state.collection = btn.dataset.collection;
        }
        if (btn.dataset.price) {
          state.price = btn.dataset.price;
          dom.priceSelect.value = btn.dataset.price;
        }
        if (btn.dataset.category) {
          setCategory(btn.dataset.category);
        }
        renderCollectionsState();
        renderActiveFilterChips();
        renderEventsGrid();
        scrollToSection('explore');
      });
    });

    // Category pills
    dom.categoryPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        setCategory(pill.dataset.category);
      });
    });

    // Select controls
    dom.dateSelect.addEventListener('change', (e) => {
      state.selectedCalendarDate = null;
      state.dateRange = e.target.value;
      renderCalendar();
      renderActiveFilterChips();
      renderEventsGrid();
    });

    dom.priceSelect.addEventListener('change', (e) => {
      state.price = e.target.value;
      renderActiveFilterChips();
      renderEventsGrid();
    });

    dom.sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      renderEventsGrid();
    });

    // Featured collections
    dom.collectionCards.forEach((card) => {
      card.addEventListener('click', () => {
        const colId = card.dataset.collectionId;
        state.collection = state.collection === colId ? null : colId;
        renderCollectionsState();
        renderActiveFilterChips();
        renderEventsGrid();
        scrollToSection('explore');
      });
    });

    dom.clearCollectionBtn.addEventListener('click', () => {
      state.collection = null;
      renderCollectionsState();
      renderActiveFilterChips();
      renderEventsGrid();
    });

    // Active filter chip removal & reset buttons
    dom.activeFilterChips.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-clear-chip]');
      if (!chip) return;

      const key = chip.dataset.clearChip;
      if (key === 'search') syncSearchInputs('');
      if (key === 'category') setCategory('All');
      if (key === 'collection') {
        state.collection = null;
        renderCollectionsState();
      }
      if (key === 'calendarDate') {
        state.selectedCalendarDate = null;
        dom.dateSelect.disabled = false;
        renderCalendar();
      }
      if (key === 'dateRange') {
        state.dateRange = 'all';
        dom.dateSelect.value = 'all';
      }
      if (key === 'price') {
        state.price = 'all';
        dom.priceSelect.value = 'all';
      }

      renderActiveFilterChips();
      renderEventsGrid();
    });

    dom.resetFiltersInline.addEventListener('click', resetAllFilters);
    dom.emptyResetBtn.addEventListener('click', resetAllFilters);

    // Event Grid & Hero Collage delegation (save & open modal)
    document.addEventListener('click', (e) => {
      const saveBtn = e.target.closest('[data-toggle-save]');
      if (saveBtn) {
        toggleSaveEvent(saveBtn.dataset.toggleSave);
        return;
      }

      const openModalBtn = e.target.closest('[data-open-modal]');
      if (openModalBtn) {
        openEventModal(openModalBtn.dataset.openModal, openModalBtn);
        return;
      }

      const calDayBtn = e.target.closest('[data-cal-date]');
      if (calDayBtn) {
        const clickedDate = calDayBtn.dataset.calDate;
        state.selectedCalendarDate = state.selectedCalendarDate === clickedDate ? null : clickedDate;
        dom.dateSelect.disabled = Boolean(state.selectedCalendarDate);
        if (state.selectedCalendarDate) {
          dom.dateSelect.value = 'all';
          state.dateRange = 'all';
        }
        renderCalendar();
        renderActiveFilterChips();
        renderEventsGrid();
        return;
      }

      if (e.target.closest('[data-clear-cal-date]')) {
        state.selectedCalendarDate = null;
        dom.dateSelect.disabled = false;
        renderCalendar();
        renderActiveFilterChips();
        renderEventsGrid();
        return;
      }

      if (e.target.id === 'agenda-jump-grid') {
        scrollToSection('explore');
        return;
      }

      const demoLink = e.target.closest('[data-demo-link]');
      if (demoLink) {
        e.preventDefault();
        showToast(`${demoLink.dataset.demoLink} link is a fictional demo placeholder`);
      }
    });

    // Calendar navigation
    dom.calPrevBtn.addEventListener('click', () => {
      state.calendarMonth -= 1;
      if (state.calendarMonth < 0) {
        state.calendarMonth = 11;
        state.calendarYear -= 1;
      }
      renderCalendar();
    });

    dom.calNextBtn.addEventListener('click', () => {
      state.calendarMonth += 1;
      if (state.calendarMonth > 11) {
        state.calendarMonth = 0;
        state.calendarYear += 1;
      }
      renderCalendar();
    });

    dom.calClearDateBtn.addEventListener('click', () => {
      state.selectedCalendarDate = null;
      dom.dateSelect.disabled = false;
      renderCalendar();
      renderActiveFilterChips();
      renderEventsGrid();
    });

    // Modal controls
    dom.modalCloseBtn.addEventListener('click', () => closeActiveLayer(true));
    dom.modalSecondaryClose.addEventListener('click', () => closeActiveLayer(true));
    dom.eventModalBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.eventModalBackdrop) closeActiveLayer(true);
    });
    dom.modalSaveBtn.addEventListener('click', () => {
      if (state.activeModalEventId) {
        toggleSaveEvent(state.activeModalEventId);
      }
    });

    // Saved Drawer controls
    dom.headerSavedBtn.addEventListener('click', () => openSavedDrawer(dom.headerSavedBtn));
    dom.footerSavedBtn.addEventListener('click', () => openSavedDrawer(dom.footerSavedBtn));
    dom.mobileSavedBtn.addEventListener('click', () => {
      closeActiveLayer(false);
      openSavedDrawer(dom.headerSavedBtn);
    });
    dom.savedDrawerClose.addEventListener('click', () => closeActiveLayer(true));
    dom.savedDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.savedDrawerBackdrop) closeActiveLayer(true);
    });

    dom.savedDrawerList.addEventListener('click', (e) => {
      const openBtn = e.target.closest('[data-saved-open]');
      if (openBtn) {
        openEventModal(openBtn.dataset.savedOpen, dom.headerSavedBtn);
        return;
      }
      const removeBtn = e.target.closest('[data-saved-remove]');
      if (removeBtn) {
        toggleSaveEvent(removeBtn.dataset.savedRemove);
      }
    });

    dom.clearAllSavedBtn.addEventListener('click', () => {
      state.savedIds = [];
      persistSavedIds();
      renderEventsGrid();
      renderSavedState();
      showToast('Cleared all saved events');
    });

    // Mobile Navigation
    dom.mobileMenuToggle.addEventListener('click', () => openMobileNav(dom.mobileMenuToggle));
    dom.mobileNavClose.addEventListener('click', () => closeActiveLayer(true));
    dom.mobileNavBackdrop.addEventListener('click', () => closeActiveLayer(true));
    dom.mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => closeActiveLayer(false));
    });

    // Forms
    dom.hostForm.addEventListener('submit', handleHostFormSubmit);
    dom.hostResetDemoBtn.addEventListener('click', () => {
      dom.hostForm.reset();
      dom.hostConfirmation.hidden = true;
      dom.hostForm.hidden = false;
      document.getElementById('host-title').focus();
    });

    dom.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }

  /* ========================================================================
     INIT
     ======================================================================== */
  function loadEditorialFonts() {
    if (!navigator.onLine) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap';
    document.head.appendChild(link);
  }

  function init() {
    renderHeroCollage();
    renderCollectionCounts();
    renderAll();
    bindEvents();
    window.addEventListener('load', loadEditorialFonts, { once: true });
  }

  init();
})();
