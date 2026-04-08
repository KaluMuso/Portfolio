const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const projects = [
  { name: 'fashion-store.png', url: 'https://thirteenfh.vercel.app' },
  { name: 'ecommerce-store.png', url: 'https://vergeo-21ffc.web.app/' },
  // For automation, we can use a placeholder or a generic diagram URL if available
  { name: 'whatsapp-todo.png', url: 'https://placehold.co/1200x630/2563eb/white?text=WhatsApp+Automation+Workflow' },
  { name: 'nonprofit.png', url: 'https://placehold.co/1200x630/111827/white?text=Non-Profit+Organization' },
];

async function takeScreenshots() {
  const dir = path.join(process.cwd(), 'public', 'images', 'projects');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  for (const project of projects) {
    console.log(`Taking screenshot for ${project.name}...`);
    try {
      if (project.url.includes('placehold.co')) {
         await page.goto(project.url);
      } else {
        await page.goto(project.url, { waitUntil: 'networkidle2' });
      }
      await page.screenshot({ path: path.join(dir, project.name) });
    } catch (err) {
      console.error(`Failed to screenshot ${project.name}:`, err);
    }
  }

  await browser.close();
  console.log('Done!');
}

takeScreenshots();
