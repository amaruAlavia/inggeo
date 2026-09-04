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

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // 2. Navbar Background Blur on Scroll
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('shadow-2xl', 'shadow-purple-950/20', 'bg-slate-950/95');
      navbar?.classList.remove('bg-slate-950/80');
    } else {
      navbar?.classList.remove('shadow-2xl', 'shadow-purple-950/20', 'bg-slate-950/95');
      navbar?.classList.add('bg-slate-950/80');
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
    });
  });

  // 5. Interactive Philosophy / Methodology Timeline
  const methodCards = document.querySelectorAll('.method-step-card');
  methodCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      methodCards.forEach(c => c.classList.remove('border-purple-500', 'ring-2', 'ring-purple-500/20'));
      card.classList.add('border-purple-500', 'ring-2', 'ring-purple-500/20');
    });
  });

  // 6. Quotation & WhatsApp Message Generator
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

  // 8. Lucide Icons initialization
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
