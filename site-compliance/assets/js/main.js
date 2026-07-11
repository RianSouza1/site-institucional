document.addEventListener('DOMContentLoaded', () => {
  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  // Executar no carregamento inicial caso a página já esteja scrollada
  handleScroll();

  // --- MOBILE MENU TOGGLE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Fechar o menu ao clicar em qualquer link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- CONTACT FORM INTERACTIVITY ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Pegar campos para animação de sucesso
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Desabilitar botão e mostrar estado de carregamento
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px; animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Enviando...
      `;

      // Simular envio de API (mock)
      setTimeout(() => {
        // Estilizar botão com sucesso
        submitBtn.style.background = 'var(--success)';
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg> Enviado com Sucesso!
        `;

        // Criar mensagem de sucesso abaixo do formulário
        const successMessage = document.createElement('div');
        successMessage.className = 'glass-panel';
        successMessage.style.padding = '1.5rem';
        successMessage.style.marginTop = '1.5rem';
        successMessage.style.borderColor = 'var(--success)';
        successMessage.style.color = '#fff';
        successMessage.style.textAlign = 'center';
        successMessage.style.animation = 'fadeIn 0.5s ease forwards';
        successMessage.innerHTML = `
          <h3 style="color: var(--success-light); margin-bottom: 0.5rem;">Mensagem Recebida!</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">Agradecemos seu contato. Nossa equipe retornará em até 24 horas úteis.</p>
        `;

        contactForm.appendChild(successMessage);
        contactForm.reset();

        // Resetar o botão após 5 segundos
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.innerHTML = originalText;
          successMessage.style.animation = 'fadeOut 0.5s ease forwards';
          setTimeout(() => successMessage.remove(), 500);
        }, 5000);

      }, 1500);
    });
  }
});

// Adicionar estilos de animação dinamicamente para o formulário
const styleSheet = document.createElement("style");
styleSheet.innerText = `
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
document.head.appendChild(styleSheet);
