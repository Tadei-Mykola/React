import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentName = process.argv[2];

if (!componentName) {
  console.error('Будь ласка, вкажіть ім’я компонента');
  process.exit(1);
}

const toPascalCase = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};


const componentPascalCaseName = toPascalCase(componentName);

const componentDir = join(__dirname, '../src', 'components', componentName);

const jsxTemplate = `
import './${componentName}.scss';

export function ${componentPascalCaseName}() {
  return (
    <div className="${componentName}">
      <h1>${componentPascalCaseName} компонент</h1>
    </div>
  );
}

`;

const scssTemplate = `
.${componentName} {
  
}
`;

mkdirSync(componentDir, { recursive: true });
writeFileSync(join(componentDir, `${componentName}.jsx`), jsxTemplate);
writeFileSync(join(componentDir, `${componentName}.scss`), scssTemplate);

console.log(`Компонент ${componentPascalCaseName} створено в ${componentDir}`);
