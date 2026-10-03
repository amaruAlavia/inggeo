/* ==========================================================================
   INGGEO MYM SpA - Main Interactive Script
   ========================================================================== */

const initApp = () => {
  // Inicialización inmediata de Lucide Icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    const closeMobileMenu = () => {
      mobileMenu.classList.add('hidden');
      menuIconOpen?.classList.remove('hidden');
      menuIconClose?.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    };

    const openMobileMenu = () => {
      mobileMenu.classList.remove('hidden');
      menuIconOpen?.classList.add('hidden');
      menuIconClose?.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar con tecla Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    });

    // Cerrar al hacer clic fuera del menú o barra de navegación
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    });
  }

  // 2. Navbar Background Blur on Scroll
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('shadow-2xl', 'shadow-purple-950/30', 'bg-slate-950/98', 'border-slate-800');
      navbar?.classList.remove('bg-slate-950/90');
    } else {
      navbar?.classList.remove('shadow-2xl', 'shadow-purple-950/30', 'bg-slate-950/98');
      navbar?.classList.add('bg-slate-950/90');
    }
  });

  // 3. Scroll Reveal Animation using Intersection Observer
  const revealElements = document.querySelectorAll('.reveal-init');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Interactive Services Tabs
  const serviceTabs = document.querySelectorAll('.service-tab-btn');
  const servicePanels = document.querySelectorAll('.service-tab-panel');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      
      // Update Tab Buttons
      serviceTabs.forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white', 'shadow-lg', 'shadow-purple-600/30', 'border-purple-500');
        btn.classList.add('bg-slate-900/80', 'text-slate-300', 'border-slate-800');
      });
      tab.classList.add('bg-purple-600', 'text-white', 'shadow-lg', 'shadow-purple-600/30', 'border-purple-500');
      tab.classList.remove('bg-slate-900/80', 'text-slate-300', 'border-slate-800');

      // Update Panels
      servicePanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove('hidden');
          panel.classList.add('animate-fadeIn');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('animate-fadeIn');
        }
      });

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
  });

  // Preselección automática del formulario al hacer clic en cotizar especialidad
  const serviceQuoteBtns = document.querySelectorAll('.service-quote-btn');
  serviceQuoteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceVal = btn.getAttribute('data-service');
      const selectEl = document.getElementById('form-servicio');
      if (selectEl && serviceVal) {
        selectEl.value = serviceVal;
      }
    });
  });

  // 5. Interactive Project Filter Tabs
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectGroups = document.querySelectorAll('.project-group');

  if (projectFilterBtns.length > 0) {
    projectFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Actualizar apariencia de los botones
        projectFilterBtns.forEach(b => {
          b.classList.remove('bg-brand-purple', 'text-white', 'shadow-md', 'shadow-purple-950/20', 'border-purple-500');
          b.classList.add('bg-white', 'text-slate-600', 'border-slate-200', 'hover:border-purple-300', 'hover:text-brand-purple');
        });

        btn.classList.add('bg-brand-purple', 'text-white', 'shadow-md', 'shadow-purple-950/20', 'border-purple-500');
        btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200', 'hover:border-purple-300', 'hover:text-brand-purple');

        // Mostrar / Ocultar grupos de proyectos
        projectGroups.forEach(group => {
          const groupType = group.getAttribute('data-group');
          if (filter === 'all' || filter === groupType) {
            group.classList.remove('hidden');
          } else {
            group.classList.add('hidden');
          }
        });

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      });
    });
  }

  // 6. Interactive Philosophy / Methodology Timeline
  const methodCards = document.querySelectorAll('.method-step-card');
  methodCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      methodCards.forEach(c => c.classList.remove('border-purple-500', 'ring-2', 'ring-purple-500/20'));
      card.classList.add('border-purple-500', 'ring-2', 'ring-purple-500/20');
    });
  });

  // 7. Quotation & WhatsApp Message Generator
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById('form-nombre')?.value || '';
      const empresa = document.getElementById('form-empresa')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const telefono = document.getElementById('form-telefono')?.value || '';
      const servicio = document.getElementById('form-servicio')?.value || 'Consulta General';
      const faena = document.getElementById('form-faena')?.value || 'Norte de Chile';
      const mensaje = document.getElementById('form-mensaje')?.value || '';

      // Create WhatsApp message string
      const waText = encodeURIComponent(
        `*SOLICITUD DE COTIZACIÓN - INGGEO MYM SpA*\n` +
        `----------------------------------------\n` +
        `👤 *Nombre:* ${nombre}\n` +
        `🏢 *Empresa:* ${empresa}\n` +
        `📧 *Email:* ${email}\n` +
        `📞 *Teléfono:* ${telefono}\n` +
        `⚙️ *Servicio Requerido:* ${servicio}\n` +
        `📍 *Ubicación / Faena:* ${faena}\n` +
        `📝 *Detalle del Proyecto:* ${mensaje}\n` +
        `----------------------------------------\n` +
        `Enviado desde inggeo.cl`
      );

      // WhatsApp direct number for INGGEO (Configurable)
      const waNumber = "56932390306"; // Número comercial de INGGEO MYM SpA
      const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${waText}`;

      if (formFeedback) {
        formFeedback.classList.remove('hidden');
        formFeedback.innerHTML = `
          <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center justify-between">
            <div>
              <span class="font-semibold block mb-1">¡Solicitud Procesada Exitosamente!</span>
              <span>Redirigiendo a atención técnica por WhatsApp... Si no se abre automáticamente, haz clic en el botón.</span>
            </div>
            <a href="${waUrl}" target="_blank" class="ml-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs transition">
              Abrir WhatsApp
            </a>
          </div>
        `;
      }

      // Open WhatsApp after a short delay
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 700);
    });
  }

  // 7. Dynamic Stats Counter Animation
  const stats = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const countUp = () => {
    stats.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      const prefix = stat.getAttribute('data-prefix') || '';
      const duration = 1500;
      const stepTime = 25;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = `${prefix}${target}${suffix}`;
          clearInterval(timer);
        } else {
          stat.textContent = `${prefix}${Math.ceil(current)}${suffix}`;
        }
      }, stepTime);
    });
  };

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsCounted) {
        statsCounted = true;
        countUp();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // 8. WhatsApp Chat Widget Controller
  const waToggleBtn = document.getElementById('wa-widget-toggle');
  const waCloseBtn = document.getElementById('wa-widget-close');
  const waChatWindow = document.getElementById('wa-chat-window');
  const waTooltip = document.getElementById('wa-widget-tooltip');
  const waInput = document.getElementById('wa-widget-input');
  const waSendBtn = document.getElementById('wa-widget-send');
  const waQuickChips = document.querySelectorAll('.wa-quick-chip');
  const footerWaBtn = document.getElementById('footer-wa-btn');

  const waPhone = "56932390306";

  const openWaChat = () => {
    if (!waChatWindow) return;
    waChatWindow.classList.remove('hidden');
    setTimeout(() => {
      waChatWindow.classList.remove('scale-95', 'opacity-0');
      waChatWindow.classList.add('scale-100', 'opacity-100');
    }, 10);
    waTooltip?.classList.add('hidden');
    waInput?.focus();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  const closeWaChat = () => {
    if (!waChatWindow) return;
    waChatWindow.classList.remove('scale-100', 'opacity-100');
    waChatWindow.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      waChatWindow.classList.add('hidden');
    }, 250);
  };

  const sendWaMessage = (customMsg) => {
    const message = customMsg || waInput?.value?.trim() || "Hola, me gustaría solicitar información y cotización sobre sus servicios.";
    const waUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    if (waInput) waInput.value = '';
  };

  if (waToggleBtn && waChatWindow) {
    waToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isClosed = waChatWindow.classList.contains('hidden');
      if (isClosed) {
        openWaChat();
      } else {
        closeWaChat();
      }
    });

    waCloseBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeWaChat();
    });

    waTooltip?.addEventListener('click', (e) => {
      e.stopPropagation();
      openWaChat();
    });

    if (footerWaBtn) {
      footerWaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openWaChat();
        waChatWindow.scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
    }

    waSendBtn?.addEventListener('click', () => {
      sendWaMessage();
    });

    waInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendWaMessage();
      }
    });

    waQuickChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const msg = chip.getAttribute('data-msg');
        if (waInput) {
          waInput.value = msg;
        }
        sendWaMessage(msg);
      });
    });

    // Cerrar al hacer clic fuera del widget
    document.addEventListener('click', (e) => {
      if (!waChatWindow.contains(e.target) && !waToggleBtn.contains(e.target) && !footerWaBtn?.contains(e.target) && !waChatWindow.classList.contains('hidden')) {
        closeWaChat();
      }
    });

    // Cerrar con Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !waChatWindow.classList.contains('hidden')) {
        closeWaChat();
      }
    });
  }

  // 9. Slider Panorámico de Faenas con Miniaturas & Autoplay Inteligente
  const sliderAmbientBg = document.getElementById('slider-ambient-bg');
  const sliderMainImg = document.getElementById('slider-main-img');
  const sliderCounter = document.getElementById('slider-counter');
  const sliderPrevBtn = document.getElementById('slider-prev-btn');
  const sliderNextBtn = document.getElementById('slider-next-btn');
  const sliderPlayBtn = document.getElementById('slider-play-btn');
  const sliderPlayIcon = document.getElementById('slider-play-icon');
  const sliderFullscreenBtn = document.getElementById('slider-fullscreen-btn');
  const sliderProgressBar = document.getElementById('slider-progress-bar');
  const sliderThumbs = document.querySelectorAll('.slider-thumb');

  // Lightbox Modal para visualización a pantalla completa
  const lightboxModal = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxDots = document.getElementById('lightbox-dots');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  if (sliderMainImg && sliderThumbs.length > 0) {
    const slidesData = [
      { src: 'assets/images/galeria/h1.jpeg', alt: 'Fotografía 1' },
      { src: 'assets/images/galeria/h2.jpeg', alt: 'Fotografía 2' },
      { src: 'assets/images/galeria/h3.jpeg', alt: 'Fotografía 3' },
      { src: 'assets/images/galeria/h4.jpeg', alt: 'Fotografía 4' }
    ];

    let currentSlide = 0;
    let isPlaying = true;
    let autoplayInterval = null;
    let progressInterval = null;
    let progressStartTime = 0;
    const slideDuration = 6000; // 6 segundos por fotografía

    const updateThumbnails = (activeIdx) => {
      sliderThumbs.forEach((thumb, idx) => {
        if (idx === activeIdx) {
          thumb.className = 'slider-thumb group relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all duration-300 focus:outline-none cursor-pointer border-purple-500 bg-purple-950/40 shadow-lg shadow-purple-950/50 opacity-100 scale-[1.03]';
        } else {
          thumb.className = 'slider-thumb group relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all duration-300 focus:outline-none cursor-pointer border-slate-800 hover:border-slate-700 opacity-60 hover:opacity-100 scale-100';
        }
      });
    };

    const resetProgressBar = () => {
      if (progressInterval) clearInterval(progressInterval);
      if (sliderProgressBar) sliderProgressBar.style.width = '0%';
      progressStartTime = Date.now();

      if (isPlaying && sliderProgressBar) {
        progressInterval = setInterval(() => {
          const elapsed = Date.now() - progressStartTime;
          const percentage = Math.min((elapsed / slideDuration) * 100, 100);
          sliderProgressBar.style.width = `${percentage}%`;
          if (percentage >= 100) {
            clearInterval(progressInterval);
          }
        }, 50);
      }
    };

    const goToSlide = (index) => {
      if (index < 0) index = slidesData.length - 1;
      if (index >= slidesData.length) index = 0;
      currentSlide = index;

      const slide = slidesData[currentSlide];

      // Animación suave de transición en imagen
      sliderMainImg.style.opacity = '0';
      sliderMainImg.style.transform = 'scale(0.97)';
      if (sliderAmbientBg) sliderAmbientBg.style.opacity = '0.1';

      setTimeout(() => {
        sliderMainImg.src = slide.src;
        sliderMainImg.alt = slide.alt;
        if (sliderAmbientBg) {
          sliderAmbientBg.src = slide.src;
          sliderAmbientBg.style.opacity = '0.35';
        }

        if (sliderCounter) sliderCounter.textContent = `0${currentSlide + 1} / 0${slidesData.length}`;

        updateThumbnails(currentSlide);

        sliderMainImg.style.opacity = '1';
        sliderMainImg.style.transform = 'scale(1)';
      }, 140);

      resetProgressBar();
    };

    const startAutoplay = () => {
      isPlaying = true;
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, slideDuration);
      resetProgressBar();
      if (sliderPlayBtn) {
        sliderPlayBtn.innerHTML = '<i data-lucide="pause" class="w-4 h-4"></i>';
        if (window.lucide) window.lucide.createIcons();
      }
    };

    const pauseAutoplay = () => {
      isPlaying = false;
      if (autoplayInterval) clearInterval(autoplayInterval);
      if (progressInterval) clearInterval(progressInterval);
      if (sliderProgressBar) sliderProgressBar.style.width = '0%';
      if (sliderPlayBtn) {
        sliderPlayBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i>';
        if (window.lucide) window.lucide.createIcons();
      }
    };

    // Botones de navegación del slider
    sliderPrevBtn?.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      if (isPlaying) startAutoplay();
    });

    sliderNextBtn?.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      if (isPlaying) startAutoplay();
    });

    // Toggle de reproducción automática
    sliderPlayBtn?.addEventListener('click', () => {
      if (isPlaying) {
        pauseAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Clic en miniaturas
    sliderThumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        goToSlide(idx);
        if (isPlaying) startAutoplay();
      });
    });

    // Gestos táctiles Swipe en la zona del visor
    const sliderContainer = sliderMainImg.parentElement;
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goToSlide(currentSlide - 1);
        } else {
          goToSlide(currentSlide + 1);
        }
        if (isPlaying) startAutoplay();
      }
    }, { passive: true });

    // Pausar autoplay al posar el ratón sobre el escenario
    sliderContainer?.addEventListener('mouseenter', () => {
      if (isPlaying && autoplayInterval) {
        clearInterval(autoplayInterval);
        if (progressInterval) clearInterval(progressInterval);
      }
    });

    sliderContainer?.addEventListener('mouseleave', () => {
      if (isPlaying) {
        startAutoplay();
      }
    });

    // Iniciar autoplay de inmediato
    startAutoplay();

    // =========================================================================
    // Integración de Lightbox a Pantalla Completa
    // =========================================================================
    if (lightboxModal && lightboxImg) {
      const renderLightboxDots = () => {
        if (!lightboxDots) return;
        lightboxDots.innerHTML = '';
        slidesData.forEach((item, idx) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', `Ver fotografía ${idx + 1}`);
          const isActive = idx === currentSlide;
          dot.className = `h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            isActive
              ? 'w-7 sm:w-8 bg-purple-500 shadow-md shadow-purple-500/50'
              : 'w-2 sm:w-2.5 bg-slate-700 hover:bg-slate-500'
          }`;
          dot.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(idx);
          });
          lightboxDots.appendChild(dot);
        });
      };

      const showLightboxImage = (index) => {
        if (index < 0) index = slidesData.length - 1;
        if (index >= slidesData.length) index = 0;
        currentSlide = index;

        const data = slidesData[currentSlide];

        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.96)';

        setTimeout(() => {
          lightboxImg.src = data.src;
          lightboxImg.alt = data.alt;
          if (lightboxCounter) lightboxCounter.textContent = `${currentSlide + 1} / ${slidesData.length}`;

          renderLightboxDots();
          goToSlide(currentSlide);

          lightboxImg.style.opacity = '1';
          lightboxImg.style.transform = 'scale(1)';
        }, 120);
      };

      const openLightbox = () => {
        pauseAutoplay();
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        showLightboxImage(currentSlide);
        if (window.lucide) window.lucide.createIcons();
      };

      const closeLightbox = () => {
        lightboxModal.classList.add('hidden');
        lightboxModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        startAutoplay();
      };

      // Abrir fullscreen al pulsar la imagen principal o el botón dedicado
      sliderMainImg.addEventListener('click', openLightbox);
      sliderFullscreenBtn?.addEventListener('click', openLightbox);

      lightboxCloseBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });

      lightboxPrevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxImage(currentSlide - 1);
      });

      lightboxNextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxImage(currentSlide + 1);
      });

      lightboxModal.addEventListener('click', (e) => {
        const isNavBtn = e.target.closest('#lightbox-prev-btn') || e.target.closest('#lightbox-next-btn') || e.target.closest('#lightbox-close-btn') || e.target.closest('#lightbox-dots');
        const isImg = e.target.closest('#lightbox-img') || e.target.closest('#lightbox-img-container');
        if (!isNavBtn && !isImg) {
          closeLightbox();
        }
      });

      window.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('hidden')) {
          if (e.key === 'Escape') {
            closeLightbox();
          } else if (e.key === 'ArrowLeft') {
            showLightboxImage(currentSlide - 1);
          } else if (e.key === 'ArrowRight') {
            showLightboxImage(currentSlide + 1);
          }
        }
      });
    }
  }

  // 10. Lucide Icons initialization
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
};

// Ejecución garantizada: Si el DOM ya cargó, se ejecuta de inmediato sin esperar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Respaldo tras carga completa de recursos
window.addEventListener('load', () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});
