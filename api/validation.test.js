const { validateTextLength, MAX_TEXT_LENGTH } = require('./validation');

describe('validateTextLength', () => {
  test('should return valid for text within limit', () => {
    const result = validateTextLength('Hello world');
    expect(result).toEqual({ valid: true });
  });

  test('should return valid for text at maximum limit', () => {
    const maxText = 'a'.repeat(MAX_TEXT_LENGTH);
    const result = validateTextLength(maxText);
    expect(result).toEqual({ valid: true });
  });

  test('should return invalid for text exceeding limit', () => {
    const tooLongText = 'a'.repeat(MAX_TEXT_LENGTH + 1);
    const result = validateTextLength(tooLongText);
    expect(result).toEqual({
      valid: false,
      error: `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters`
    });
  });

  test('should return invalid for empty string', () => {
    const result = validateTextLength('');
    expect(result).toEqual({
      valid: false,
      error: 'Text is required'
    });
  });

  test('should return invalid for null', () => {
    const result = validateTextLength(null);
    expect(result).toEqual({
      valid: false,
      error: 'Text is required'
    });
  });

  test('should return invalid for undefined', () => {
    const result = validateTextLength(undefined);
    expect(result).toEqual({
      valid: false,
      error: 'Text is required'
    });
  });

  test('should return invalid for non-string types', () => {
    const result = validateTextLength(123);
    expect(result).toEqual({
      valid: false,
      error: 'Text is required'
    });
  });
});