// utils/aiEmailVerify.js

const axios = require('axios');

/**
 * aiEmailVerify - Verifies an email using an AI/email API
 * @param {string} email - The email to verify
 * @param {string} apiKey - Your API key (e.g., Hunter.io)
 * @returns {Promise<Object>} - { success: boolean, message: string }
 */
async function aiEmailVerify(email, apiKey) {
  if (!apiKey) {
    return { success: false, message: 'No API key provided' };
  }

  try {
    // --- Example with Hunter.io Email Verification API ---
    const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`);

    const data = response.data;
    if (data && data.data && data.data.result) {
      const result = data.data.result; // "deliverable", "undeliverable", etc.
      return {
        success: result === 'deliverable',
        message: `Hunter.io verification: ${result}`
      };
    }

    return { success: false, message: 'AI verification failed' };

  } catch (err) {
    console.error('AI verification error:', err.message);
    return { success: false, message: 'AI verification error' };
  }
}

module.exports = aiEmailVerify;



