/**
 * Utility functions for generating output files in different formats
 */

interface KeyValuePair {
  key: string;
  value: string;
}

// Utility to convert flat key-value pairs back to nested object
function unflattenObject(pairs: KeyValuePair[]): any {
  const result: any = {};
  
  for (const { key, value } of pairs) {
    // Handle array notation like "user.preferences[0].color"
    const parts = key.split(/\.|\[|\]\.?/).filter(Boolean);
    let current = result;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isArrayIndex = /^\d+$/.test(part);
      const isLastPart = i === parts.length - 1;
      
      if (isLastPart) {
        current[part] = value;
      } else {
        const nextPart = parts[i + 1];
        const nextIsArrayIndex = /^\d+$/.test(nextPart);
        
        if (!current[part]) {
          current[part] = nextIsArrayIndex ? [] : {};
        }
        
        current = current[part];
      }
    }
  }
  
  return result;
}

// Generate JSON file from key-value pairs
export function generateJsonFile(pairs: KeyValuePair[]): string {
  const nestedObject = unflattenObject(pairs);
  return JSON.stringify(nestedObject, null, 2);
}

// Generate XML file from key-value pairs
export function generateXmlFile(pairs: KeyValuePair[]): string {
  // Basic XML generation for demonstration
  // In a real app, would use a proper XML generation library
  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
  
  for (const { key, value } of pairs) {
    const escapedValue = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
    
    xmlContent += `  <string name="${key}">${escapedValue}</string>\n`;
  }
  
  xmlContent += '</root>';
  return xmlContent;
}

// Generate RESW file from key-value pairs
export function generateReswFile(pairs: KeyValuePair[]): string {
  // Basic RESW generation for demonstration
  let reswContent = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
  
  for (const { key, value } of pairs) {
    const escapedValue = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
    
    reswContent += `  <data name="${key}" xml:space="preserve">
    <value>${escapedValue}</value>
    <comment>Translated by Polyglot AI</comment>
  </data>\n`;
  }
  
  reswContent += '</root>';
  return reswContent;
}

// Generate Pages file from key-value pairs (simplified as JSON for demo)
export function generatePagesFile(pairs: KeyValuePair[]): string {
  const nestedObject = unflattenObject(pairs);
  // In a real implementation, this would format according to Pages specifications
  return JSON.stringify(nestedObject, null, 2);
}

// Generate file based on format
export function generateFile(
  pairs: KeyValuePair[],
  format: 'json' | 'xml' | 'resw' | 'pages'
): string {
  switch (format) {
    case 'json':
      return generateJsonFile(pairs);
    case 'xml':
      return generateXmlFile(pairs);
    case 'resw':
      return generateReswFile(pairs);
    case 'pages':
      return generatePagesFile(pairs);
    default:
      throw new Error('Unsupported output format');
  }
}

// Create downloadable file blob
export function createFileBlob(
  content: string,
  mimeType: string
): Blob {
  return new Blob([content], { type: mimeType });
}

// Generate file download for a specific language
export function generateDownloadableFile(
  pairs: KeyValuePair[],
  format: 'json' | 'xml' | 'resw' | 'pages',
  languageCode: string,
  fileName: string
): { blob: Blob; fileName: string } {
  const content = generateFile(pairs, format);
  
  let mimeType: string;
  switch (format) {
    case 'json':
      mimeType = 'application/json';
      break;
    case 'xml':
    case 'resw':
      mimeType = 'application/xml';
      break;
    case 'pages':
      mimeType = 'application/json'; // Simplified for demo
      break;
    default:
      mimeType = 'text/plain';
  }
  
  const blob = createFileBlob(content, mimeType);
  const baseFileName = fileName.split('.')[0];
  const fileExtension = format === 'pages' ? 'pages' : format;
  
  return {
    blob,
    fileName: `${baseFileName}.${languageCode}.${fileExtension}`
  };
}