const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}
const files = walk('d:/gk-fitness-website/app/(screens)');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let newContent = content.replace(/^import React from [\"']react[\"'];\r?\n/gm, '');
  if (newContent !== content) {
    fs.writeFileSync(f, newContent);
    console.log('Updated', f);
  }
});
