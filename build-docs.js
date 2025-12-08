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
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - @ytvee-dev/eslint-config-react</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<header class="header">
    <div class="container">
        <div class="header-content">
            <h1 class="logo"><a href="../../index.html" style="color: inherit; text-decoration: none;">@ytvee-dev/eslint-config-react</a></h1>
            <nav class="nav">
                <a href="../../index.html" class="back-link" style="margin-right: 20px; color: #fff;">← Back to Home</a>
            </nav>
        </div>
    </div>
</header>

<div class="container main-container">
    <main class="content" style="max-width: 100%;">
        <section class="section">
            <div class="section-content doc-content">
                ${content}
            </div>
        </section>

        <footer class="footer">
            <div class="footer-content">
                <p>
                    Made with ❤️ by
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
