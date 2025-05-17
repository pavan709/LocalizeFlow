/**
 * Utility functions for parsing different file formats
 */

interface KeyValuePair {
  key: string;
  value: string;
}

// Parse JSON files
export function parseJson(content: string): KeyValuePair[] {
  try {
    const jsonData = JSON.parse(content);
    return flattenObject(jsonData);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
}

// Parse XML files
export function parseXml(content: string): KeyValuePair[] {
  try {
    // Note: In a real implementation, we would use a proper XML parser library
    // This is a simplified implementation for demonstration
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'application/xml');
    const result: KeyValuePair[] = [];
    
    // Process XML nodes recursively
    function processNode(node: Element, path: string = '') {
      Array.from(node.children).forEach(child => {
        const currentPath = path ? `${path}.${child.tagName}` : child.tagName;
        
        if (child.children.length === 0) {
          result.push({
            key: currentPath,
            value: child.textContent || ''
          });
        } else {
          processNode(child, currentPath);
        }
      });
    }
    
    processNode(xmlDoc.documentElement);
    return result;
  } catch (error) {
    throw new Error('Invalid XML format');
  }
}

// Parse RESW files
export function parseResw(content: string): KeyValuePair[] {
  try {
    // Note: In a real implementation, we would use a proper XML parser library
    // This is a simplified implementation for demonstration
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'application/xml');
    const result: KeyValuePair[] = [];
    
    const dataNodes = xmlDoc.querySelectorAll('data');
    dataNodes.forEach(node => {
      const key = node.getAttribute('name') || '';
      const valueNode = node.querySelector('value');
      const value = valueNode ? valueNode.textContent || '' : '';
      
      if (key) {
        result.push({ key, value });
      }
    });
    
    return result;
  } catch (error) {
    throw new Error('Invalid RESW format');
  }
}

// Parse Pages files (assuming JSON-like structure for this example)
export function parsePages(content: string): KeyValuePair[] {
  try {
    // Note: In a real implementation, we would use a proper parser for Pages format
    // This is a simplified implementation for demonstration
    const jsonData = JSON.parse(content);
    return flattenObject(jsonData);
  } catch (error) {
    throw new Error('Invalid Pages format');
  }
}

// Utility function to flatten nested objects
function flattenObject(obj: any, prefix: string = ''): KeyValuePair[] {
  const result: KeyValuePair[] = [];
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        // Recursively flatten nested objects
        result.push(...flattenObject(obj[key], prefixedKey));
      } else {
        // Only include string values
        if (typeof obj[key] === 'string') {
          result.push({
            key: prefixedKey,
            value: obj[key]
          });
        } else if (Array.isArray(obj[key])) {
          // Handle arrays by creating indexed keys
          obj[key].forEach((item: any, index: number) => {
            if (typeof item === 'string') {
              result.push({
                key: `${prefixedKey}[${index}]`,
                value: item
              });
            } else if (typeof item === 'object' && item !== null) {
              result.push(...flattenObject(item, `${prefixedKey}[${index}]`));
            }
          });
        }
      }
    }
  }
  
  return result;
}

// Determine file format by extension
export function getFileFormat(fileName: string): 'json' | 'xml' | 'resw' | 'pages' | null {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'json':
      return 'json';
    case 'xml':
      return 'xml';
    case 'resw':
      return 'resw';
    case 'pages':
      return 'pages';
    default:
      return null;
  }
}

// Parse file based on format
export async function parseFile(file: File): Promise<KeyValuePair[]> {
  const format = getFileFormat(file.name);
  
  if (!format) {
    throw new Error('Unsupported file format');
  }
  
  const content = await file.text();
  
  switch (format) {
    case 'json':
      return parseJson(content);
    case 'xml':
      return parseXml(content);
    case 'resw':
      return parseResw(content);
    case 'pages':
      return parsePages(content);
    default:
      throw new Error('Unsupported file format');
  }
}