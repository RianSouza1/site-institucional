document.addEventListener('DOMContentLoaded', () => {
  // --- LANGUAGE SWITCHER ---
  const langButtons = document.querySelectorAll('.lang-btn');

  const setLanguage = (lang) => {
    document.documentElement.setAttribute('lang', lang);
    document.body.classList.remove('lang-en', 'lang-pt');
    document.body.classList.add(`lang-${lang}`);
    localStorage.setItem('preferred-lang', lang);
    
    // Update active state on all switcher buttons
    langButtons.forEach(btn => {
      const isTargetLang = btn.id.includes(`-${lang}`) || 
                           btn.classList.contains(`lang-btn-${lang}`) ||
                           btn.textContent.trim().toUpperCase() === lang.toUpperCase();
      if (isTargetLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update form placeholders dynamically based on current language
    const nomeInput = document.getElementById('nome');
    const empresaInput = document.getElementById('empresa');
    const mensagemInput = document.getElementById('mensagem');
    
    if (nomeInput) {
      nomeInput.placeholder = lang === 'pt' ? 'Seu nome' : 'Your name';
    }
    if (empresaInput) {
      empresaInput.placeholder = lang === 'pt' ? 'ex: Fotografia, Culinária' : 'e.g. Photography, Cooking, Fitness';
    }
    if (mensagemInput) {
      mensagemInput.placeholder = lang === 'pt' ? 'Como podemos ajudar você a dominar seu hobby?...' : 'How can we help you master your hobby?...';
    }

    // Update page title and description
    document.title = lang === 'pt' 
      ? 'Trinity Digital Company | Organize & Evolua Suas Paixões' 
      : 'Trinity Digital Company | Organize & Evolve Your Passions';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', lang === 'pt'
        ? 'Trinity Digital Company LLC — Aplicativos móveis/web e ebooks educacionais de alto nível projetados para ajudar você a organizar, gerenciar e evoluir seus hobbies e paixões.'
        : 'Trinity Digital Company LLC — Premium mobile/web applications and educational ebooks designed to help you organize, manage, and master your favorite hobbies and passions.'
      );
    }
  };

  // Add click listeners to switcher buttons
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isPt = btn.id.includes('-pt') || btn.classList.contains('lang-btn-pt') || btn.textContent.trim().toUpperCase() === 'PT';
      setLanguage(isPt ? 'pt' : 'en');
    });
  });

  // Apply saved preference or default to English
  const savedLang = localStorage.getItem('preferred-lang') || 
                    (navigator.language.startsWith('pt') ? 'pt' : 'en');
  setLanguage(savedLang);

  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // --- MOBILE MENU TOGGLE ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  // --- INTERSECTION OBSERVER FOR REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Anima apenas uma vez ao entrar
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- ACTIVE LINK SELECTION ON SCROLL ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- NUMBER COUNTER ANIMATION ---
  const animateElement = (num) => {
    const target = parseInt(num.getAttribute('data-target'), 10);
    const duration = 2000; // 2 segundos
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;

    // Garantir valores mínimos saudáveis para passo
    const increment = target > 100 ? Math.ceil(target / 100) : 1;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        num.textContent = target;
        clearInterval(timer);
      } else {
        num.textContent = current;
      }
    }, stepTime > 15 ? stepTime : 15);
  };

  // Immediately animate Hero Stats (stat-num inside .hero-stats)
  const heroStatsNumbers = document.querySelectorAll('.hero-stats .stat-num');
  heroStatsNumbers.forEach(num => animateElement(num));

  // Observador para disparar contagem apenas quando a seção estiver visível (bottom stats)
  const bottomNumbers = document.querySelectorAll('.numero-val');
  let bottomAnimated = false;

  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !bottomAnimated) {
        bottomNumbers.forEach(num => animateElement(num));
        bottomAnimated = true;
        numberObserver.disconnect(); // Desliga o observador após a animação
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('numeros');
  if (statsSection) {
    numberObserver.observe(statsSection);
  }

  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formSuccess && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validação básica de formulário
      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ef4444';
        } else {
          input.style.borderColor = '';
        }
      });

      if (!isValid) return;

      // Estado de Carregamento
      const btnText = submitBtn.querySelector('.btn-text');
      const btnIcon = submitBtn.querySelector('.btn-icon');
      const originalHtml = btnText.innerHTML;
      const originalIcon = btnIcon.innerHTML;

      submitBtn.disabled = true;
      btnText.innerHTML = document.documentElement.getAttribute('lang') === 'pt' ? 'Enviando...' : 'Sending...';
      btnIcon.innerHTML = `
        <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      `;

      // Simulação de Envio de E-mail
      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.innerHTML = originalHtml;
        btnIcon.innerHTML = originalIcon;

        // Mostrar Feedback de Sucesso
        formSuccess.style.display = 'block';
        formSuccess.style.animation = 'fadeIn 0.4s ease forwards';
        contactForm.reset();

        // Remover mensagem após 6 segundos
        setTimeout(() => {
          formSuccess.style.animation = 'fadeOut 0.4s ease forwards';
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 400);
        }, 6000);

      }, 1800);
    });
  }

  // Adicionar estilos adicionais dinamicamente para animação do spinner de loading
  const style = document.createElement("style");
  style.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(10px); }
    }
  `;
  document.head.appendChild(style);

  // Redundant switcher state logic removed to prevent SyntaxError and ensure single source of truth for language switching.
});
