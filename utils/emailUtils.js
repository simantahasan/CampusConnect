// utils/emailUtils.js

// Normalize a string: lowercase, trim, remove extra characters
const normalize = (s) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s]/g, '') // remove non-letter chars
    .replace(/\s+/g, ' ');

// Generate the canonical G-Suite email from full name
function generateCanonicalGsuite(fullName) {
  const parts = normalize(fullName).split(' ').filter(Boolean);
  if (parts.length < 2) throw new Error('Full name must have at least first and last name');

  // Join all parts with dot
  const localPart = parts.join('.');
  return `${localPart}@g.bracu.ac.bd`;
}

// Validate if provided email matches exactly the canonical email
function isValidGsuiteEmail(fullName, email) {
  const canonicalEmail = generateCanonicalGsuite(fullName);
  return email.trim().toLowerCase() === canonicalEmail;
}

// Check domain separately if needed
function isValidGsuiteDomain(email) {
  const domain = (email.split('@')[1] || '').toLowerCase();
  return domain === 'g.bracu.ac.bd';
}

module.exports = {
  generateCanonicalGsuite,
  isValidGsuiteEmail,
  isValidGsuiteDomain
};
