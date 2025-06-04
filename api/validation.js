const MAX_TEXT_LENGTH = 1200;

function validateTextLength(text) {
  if (!text || typeof text !== 'string') {
    return { valid: false, error: 'Text is required' };
  }
  
  if (text.length > MAX_TEXT_LENGTH) {
    return { valid: false, error: `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters` };
  }
  
  return { valid: true };
}

module.exports = { validateTextLength, MAX_TEXT_LENGTH };