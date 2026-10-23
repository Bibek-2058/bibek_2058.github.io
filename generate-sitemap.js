const fs = require('fs');

const DOMAIN = 'https://pandeybibek.com.np';

try {
  const blogsData = fs.readFileSync('./data/blogs.json', 'utf8');
  const notesData = fs.readFileSync('./data/pscnotes.json', 'utf8');

  const blogs = JSON.parse(blogsData);
  const notes = JSON.parse(notesData);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const staticPages = ['', '/blogs.html', '/pscnotes.html', '/study-assist.html'];
  staticPages.forEach(page => {
    xml += `  <url>\n    <loc>${DOMAIN}${page}</loc>\n    <changefreq>weekly</changefreq>\n  </url>\n`;
  });

  blogs.forEach(blog => {
    const identifier = blog.id || blog.slug;
    xml += `  <url>\n    <loc>${DOMAIN}/blog.html?id=${identifier}</loc>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
  });

  notes.forEach(note => {
    const identifier = note.id || note.slug;
    xml += `  <url>\n    <loc>${DOMAIN}/note.html?id=${identifier}</loc>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
  });

  xml += `</urlset>`;

  fs.writeFileSync('sitemap.xml', xml);
  console.log('✅ sitemap.xml generated successfully via script!');

} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
