export function sheetParser(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];
  
  const parseCSVRow = (text) => {
    const result = [];
    let curVal = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (inQuotes) {
            if (char === '"') {
                if (i < text.length - 1 && text[i+1] === '"') {
                    curVal += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                curVal += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                result.push(curVal);
                curVal = '';
            } else {
                curVal += char;
            }
        }
    }
    result.push(curVal);
    return result;
  };

  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length < 2) return [];

  const headers = parseCSVRow(lines[0]).map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRow(lines[i]);
    const obj = {};
    headers.forEach((header, index) => {
        obj[header] = (row[index] || '').trim();
    });
    data.push(obj);
  }

  return data;
}
