const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 4312);
const routeAliases = new Map([
  ['/news', '/index.html'],
  ['/contact', '/index.html'],
  ['/story', '/index.html'],
  ['/studio', '/studio-standalone.html'],
  ['/stitchmark', '/stitchmark-space.html']
]);

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4'
};

function resolvePath(urlPath) {
  let reqPath = decodeURIComponent(urlPath.split('?')[0]);
  if (routeAliases.has(reqPath)) reqPath = routeAliases.get(reqPath);
  if (reqPath.startsWith('/work/') && !path.extname(reqPath)) reqPath = '/work/index.html';
  if (reqPath === '/') reqPath = '/index.html';
  if (!path.extname(reqPath)) reqPath = `${reqPath}/index.html`;
  const fullPath = path.normalize(path.join(root, reqPath));
  if (!fullPath.startsWith(root)) return null;
  return fullPath;
}

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url || '/');
  if (!filePath) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static mirror listening on http://127.0.0.1:${port}`);
});
