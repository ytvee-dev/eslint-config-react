const langToggle = document.getElementById('langToggle');
const { body } = document;

const savedLang = localStorage.getItem('docs-lang') || 'en';
setLanguage(savedLang);

langToggle.addEventListener('click', () => {
  const currentLang = body.getAttribute('data-lang') || 'en';
  const newLang = currentLang === 'en' ? 'ru' : 'en';
  setLanguage(newLang);
  localStorage.setItem('docs-lang', newLang);
});

function setLanguage(lang) {
  body.setAttribute('data-lang', lang);

  document.querySelectorAll('[data-en][data-ru]').forEach((element) => {
    const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-ru');

    if (element.children.length > 0) {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

      let node;
      const textNodes = [];
      while ((node = walker.nextNode())) {
        if (node.nodeValue.trim() && !node.parentElement.closest('code')) {
          textNodes.push(node);
        }
      }

      if (textNodes.length > 0) {
        textNodes[0].nodeValue = text;
      }
    } else {
      element.textContent = text;
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      history.pushState(null, null, this.getAttribute('href'));
    }
  });
});

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (window.pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      highlightNavigation();
      ticking = false;
    });
    ticking = true;
  }
});

highlightNavigation();

const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    background-color: var(--color-primary);
    color: white;
    font-weight: 600;
  }
  
  .nav-link.active:hover {
    background-color: var(--color-primary-dark);
  }
`;
document.head.appendChild(style);

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 'l') {
    e.preventDefault();
    langToggle.click();
  }

  if (e.altKey && e.key === 'h') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

function addSearchBox() {
  const sidebar = document.querySelector('.sidebar-nav');
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  searchContainer.innerHTML = `
    <input 
      type="text" 
      id="docSearch" 
      class="search-input" 
      placeholder="Search..."
      aria-label="Search documentation"
    >
  `;

  sidebar.insertBefore(searchContainer, sidebar.firstChild);

  const searchInput = document.getElementById('docSearch');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    if (query.length < 2) {
      document.querySelectorAll('.section').forEach((section) => {
        section.style.display = '';
      });
      return;
    }

    document.querySelectorAll('.section').forEach((section) => {
      const text = section.textContent.toLowerCase();
      if (text.includes(query)) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
  });
}

const searchStyle = document.createElement('style');
searchStyle.textContent = `
  .search-container {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border);
  }
  
  .search-input {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    font-size: 0.875rem;
    font-family: var(--font-sans);
    transition: var(--transition);
    background-color: white;
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
  
  .search-input::placeholder {
    color: var(--color-text-light);
  }
`;
document.head.appendChild(searchStyle);

addSearchBox();

document.querySelectorAll('.code-block').forEach((block) => {
  const button = document.createElement('button');
  button.className = 'copy-button';
  button.textContent = 'Copy';
  button.setAttribute('aria-label', 'Copy code');

  button.addEventListener('click', async () => {
    const code = block.querySelector('code').textContent;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = 'Copied!';
      button.classList.add('copied');
      setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });

  block.style.position = 'relative';
  block.appendChild(button);
});

const copyButtonStyle = document.createElement('style');
copyButtonStyle.textContent = `
  .copy-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.375rem 0.75rem;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    opacity: 0;
  }
  
  .code-block:hover .copy-button {
    opacity: 1;
  }
  
  .copy-button:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-1px);
  }
  
  .copy-button:active {
    transform: translateY(0);
  }
  
  .copy-button.copied {
    background-color: #4caf50;
  }
`;
document.head.appendChild(copyButtonStyle);
