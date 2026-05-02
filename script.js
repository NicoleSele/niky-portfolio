// ===== MENÚ HAMBURGUESA =====
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // ===== ANIMACIONES DE SCROLL =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  // ===== BOTÓN IR ARRIBA =====
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });

    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== FILTROS DE PROYECTOS =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Actualizar botón activo
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filtrar proyectos con animacion mejorada
      projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        if (filter === 'todos' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, index * 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95) translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ===== FORMULARIO DE CONTACTO =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.querySelector('input[name="nombre"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const servicio = document.querySelector('select[name="servicio"]').value;
      const mensaje = document.querySelector('textarea[name="mensaje"]').value;

      const whatsappNumber = '573159071188';
      const whatsappMessage = `Hola Nicole, me llamo ${nombre}. Mi email es ${email}. Estoy interesado en ${servicio}. ${mensaje}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappUrl, '_blank');
      contactForm.reset();
    });
  }
});

// ===== EFECTO PARALLAX OPCIONAL =====
window.addEventListener('scroll', function() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach(el => {
    const scrollPosition = window.pageYOffset;
    const elementOffset = el.offsetTop;
    const distance = scrollPosition - elementOffset;
    el.style.backgroundPosition = `center ${distance * 0.5}px`;
  });
});


// ===== CARRUSEL INFINITO DE MARCAS =====
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('brandsCarousel');
  const track = document.getElementById('brandsTrack');
  
  if (carousel && track) {
    const logos = Array.from(track.querySelectorAll('.brand-logo'));
    
    // Duplicar logos para efecto infinito
    logos.forEach(logo => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    const trackWidth = track.scrollWidth / 2;
    let isAnimating = true;
    
    function animateCarousel() {
      if (isAnimating) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= trackWidth) {
          scrollPosition = 0;
        }
        track.style.transform = 'translateX(-' + scrollPosition + 'px)';
      }
      requestAnimationFrame(animateCarousel);
    }
    
    animateCarousel();
    
    carousel.addEventListener('mouseenter', () => {
      isAnimating = false;
    });
    
    carousel.addEventListener('mouseleave', () => {
      isAnimating = true;
    });
  }
});
