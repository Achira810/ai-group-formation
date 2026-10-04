import DOMPurify from 'dompurify';

export const cleanStudentName = (name) => {
  if (!name) return 'Student';
  const raw = String(name).trim();
  const safeStr = typeof DOMPurify !== 'undefined' && typeof DOMPurify.sanitize === 'function'
    ? DOMPurify.sanitize(raw)
    : raw.replace(/[<>]/g, '');

  let cleaned = safeStr
    .replace(/^undefined\s*/gi, '')
    .replace(/\s*\(Hons\)[^,]*/gi, '')
    .replace(/\s*-\s*(BSc|BTech|Civil|Software|Data Science|Computer Science|IT|ICT|Logistics|Nursing|Management|Spatial|Quantity|Law|Criminology|Strategic)[^,]*/gi, '')
    .replace(/,\s*Social Sciences & Humanities.*/gi, '')
    .replace(/\s*(Civil|Engineering|Computing|Logistics|Humanities|Management|Science|Data|Software|Architecture|Nursing|Pharmacy)\s*$/gi, '')
    .trim();

  return cleaned || 'Student';
};

export const sanitizeSpreadsheetCell = (val) => {
  if (val === null || val === undefined) return '';
  const str = String(val).trim();
  // Prevent formula injection (CSV/Excel DDE injection attacks)
  if (/^[=+@\-\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
};

export const getInitials = (name) => {
  const cleaned = cleanStudentName(name);
  if (!cleaned) return 'ST';
  const parts = cleaned.split(' ');
  if (parts.length >= 2 && parts[0] && parts[1] && parts[0][0] && parts[1][0]) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
};

export const getAvatarBg = (id) => {
  const colors = [
    'linear-gradient(135deg, #6366f1, #4f46e5)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  ];
  let charCodeSum = 0;
  const str = String(id || 'STU');
  for (let i = 0; i < str.length; i++) charCodeSum += str.charCodeAt(i);
  return colors[charCodeSum % colors.length];
};
