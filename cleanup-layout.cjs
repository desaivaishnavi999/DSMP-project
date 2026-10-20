const fs = require('fs');
const path = require('path');

function removeDuplicates(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeDuplicates(fullPath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove Navbar import
      content = content.replace(/import\s+\{\s*Navbar\s*\}\s+from\s+["']@\/components\/Common\/Navbar["'];?\r?\n/g, '');
      
      // Remove Navbar usage
      content = content.replace(/<Navbar[^>]*\/>\r?\n?/g, '');
      
      // Remove footer usage
      content = content.replace(/<footer[\s\S]*?<\/footer>\r?\n?/g, '');
      
      fs.writeFileSync(fullPath, content);
      console.log('Updated ' + file);
    }
  }
}

removeDuplicates(path.join(__dirname, 'src/pages/Student'));
removeDuplicates(path.join(__dirname, 'src/pages/Teacher'));
