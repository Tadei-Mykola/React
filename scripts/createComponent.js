import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentName = process.argv[2];
const componentPath = process.argv[3] || '';

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
const lowerComponentPascalCaseName = componentPascalCaseName.charAt(0).toLowerCase() + componentPascalCaseName.slice(1);

const componentDir = join(__dirname, '../src', 'components', componentPath, lowerComponentPascalCaseName);

const jsxTemplate = `
import './${lowerComponentPascalCaseName}.scss';

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
writeFileSync(join(componentDir, `${lowerComponentPascalCaseName}.jsx`), jsxTemplate);
writeFileSync(join(componentDir, `${lowerComponentPascalCaseName}.scss`), scssTemplate);

console.log(`Компонент ${componentPascalCaseName} створено в ${componentDir}`);
