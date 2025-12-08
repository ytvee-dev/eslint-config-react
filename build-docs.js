const fs = require('fs');
const path = require('path');

function markdownToHTML(markdown) {
  let html = markdown;

  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<div class="code-block"><pre><code>$2</code></pre></div>');

  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

  html = html
    .split('\n\n')
    .map((p) => {
      if (p.match(/^<(h[1-6]|div|ul|code)/)) return p;
      if (p.trim() === '') return '';
      return `<p>${p.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');

  return html;
}

function createHTMLPage(title, content, lang = 'en') {
  const backText = lang === 'ru' ? '← Назад на главную' : '← Back to Home';
  const madeWithText = lang === 'ru' ? 'Сделано с' : 'Made with';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - @ytvee-dev/eslint-config-react</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .doc-content {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .doc-content h1 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            color: #2c3e50;
        }
        .doc-content h2 {
            font-size: 2rem;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            color: #34495e;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 0.5rem;
        }
        .doc-content h3 {
            font-size: 1.5rem;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            color: #2c3e50;
        }
        .doc-content h4 {
            font-size: 1.25rem;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: #34495e;
        }
        .doc-content p {
            line-height: 1.8;
            margin-bottom: 1rem;
            color: #444;
        }
        .doc-content ul, .doc-content ol {
            margin-bottom: 1.5rem;
            padding-left: 2rem;
        }
        .doc-content li {
            line-height: 1.8;
            margin-bottom: 0.5rem;
            color: #444;
        }
        .doc-content code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            color: #e74c3c;
        }
        .doc-content .code-block {
            background: #282c34;
            border-radius: 8px;
            padding: 20px;
            margin: 1.5rem 0;
            overflow-x: auto;
        }
        .doc-content .code-block pre {
            margin: 0;
            color: #abb2bf;
            font-family: 'Courier New', monospace;
            font-size: 0.95rem;
            line-height: 1.6;
        }
        .doc-content .code-block code {
            background: transparent;
            padding: 0;
            color: #abb2bf;
            font-size: inherit;
        }
        .doc-content a {
            color: #3498db;
            text-decoration: none;
            transition: color 0.3s;
        }
        .doc-content a:hover {
            color: #2980b9;
            text-decoration: underline;
        }
        .doc-content strong {
            color: #2c3e50;
            font-weight: 600;
        }
        .back-link {
            display: inline-block;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            transition: background 0.3s;
        }
        .back-link:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        @media (max-width: 768px) {
            .doc-content {
                padding: 20px 15px;
            }
            .doc-content h1 {
                font-size: 2rem;
            }
            .doc-content h2 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
<header class="header">
    <div class="container">
        <div class="header-content">
            <h1 class="logo">
                <a href="../../index.html" style="color: inherit; text-decoration: none;">@ytvee-dev/eslint-config-react</a>
            </h1>
            <nav class="nav">
                <a href="../../index.html" class="back-link">${backText}</a>
            </nav>
        </div>
    </div>
</header>

<div class="container">
    <main class="content">
        <div class="doc-content">
            ${content}
        </div>
        
        <footer class="footer">
            <div class="footer-content">
                <p>
                    ${madeWithText} ❤️ by
                    <a href="https://github.com/ytvee-dev" target="_blank">YT-DEV</a>
                </p>
                <p class="footer-links">
                    <a href="https://github.com/ytvee-dev/eslint-config-react" target="_blank">GitHub</a>
                    <span>•</span>
                    <a href="https://www.npmjs.com/package/@ytvee-dev/eslint-config-react" target="_blank">NPM</a>
                    <span>•</span>
                    <a href="https://github.com/ytvee-dev/eslint-config-react/blob/main/LICENSE" target="_blank">ISC License</a>
                </p>
            </div>
        </footer>
    </main>
</div>
</body>
</html>`;
}

const docs = [
  { input: 'PROFILES.md', output: 'page/profiles.html', title: 'Profiles Guide', lang: 'en' },
  { input: 'PROFILES_RU.md', output: 'page/profiles-ru.html', title: 'Руководство по профилям', lang: 'ru' },
  { input: 'README_STYLEGUIDE.md', output: 'page/style-guide.html', title: 'Style Guide', lang: 'en' },
  { input: 'README_STYLEGUIDE_RU.md', output: 'page/style-guide-ru.html', title: 'Стайлгайд', lang: 'ru' },
  { input: 'README_RULES.md', output: 'page/rules.html', title: 'Rules Reference', lang: 'en' },
  { input: 'README_RULES_RU.md', output: 'page/rules-ru.html', title: 'Справочник правил', lang: 'ru' },
];

const docsDir = path.join(__dirname, 'docs');

docs.forEach((doc) => {
  const inputPath = path.join(docsDir, doc.input);
  const outputPath = path.join(docsDir, doc.output);

  console.log(`Processing ${doc.input}...`);

  const markdown = fs.readFileSync(inputPath, 'utf8');
  const htmlContent = markdownToHTML(markdown);
  const fullHTML = createHTMLPage(doc.title, htmlContent, doc.lang);

  fs.writeFileSync(outputPath, fullHTML);
  console.log(`✓ Created ${doc.output}`);
});

console.log('\nAll documentation pages created successfully!');
