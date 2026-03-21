/* ================================================================
   LUXE ESTATES — Enhanced JavaScript
   Cursor fix, magnetic hover, ripple effects, text animations
   ================================================================ */

/* ── 1. TOAST ───────────────────────────────────────────── */
function showToast(msg) {
  var ex = document.querySelector('.luxe-toast');
  if (ex) ex.remove();
  var t = document.createElement('div');
  t.className = 'luxe-toast';
  t.innerHTML = '<i class="fa-solid fa-check-circle" style="color:#C9A96E;flex-shrink:0"></i><span>' + msg + '</span>';
  t.style.cssText = [
    'position:fixed','bottom:5rem','left:50%',
    'transform:translateX(-50%) translateY(20px)',
    'background:#1a1814','color:#FAF8F3',
    'padding:0.85rem 1.75rem','border-radius:8px',
    'font-size:0.88rem',"font-family:'Outfit',sans-serif",
    'font-weight:400','z-index:99999',
    'box-shadow:0 10px 40px rgba(0,0,0,0.3)',
    'border:1px solid rgba(201,169,110,0.3)',
    'display:flex','align-items:center','gap:10px',
    'opacity:0','transition:opacity 0.3s ease,transform 0.3s ease',
    'white-space:nowrap','max-width:90vw'
  ].join(';');
  document.body.appendChild(t);
  requestAnimationFrame(function () {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(function () {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(function () { t.remove(); }, 350);
  }, 3200);
}

/* ── 2. COUNTER ANIMATION ───────────────────────────────── */
function animateCounter(el, target) {
  var start = performance.now();
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function tick(now) {
    var p = Math.min((now - start) / 1800, 1);
    el.textContent = Math.round(ease(p) * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}

/* ── 3. PROPERTY DETAIL MODAL DATA ─────────────────────── */
var PROP_DATA = {
  highlights: {
    villa:      [{icon:'fa-swimming-pool',text:'Private Pool'},{icon:'fa-wifi',text:'Smart Home'},{icon:'fa-fire',text:'Fireplace'},{icon:'fa-seedling',text:'Landscaped Gardens'},{icon:'fa-solar-panel',text:'Solar Panels'},{icon:'fa-shield-halved',text:'Security System'}],
    apartment:  [{icon:'fa-dumbbell',text:'Gym & Fitness'},{icon:'fa-elevator',text:'High-Speed Elevator'},{icon:'fa-mug-hot',text:'Resident Lounge'},{icon:'fa-door-open',text:'24hr Doorman'},{icon:'fa-wifi',text:'High-Speed WiFi'},{icon:'fa-car',text:'Valet Parking'}],
    commercial: [{icon:'fa-wifi',text:'Fibre Internet'},{icon:'fa-snowflake',text:'Central HVAC'},{icon:'fa-elevator',text:'Freight Elevator'},{icon:'fa-car',text:'Secure Parking'},{icon:'fa-shield-halved',text:'CCTV Security'},{icon:'fa-bolt',text:'Generator Backup'}],
    estate:     [{icon:'fa-horse',text:'Horse Stables'},{icon:'fa-circle-dot',text:'Tennis Court'},{icon:'fa-swimming-pool',text:'Pool & Spa'},{icon:'fa-house',text:'Guest House'},{icon:'fa-tree',text:'5-Acre Grounds'},{icon:'fa-shield-halved',text:'Gated Estate'}]
  },
  interior: [
    'Open-plan living & dining','Gourmet chef\'s kitchen','Premium hardwood floors',
    'Floor-to-ceiling windows','Walk-in closets','Home theatre / media room',
    'Home office / study','Wet bar & wine cellar','Dedicated laundry room',
    'Custom cabinetry','High ceilings (10–14 ft)','Premium appliances (Sub-Zero / Miele)'
  ],
  outdoor: [
    'Private pool & spa','Outdoor kitchen / BBQ area','Covered patio / lanai',
    'Fully landscaped gardens','Rooftop terrace / deck','Panoramic ocean / city views',
    'Private beach access','Sport / tennis court','Children\'s play area',
    'Gated & fenced entrance','Ample guest parking','EV charging stations'
  ],
  building: [
    '24/7 manned security & CCTV','Video intercom & access control',
    'Smart home automation system','Solar panels & backup generator',
    'Central HVAC & climate control','High-speed fibre internet infrastructure',
    'Full fire suppression system','Pet-friendly policy','Disability accessible design'
  ],
  nearby: [
    {icon:'fa-graduation-cap', name:'Top-Rated Schools',       dist:'0.4 mi'},
    {icon:'fa-cart-shopping',  name:'Shopping Mall',           dist:'0.8 mi'},
    {icon:'fa-hospital',       name:'Hospital & Clinic',       dist:'1.2 mi'},
    {icon:'fa-train',          name:'Metro / Transit Hub',     dist:'0.6 mi'},
    {icon:'fa-utensils',       name:'Restaurants & Cafes',     dist:'0.3 mi'},
    {icon:'fa-tree',           name:'Park & Recreation',       dist:'0.5 mi'}
  ],
  similar: [
    {img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', price:'$520,000', name:'Hillside Modern Villa',    loc:'Bel Air, CA'},
    {img:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80', price:'$380,000', name:'Garden Retreat Home',      loc:'Pasadena, CA'},
    {img:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80', price:'$610,000', name:'Contemporary Penthouse',   loc:'West Hollywood, CA'}
  ]
};

/* ── 4. TOUR DATE HELPERS ───────────────────────────────── */
function getTourDates() {
  var days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var out = [], now = new Date();
  for (var i = 1; i <= 5; i++) {
    var d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({ day: days[d.getDay()], date: d.getDate(), month: months[d.getMonth()] });
  }
  return out;
}

/* ── 5. GALLERY ─────────────────────────────────────────── */
var currentImgs   = [];
var currentImgIdx = 0;

function buildGallery(imgs) {
  var mainImg   = document.getElementById('pdmMainImg');
  var thumbWrap = document.getElementById('pdmThumbs');
  var counter   = document.getElementById('pdmImgCounter');
  if (!imgs.length || !mainImg) return;

  mainImg.style.transition = 'opacity 0.2s ease';
  mainImg.style.opacity = '0';
  mainImg.src = imgs[0];
  setTimeout(function () { mainImg.style.opacity = '1'; }, 50);

  if (counter) counter.textContent = '1 / ' + imgs.length;

  if (thumbWrap) {
    thumbWrap.innerHTML = imgs.map(function (src, i) {
      return '<img class="pdm-thumb' + (i === 0 ? ' active' : '') + '" src="' + src + '" alt="Photo ' + (i + 1) + '" loading="lazy" data-idx="' + i + '"/>';
    }).join('');
    thumbWrap.querySelectorAll('.pdm-thumb').forEach(function (th) {
      th.addEventListener('click', function () {
        setGalleryImg(parseInt(th.dataset.idx, 10));
      });
    });
  }
}

function setGalleryImg(idx) {
  var mainImg   = document.getElementById('pdmMainImg');
  var thumbWrap = document.getElementById('pdmThumbs');
  var counter   = document.getElementById('pdmImgCounter');
  if (!currentImgs.length || !mainImg) return;

  currentImgIdx = (idx + currentImgs.length) % currentImgs.length;

  mainImg.style.transition = 'opacity 0.2s ease';
  mainImg.style.opacity = '0';
  setTimeout(function () {
    mainImg.src = currentImgs[currentImgIdx];
    mainImg.style.opacity = '1';
  }, 200);

  if (counter) counter.textContent = (currentImgIdx + 1) + ' / ' + currentImgs.length;

  if (thumbWrap) {
    thumbWrap.querySelectorAll('.pdm-thumb').forEach(function (th, i) {
      th.classList.toggle('active', i === currentImgIdx);
    });
    var active = thumbWrap.querySelector('.pdm-thumb.active');
    if (active) {
      thumbWrap.scrollLeft = active.offsetLeft - (thumbWrap.clientWidth / 2) + (active.clientWidth / 2);
    }
  }
}

/* ── 6. OPEN MODAL ──────────────────────────────────────── */
function openModal(card) {
  var d = card.dataset;
  var imgs = [];
  try { imgs = JSON.parse(d.imgs || '[]'); } catch (e) { imgs = []; }
  var category = d.category || 'villa';
  currentImgs = imgs;
  currentImgIdx = 0;

  buildGallery(imgs);

  var bn = document.getElementById('pdmBreadName');
  var bc = document.getElementById('pdmCategory');
  if (bn) bn.textContent = d.name || '—';
  if (bc) bc.textContent = (d.type || category).replace(/\b\w/g, function (c) { return c.toUpperCase(); });

  var badgesEl = document.getElementById('pdmBadges');
  if (badgesEl) badgesEl.innerHTML = d.badge ? '<span class="badge ' + (d.badgeclass || 'badge-gold') + '">' + d.badge + '</span>' : '';

  var titleEl    = document.getElementById('pdmTitle');
  var locEl      = document.getElementById('pdmLocation');
  var priceEl    = document.getElementById('pdmPrice');
  var priceSubEl = document.getElementById('pdmPriceSub');
  if (titleEl)    titleEl.textContent    = d.name     || '—';
  if (locEl)      locEl.innerHTML        = '<i class="fa-solid fa-location-dot"></i> ' + (d.location || '—');
  if (priceEl)    priceEl.textContent    = d.price    || '—';
  if (priceSubEl) priceSubEl.textContent = d.pricesub || 'For Sale';

  var specsBar = document.getElementById('pdmSpecsBar');
  if (specsBar) {
    var specs = [
      { icon: 'fa-solid fa-bed',         val: d.beds,                          lbl: 'Bedrooms'  },
      { icon: 'fa-solid fa-bath',        val: d.baths,                         lbl: 'Bathrooms' },
      { icon: 'fa-solid fa-expand',      val: d.sqft ? d.sqft + ' sqft' : '—', lbl: 'Area'      },
      { icon: 'fa-solid fa-car',         val: d.garage,                        lbl: 'Parking'   },
      { icon: 'fa-solid fa-layer-group', val: d.floor,                         lbl: 'Floors'    }
    ];
    specsBar.innerHTML = specs.map(function (s) {
      return '<div class="pdm-spec-item"><i class="' + s.icon + '"></i><strong>' + (s.val || '—') + '</strong><span>' + s.lbl + '</span></div>';
    }).join('');
  }

  var descEl = document.getElementById('pdmDesc');
  if (descEl) descEl.textContent = d.desc || '—';

  var hlEl = document.getElementById('pdmHighlights');
  if (hlEl) {
    var hl = PROP_DATA.highlights[category] || PROP_DATA.highlights.villa;
    hlEl.innerHTML = hl.map(function (h) {
      return '<div class="pdm-highlight"><i class="fa-solid ' + h.icon + '"></i>' + h.text + '</div>';
    }).join('');
  }

  var dgEl = document.getElementById('pdmDetailGrid');
  if (dgEl) {
    var details = [
      ['Property Type', d.type   || '—'],
      ['Year Built',    d.year   || '—'],
      ['Lot Size',      d.lot    || '—'],
      ['HOA Fee',       d.hoa    || 'None'],
      ['Status',        d.status || 'Available'],
      ['Listing ID',    '#LE' + (Math.floor(Math.random() * 90000) + 10000)]
    ];
    dgEl.innerHTML = details.map(function (row) {
      return '<div class="pdm-detail-row"><span>' + row[0] + '</span><strong>' + row[1] + '</strong></div>';
    }).join('');
  }

  var interiorEl  = document.getElementById('pdmInterior');
  var outdoorEl   = document.getElementById('pdmOutdoor');
  var buildingEl  = document.getElementById('pdmBuilding');
  var featureHtml = function (arr) {
    return arr.map(function (f) {
      return '<div class="pdm-feature-item"><i class="fa-solid fa-check"></i>' + f + '</div>';
    }).join('');
  };
  if (interiorEl)  interiorEl.innerHTML  = featureHtml(PROP_DATA.interior);
  if (outdoorEl)   outdoorEl.innerHTML   = featureHtml(PROP_DATA.outdoor);
  if (buildingEl)  buildingEl.innerHTML  = featureHtml(PROP_DATA.building);

  var addr      = (d.name || '') + ', ' + (d.location || '');
  var mapAddrEl = document.getElementById('pdmMapAddr');
  var mapLinkEl = document.getElementById('pdmMapLink');
  if (mapAddrEl) mapAddrEl.textContent = addr;
  if (mapLinkEl) mapLinkEl.href = 'https://maps.google.com/?q=' + encodeURIComponent(addr);

  var nearbyEl = document.getElementById('pdmNearby');
  if (nearbyEl) {
    nearbyEl.innerHTML = PROP_DATA.nearby.map(function (n) {
      return '<div class="pdm-nearby-item"><i class="fa-solid ' + n.icon + '"></i><div><strong>' + n.name + '</strong><span>' + n.dist + ' away</span></div></div>';
    }).join('');
  }

  var calcPriceEl = document.getElementById('calcPrice');
  var calcResEl   = document.getElementById('calcResult');
  var rawPrice    = parseInt((d.price || '0').replace(/[^0-9]/g, ''), 10);
  if (calcPriceEl) calcPriceEl.value = rawPrice || '';
  if (calcResEl)   calcResEl.style.display = 'none';

  var agentImg    = document.getElementById('pdmAgentImg');
  var agentName   = document.getElementById('pdmAgentName');
  var agentRole   = document.getElementById('pdmAgentRole');
  var agentRating = document.getElementById('pdmAgentRating');
  var agentCall   = document.getElementById('pdmAgentCall');
  var agentWA     = document.getElementById('pdmAgentWA');
  if (agentImg)    agentImg.src              = d['agent-img']    || '';
  if (agentName)   agentName.textContent     = d['agent-name']   || '—';
  if (agentRole)   agentRole.textContent     = d['agent-role']   || 'Luxury Specialist';
  if (agentRating) agentRating.textContent   = d['agent-rating'] || '';
  if (agentCall) {
    agentCall.onclick = function () {
      showToast('Calling ' + (d['agent-name'] || 'agent') + '…');
      setTimeout(function () { window.location.href = 'tel:' + (d['agent-phone'] || ''); }, 600);
    };
  }
  if (agentWA) {
    agentWA.onclick = function () {
      var ph = (d['agent-phone'] || '').replace(/[^0-9]/g, '');
      window.open('https://wa.me/' + ph, '_blank');
    };
  }

  var datesEl = document.getElementById('pdmTourDates');
  if (datesEl) {
    datesEl.innerHTML = getTourDates().map(function (td, i) {
      return '<button class="tour-date-btn' + (i === 0 ? ' active' : '') + '"><strong>' + td.date + '</strong><span>' + td.day + '</span></button>';
    }).join('');
    datesEl.querySelectorAll('.tour-date-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        datesEl.querySelectorAll('.tour-date-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });
  }

  var timesEl = document.getElementById('pdmTourTimes');
  if (timesEl) {
    var times = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'];
    timesEl.innerHTML = times.map(function (t, i) {
      return '<button class="tour-time-btn' + (i === 0 ? ' active' : '') + '">' + t + '</button>';
    }).join('');
    timesEl.querySelectorAll('.tour-time-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        timesEl.querySelectorAll('.tour-time-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });
  }

  var tourConfirmBtn = document.querySelector('.pdm-btn-tour');
  if (tourConfirmBtn) {
    tourConfirmBtn.onclick = function () {
      var ad = datesEl ? datesEl.querySelector('.tour-date-btn.active') : null;
      var at = timesEl ? timesEl.querySelector('.tour-time-btn.active') : null;
      var dateStr = ad ? (ad.querySelector('strong').textContent + ' ' + ad.querySelector('span').textContent) : '';
      var timeStr = at ? at.textContent : '';
      showToast('Viewing confirmed: ' + dateStr + ' at ' + timeStr + ' ✓');
    };
  }

  var enquiryBtn = document.querySelector('.pdm-btn-enquiry');
  if (enquiryBtn) {
    enquiryBtn.onclick = function () {
      showToast('Enquiry sent! Agent will contact you shortly.');
    };
  }

  var similarGrid = document.getElementById('pdmSimilarGrid');
  if (similarGrid) {
    similarGrid.innerHTML = PROP_DATA.similar.map(function (s) {
      return '<div class="pdm-sim-card">' +
        '<img src="' + s.img + '" alt="' + s.name + '" loading="lazy"/>' +
        '<div class="pdm-sim-body">' +
          '<div class="pdm-sim-price">' + s.price + '</div>' +
          '<div class="pdm-sim-name">' + s.name + '</div>' +
          '<div class="pdm-sim-loc"><i class="fa-solid fa-location-dot"></i>' + s.loc + '</div>' +
        '</div></div>';
    }).join('');
    similarGrid.querySelectorAll('.pdm-sim-card').forEach(function (sc) {
      sc.addEventListener('click', function () { showToast('Loading property details…'); });
    });
  }

  var saveBtn  = document.getElementById('pdmSaveBtn');
  var shareBtn = document.getElementById('pdmShareBtn');
  var printBtn = document.getElementById('pdmPrintBtn');
  if (saveBtn)  saveBtn.onclick  = function () { showToast('Property saved to your list ❤️'); };
  if (printBtn) printBtn.onclick = function () { window.print(); };
  if (shareBtn) {
    shareBtn.onclick = function () {
      if (navigator.share) {
        navigator.share({ title: d.name, text: 'Check out ' + d.name + ' at ' + d.price, url: window.location.href });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!');
      } else {
        showToast('Link: ' + window.location.href);
      }
    };
  }

  document.querySelectorAll('.pdm-tab').forEach(function (t) { t.classList.remove('active'); });
  document.querySelectorAll('.pdm-panel').forEach(function (p) { p.classList.remove('active'); });
  var firstTab   = document.querySelector('.pdm-tab[data-tab="overview"]');
  var firstPanel = document.getElementById('tab-overview');
  if (firstTab)   firstTab.classList.add('active');
  if (firstPanel) firstPanel.classList.add('active');

  var pdm         = document.getElementById('pdm');
  var pdmBackdrop = document.getElementById('pdmBackdrop');
  if (pdm)         pdm.classList.add('open');
  if (pdmBackdrop) pdmBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (pdm) pdm.scrollTop = 0;
}

/* ── 7. CLOSE MODAL ─────────────────────────────────────── */
function closeModal() {
  var pdm         = document.getElementById('pdm');
  var pdmBackdrop = document.getElementById('pdmBackdrop');
  if (pdm)         pdm.classList.remove('open');
  if (pdmBackdrop) pdmBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── 8. RIPPLE EFFECT ───────────────────────────────────── */
function createRipple(e, el) {
  var rect = el.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  var ripple = document.createElement('span');
  ripple.style.cssText = [
    'position:absolute',
    'border-radius:50%',
    'background:rgba(255,255,255,0.25)',
    'transform:scale(0)',
    'animation:rippleEffect 0.6s linear',
    'width:100px','height:100px',
    'top:' + (y - 50) + 'px',
    'left:' + (x - 50) + 'px',
    'pointer-events:none',
    'z-index:100'
  ].join(';');
  el.style.position = 'relative';
  el.style.overflow = 'hidden';
  el.appendChild(ripple);
  setTimeout(function () { ripple.remove(); }, 700);
}

/* ── 9. MAGNETIC HOVER ──────────────────────────────────── */
function initMagnetic(el, strength) {
  strength = strength || 0.3;
  el.addEventListener('mousemove', function (e) {
    var rect = el.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top  + rect.height / 2;
    var dx = (e.clientX - cx) * strength;
    var dy = (e.clientY - cy) * strength;
    el.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
  });
  el.addEventListener('mouseleave', function () {
    el.style.transform = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    setTimeout(function () { el.style.transition = ''; }, 500);
  });
}

/* ── 10. TEXT SPLIT ANIMATION ───────────────────────────── */
function splitTextAnimate(el, delay) {
  var text = el.textContent;
  var words = text.split(' ');
  el.innerHTML = words.map(function (w, i) {
    return '<span style="display:inline-block;opacity:0;transform:translateY(20px);transition:opacity 0.5s cubic-bezier(0.16,1,0.3,1) ' + ((delay || 0) + i * 60) + 'ms,transform 0.5s cubic-bezier(0.16,1,0.3,1) ' + ((delay || 0) + i * 60) + 'ms">' + w + '&nbsp;</span>';
  }).join('');
  requestAnimationFrame(function () {
    el.querySelectorAll('span').forEach(function (s) {
      s.style.opacity = '1';
      s.style.transform = 'translateY(0)';
    });
  });
}

/* ── 11. SCROLL PROGRESS BAR ────────────────────────────── */
function initScrollProgress() {
  var bar = document.createElement('div');
  bar.style.cssText = [
    'position:fixed','top:0','left:0','height:2px',
    'background:linear-gradient(90deg,#C9A96E,#E0C48A)',
    'z-index:9999','width:0%',
    'transition:width 0.1s linear',
    'pointer-events:none'
  ].join(';');
  document.body.appendChild(bar);
  window.addEventListener('scroll', function () {
    var scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(scrolled, 100) + '%';
  }, { passive: true });
}

/* ── 12. NUMBER TICKER (price hover) ───────────────────── */
function tickNumber(el) {
  var original = el.textContent;
  var num = parseFloat(original.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return;
  var prefix = original.match(/^[^0-9]*/)[0];
  var suffix = original.match(/[^0-9]*$/)[0];
  var start = num * 0.95;
  var duration = 300;
  var startTime = performance.now();
  function tick(now) {
    var p = Math.min((now - startTime) / duration, 1);
    var ease = 1 - Math.pow(1 - p, 2);
    var curr = start + (num - start) * ease;
    el.textContent = prefix + Math.round(curr).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = original;
  }
  requestAnimationFrame(tick);
}

/* ── 13. DOM READY ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Inject ripple keyframe ── */
  var style = document.createElement('style');
  style.textContent = '@keyframes rippleEffect { to { transform: scale(4); opacity: 0; } }';
  document.head.appendChild(style);

  /* ── Preloader ── */
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () { if (preloader) preloader.classList.add('done'); }, 1900);
  });

  /* ── Scroll Progress Bar ── */
  initScrollProgress();

  /* ════════════════════════════════════════════════════
     CUSTOM CURSOR — COMPLETELY REWRITTEN
     Uses JS-only translate, cursor always visible,
     correct hover state via class toggling
  ════════════════════════════════════════════════════ */
  var dot  = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  
  /* Only init custom cursor on non-touch devices */
  var isTouch = window.matchMedia('(pointer: coarse)').matches;
  
  if (!isTouch && dot && ring) {
    var mouseX = -100, mouseY = -100;
    var ringX  = -100, ringY  = -100;
    var rafActive = false;
    
    /* Position using transform so we don't fight with margin offset */
    function positionCursor() {
      dot.style.transform  = 'translate(' + mouseX + 'px, ' + mouseY + 'px)';
    }
    function positionRing() {
      ring.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px)';
    }
    
    /* Initial hide offscreen until first mouse move */
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
    
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX - 4;   /* half of 8px dot */
      mouseY = e.clientY - 4;
      positionCursor();
      
      /* Reveal once we have real coordinates */
      if (dot.style.opacity === '0') {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
      }
      
      if (!rafActive) {
        rafActive = true;
        requestAnimationFrame(lerpRing);
      }
    });
    
    /* Smooth lag on ring */
    function lerpRing() {
      var dx = (mouseX - 14) - ringX;   /* 14 = half of 36px ring - 4px dot offset */
      var dy = (mouseY - 14) - ringY;
      ringX += dx * 0.12;
      ringY += dy * 0.12;
      positionRing();
      
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        requestAnimationFrame(lerpRing);
      } else {
        rafActive = false;
      }
    }
    
    /* Hide when mouse leaves window */
    document.addEventListener('mouseleave', function () {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
    
    /* Hover states — use class toggling for CSS transitions */
    var interactiveEls = 'a, button, .prop-card, .cat-card, .agent-card, .testi-card, .pill, .stab, .ci, .pdm-thumb, .tour-date-btn, .tour-time-btn, .pdm-sim-card, input, select, textarea, .footer-social a, .pdm-highlight, .pdm-nearby-item';
    
    document.addEventListener('mouseover', function (e) {
      var target = e.target.closest(interactiveEls);
      if (target) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    });
    document.addEventListener('mouseout', function (e) {
      var target = e.target.closest(interactiveEls);
      if (target) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    });
    
    /* Text cursor mode */
    var textEls = 'input, textarea';
    document.addEventListener('mouseover', function (e) {
      if (e.target.matches(textEls)) {
        dot.classList.add('text-mode');
        ring.classList.add('text-mode');
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.matches(textEls)) {
        dot.classList.remove('text-mode');
        ring.classList.remove('text-mode');
      }
    });
    
    /* Scale down dot on click */
    document.addEventListener('mousedown', function () {
      dot.style.transform  = 'translate(' + mouseX + 'px, ' + mouseY + 'px) scale(0.7)';
      ring.style.borderWidth = '3px';
    });
    document.addEventListener('mouseup', function () {
      positionCursor();
      ring.style.borderWidth = '';
    });
  }

  /* ── Header scroll ── */
  var header = document.getElementById('header');
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 80) {
      header.classList.remove('transparent');
      header.classList.add('solid');
    } else {
      header.classList.add('transparent');
      header.classList.remove('solid');
    }
  }
  if (header) header.classList.add('transparent');
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── Mobile Drawer ── */
  var hamburger   = document.getElementById('hamburger');
  var navDrawer   = document.getElementById('navDrawer');
  var drawerClose = document.getElementById('drawerClose');
  var navOverlay  = document.getElementById('navOverlay');
  function openDrawer()  { 
    if (navDrawer) navDrawer.classList.add('open'); 
    if (navOverlay) navOverlay.classList.add('open'); 
    if (hamburger) hamburger.classList.add('open');
    document.body.style.overflow = 'hidden'; 
  }
  function closeDrawer() { 
    if (navDrawer) navDrawer.classList.remove('open'); 
    if (navOverlay) navOverlay.classList.remove('open'); 
    if (hamburger) hamburger.classList.remove('open');
    document.body.style.overflow = ''; 
  }
  if (hamburger)   hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (navOverlay)  navOverlay.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-links a').forEach(function (a) { a.addEventListener('click', closeDrawer); });

  /* ── Hero slideshow ── */
  var slides     = document.querySelectorAll('.hero-slide');
  var indicators = document.querySelectorAll('.indicator');
  var current = 0, slideTimer;
  function goToSlide(n) {
    if (slides[current])     slides[current].classList.remove('active');
    if (indicators[current]) indicators[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    if (slides[current])     slides[current].classList.add('active');
    if (indicators[current]) indicators[current].classList.add('active');
  }
  function startSlides() { slideTimer = setInterval(function () { goToSlide(current + 1); }, 5000); }
  indicators.forEach(function (btn, i) {
    btn.addEventListener('click', function () { clearInterval(slideTimer); goToSlide(i); startSlides(); });
  });
  startSlides();

  /* ── Search tabs ── */
  document.querySelectorAll('.stab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.stab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
    });
  });

  /* ── Filter pills ── */
  document.querySelectorAll('.pill').forEach(function (pill) {
    pill.addEventListener('click', function (e) {
      createRipple(e, pill);
      document.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      var filter = pill.dataset.filter;
      var cards = document.querySelectorAll('.prop-card');
      cards.forEach(function (card, i) {
        var show = filter === 'all' || card.dataset.category === filter;
        if (show) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function () {
            card.style.transition = 'opacity 0.4s ease ' + (i * 60) + 'ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ' + (i * 60) + 'ms';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(function () { card.style.display = 'none'; }, 350);
        }
      });
    });
  });

  /* ── Save / heart buttons ── */
  document.querySelectorAll('.prop-save').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      btn.classList.toggle('saved');
      var icon = btn.querySelector('i');
      if (btn.classList.contains('saved')) {
        if (icon) { icon.classList.remove('fa-regular'); icon.classList.add('fa-solid'); }
        btn.style.color = '#c0392b';
        /* Heart burst animation */
        btn.style.transform = 'scale(0)';
        setTimeout(function () {
          btn.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
          btn.style.transform = 'scale(1.3)';
          setTimeout(function () { btn.style.transform = 'scale(1)'; }, 200);
        }, 50);
        showToast('Property saved to favourites ❤️');
      } else {
        if (icon) { icon.classList.remove('fa-solid'); icon.classList.add('fa-regular'); }
        btn.style.color = '';
        btn.style.transform = '';
        btn.style.transition = '';
        showToast('Removed from favourites');
      }
    });
  });

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Back to top ── */
  var backTop = document.getElementById('backTop');
  window.addEventListener('scroll', function () {
    if (!backTop) return;
    if (window.scrollY > 500) backTop.classList.add('visible');
    else backTop.classList.remove('visible');
  }, { passive: true });
  if (backTop) {
    backTop.addEventListener('click', function () { 
      window.scrollTo({ top: 0, behavior: 'smooth' });
      backTop.classList.add('ripple');
      setTimeout(function () { backTop.classList.remove('ripple'); }, 600);
    });
  }

  /* ── Scroll reveal ── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
      el.style.transitionDelay = (siblings.indexOf(el) * 80) + 'ms';
      el.classList.add('visible');
      revealObs.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });

  /* ── Card entrance ── */
  var cardObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var siblings = Array.from(el.parentElement.querySelectorAll('.prop-card'));
      var delay = siblings.indexOf(el) * 80;
      el.style.transitionDelay = delay + 'ms';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      cardObs.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.prop-card').forEach(function (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(32px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    cardObs.observe(card);
    
    /* Price tick on hover */
    var priceEl = card.querySelector('.prop-price');
    if (priceEl) {
      card.addEventListener('mouseenter', function () { tickNumber(priceEl); });
    }
  });

  /* ── Counter animation ── */
  var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target, parseInt(entry.target.dataset.target, 10));
      counterObs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-number').forEach(function (el) { counterObs.observe(el); });

  /* ── Category cards stagger ── */
  var catGrid = document.querySelector('.cat-grid');
  if (catGrid) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.cat-card').forEach(function (card, i) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'opacity 0.5s ease ' + (i * 80) + 'ms, transform 0.5s ease ' + (i * 80) + 'ms';
          setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        });
      });
    }, { threshold: 0.15 }).observe(catGrid);
  }

  /* ── Section title split animation ── */
  var sectionTitleObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      splitTextAnimate(entry.target, 100);
      sectionTitleObs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.section-title').forEach(function (el) {
    sectionTitleObs.observe(el);
  });

  /* ── Parallax hero ── */
  var heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', function () {
    if (heroBg && window.scrollY < window.innerHeight) {
      heroBg.style.transform = 'translateY(' + (window.scrollY * 0.25) + 'px)';
    }
  }, { passive: true });

  /* ── Stats number hover glow ── */
  document.querySelectorAll('.stat-block').forEach(function (block) {
    block.addEventListener('mouseenter', function () {
      var num = block.querySelector('.stat-number');
      if (num) {
        num.style.textShadow = '0 0 30px rgba(201,169,110,0.5), 0 0 60px rgba(201,169,110,0.2)';
      }
    });
    block.addEventListener('mouseleave', function () {
      var num = block.querySelector('.stat-number');
      if (num) num.style.textShadow = '';
    });
  });

  /* ── Magnetic buttons ── */
  document.querySelectorAll('.btn-hero-primary, .btn-cta-gold, .btn-view-all, .back-top').forEach(function (el) {
    initMagnetic(el, 0.25);
  });

  /* ── Ripple on primary buttons ── */
  document.querySelectorAll('.btn-hero-primary, .btn-cta-gold, .btn-search-card, .btn-form-submit, .pdm-btn-tour, .pdm-btn-call').forEach(function (btn) {
    btn.addEventListener('click', function (e) { createRipple(e, btn); });
  });

  /* ── WhatsApp contact items ── */
  document.querySelectorAll('.ci-whatsapp').forEach(function (item) {
    item.addEventListener('click', function () { window.open('https://wa.me/15559876543', '_blank'); });
  });

  /* ── Contact form ── */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.btn-form-submit');
      if (!btn) return;
      btn.innerHTML = '<span>Sending…</span>';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = '<span>✓ Message Sent!</span>';
        btn.style.background = '#2d7d5c';
        showToast("Message sent! We'll reply within 2 hours.");
        setTimeout(function () {
          contactForm.reset();
          btn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  /* ── View all / category / CTA buttons ── */
  var viewAllBtn = document.querySelector('.btn-view-all');
  if (viewAllBtn) viewAllBtn.addEventListener('click', function () { showToast('Loading all 400+ listings…'); });

  document.querySelectorAll('.cat-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var h3 = card.querySelector('h3');
      showToast('Browsing ' + (h3 ? h3.textContent : '') + '…');
    });
  });

  document.querySelectorAll('.btn-cta-gold').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var contact = document.querySelector('#contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.agent-social a').forEach(function (a) {
    a.addEventListener('click', function (e) { e.stopPropagation(); });
  });

  /* ── VIEW DETAILS buttons ── */
  document.querySelectorAll('.btn-view-prop').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var card = btn.closest('.prop-card');
      if (card) openModal(card);
    });
  });

  /* ── MODAL: close ── */
  var pdmCloseBtn = document.getElementById('pdmClose');
  var pdmBackdrop = document.getElementById('pdmBackdrop');
  if (pdmCloseBtn) pdmCloseBtn.addEventListener('click', closeModal);
  if (pdmBackdrop) pdmBackdrop.addEventListener('click', closeModal);

  /* ── MODAL: gallery prev/next ── */
  var pgPrev = document.getElementById('pgPrev');
  var pgNext = document.getElementById('pgNext');
  function navGallery(e, direction) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.blur();
    var pdmEl    = document.getElementById('pdm');
    var savedTop = pdmEl ? pdmEl.scrollTop : 0;
    setGalleryImg(currentImgIdx + direction);
    if (pdmEl) {
      requestAnimationFrame(function () { pdmEl.scrollTop = savedTop; });
    }
  }
  if (pgPrev) pgPrev.addEventListener('click', function (e) { navGallery(e, -1); });
  if (pgNext) pgNext.addEventListener('click', function (e) { navGallery(e, +1); });

  /* ── MODAL: keyboard ── */
  document.addEventListener('keydown', function (e) {
    var pdm = document.getElementById('pdm');
    if (!pdm || !pdm.classList.contains('open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  setGalleryImg(currentImgIdx - 1);
    if (e.key === 'ArrowRight') setGalleryImg(currentImgIdx + 1);
  });

  /* ── MODAL: tab switching ── */
  document.querySelectorAll('.pdm-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.pdm-tab').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.pdm-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── MORTGAGE CALCULATOR ── */
  var calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.innerHTML = '<span>Calculate Payment</span>';
    calcBtn.addEventListener('click', function (e) {
      createRipple(e, calcBtn);
      var price   = parseFloat(document.getElementById('calcPrice').value)  || 0;
      var downPct = parseFloat(document.getElementById('calcDown').value)   || 20;
      var rate    = parseFloat(document.getElementById('calcRate').value)   || 6.5;
      var termYrs = parseInt(document.getElementById('calcTerm').value, 10) || 30;

      var loan = price * (1 - downPct / 100);
      var mr   = rate / 100 / 12;
      var n    = termYrs * 12;
      var monthly, totalPaid, totalInterest;

      if (mr === 0) { monthly = loan / n; }
      else { monthly = loan * (mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1); }
      totalPaid     = monthly * n;
      totalInterest = totalPaid - loan;

      function fmt(v) { return '$' + Math.round(v).toLocaleString(); }

      var mEl = document.getElementById('calcMonthly');
      var lEl = document.getElementById('calcLoan');
      var iEl = document.getElementById('calcInterest');
      var tEl = document.getElementById('calcTotal');
      if (mEl) mEl.textContent = fmt(monthly);
      if (lEl) lEl.textContent = fmt(loan);
      if (iEl) iEl.textContent = fmt(totalInterest);
      if (tEl) tEl.textContent = fmt(totalPaid);

      var res = document.getElementById('calcResult');
      if (res) {
        res.style.display = 'grid';
        res.style.animation = 'none';
        requestAnimationFrame(function () { res.style.animation = 'fadeIn 0.4s ease'; });
      }
    });
  }

  /* ── Agents grid stagger ── */
  var agentsGrid = document.querySelector('.agents-grid');
  if (agentsGrid) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.agent-card').forEach(function (card, i) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          card.style.transition = 'opacity 0.5s ease ' + (i * 100) + 'ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ' + (i * 100) + 'ms';
          setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        });
      });
    }, { threshold: 0.2 }).observe(agentsGrid);
  }

  /* ── Testi cards stagger ── */
  var testiGrid = document.querySelector('.testi-grid');
  if (testiGrid) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.testi-card').forEach(function (card, i) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          card.style.transition = 'opacity 0.5s ease ' + (i * 120) + 'ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ' + (i * 120) + 'ms';
          setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        });
      });
    }, { threshold: 0.2 }).observe(testiGrid);
  }

  /* ── Footer links stagger ── */
  document.querySelectorAll('.footer-col ul').forEach(function (ul) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('li').forEach(function (li, i) {
          li.style.opacity = '0';
          li.style.transform = 'translateX(-10px)';
          li.style.transition = 'opacity 0.4s ease ' + (i * 60) + 'ms, transform 0.4s cubic-bezier(0.16,1,0.3,1) ' + (i * 60) + 'ms';
          setTimeout(function () {
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
          }, 50);
        });
      });
    }, { threshold: 0.3 }).observe(ul);
  });

  /* ── Contact items stagger ── */
  var contactItems = document.querySelector('.contact-items');
  if (contactItems) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.ci').forEach(function (ci, i) {
          ci.style.opacity = '0';
          ci.style.transform = 'translateX(-20px)';
          ci.style.transition = 'opacity 0.5s ease ' + (i * 100) + 'ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ' + (i * 100) + 'ms';
          setTimeout(function () {
            ci.style.opacity = '1';
            ci.style.transform = 'translateX(0)';
          }, 50);
        });
      });
    }, { threshold: 0.2 }).observe(contactItems);
  }

  console.log('%c✦ Luxe Estates Ready', 'color:#C9A96E;font-family:Georgia,serif;font-size:1.1rem;font-style:italic;');

}); /* end DOMContentLoaded */