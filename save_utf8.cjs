const fs = require('fs');
const { execSync } = require('child_process');

const content = execSync('git show bec4141:src/features/procurement/ProcurementSolutionsPage.tsx', {
  cwd: 'd:/efoucs/efocus-client',
  encoding: 'utf8'
});

fs.writeFileSync('d:/efoucs/efocus-client/src/features/procurement/ProcurementSolutionsPage.tsx', content, 'utf8');
console.log('Successfully saved ProcurementSolutionsPage.tsx as UTF-8!');

