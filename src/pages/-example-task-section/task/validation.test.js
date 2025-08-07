import { schema } from './validation.js';
import dayjs from 'dayjs';

describe('Task Validation - Date Validation', () => {
  test('should pass validation for valid date within range', async () => {
    const validData = {
      id: '1',
      subject: 'Test Subject',
      body: 'Test Body',
      dfrom: dayjs().subtract(1, 'year').toDate(),
      address: {
        line1: '123 Main St',
        line2: 'Apt 1',
        line3: 'City, State'
      }
    };

    try {
      await schema.validate(validData);
      expect(true).toBe(true); // Validation passed
    } catch (error) {
      fail(`Validation should have passed: ${error.message}`);
    }
  });

  test('should fail validation for future date', async () => {
    const invalidData = {
      id: '1',
      subject: 'Test Subject',
      body: 'Test Body',
      dfrom: dayjs().add(1, 'year').toDate(),
      address: {
        line1: '123 Main St',
        line2: 'Apt 1',
        line3: 'City, State'
      }
    };

    try {
      await schema.validate(invalidData);
      fail('Validation should have failed for future date');
    } catch (error) {
      expect(error.message).toContain('Date cannot be in the future');
    }
  });

  test('should fail validation for date more than 100 years ago', async () => {
    const invalidData = {
      id: '1',
      subject: 'Test Subject',
      body: 'Test Body',
      dfrom: dayjs().subtract(101, 'year').toDate(),
      address: {
        line1: '123 Main St',
        line2: 'Apt 1',
        line3: 'City, State'
      }
    };

    try {
      await schema.validate(invalidData);
      fail('Validation should have failed for date more than 100 years ago');
    } catch (error) {
      expect(error.message).toContain('Date cannot be earlier than');
    }
  });

  test('should fail validation for missing required date', async () => {
    const invalidData = {
      id: '1',
      subject: 'Test Subject',
      body: 'Test Body',
      address: {
        line1: '123 Main St',
        line2: 'Apt 1',
        line3: 'City, State'
      }
    };

    try {
      await schema.validate(invalidData);
      fail('Validation should have failed for missing date');
    } catch (error) {
      expect(error.message).toContain('From date is required');
    }
  });
});

// Test the validDateRange method directly
describe('validDateRange Method - Parameter Testing', () => {
  const { yup } = require('@/helpers/form-validation');

  test('should use defaults when no parameters provided', async () => {
    const testSchema = yup.object().shape({
      date: yup.date().validDateRange()
    });

    // Test with valid date (within default range)
    const validData = { date: dayjs().subtract(50, 'year').toDate() };
    await expect(testSchema.validate(validData)).resolves.toBeDefined();

    // Test with future date (should fail)
    const futureData = { date: dayjs().add(1, 'year').toDate() };
    await expect(testSchema.validate(futureData)).rejects.toThrow('Date cannot be in the future');

    // Test with very old date (should fail)
    const oldData = { date: dayjs().subtract(101, 'year').toDate() };
    await expect(testSchema.validate(oldData)).rejects.toThrow('Date cannot be earlier than');
  });

  test('should use custom min and max parameters', async () => {
    const customMin = dayjs().subtract(18, 'year');
    const customMax = dayjs().subtract(1, 'day');
    
    const testSchema = yup.object().shape({
      date: yup.date().validDateRange(customMin, customMax, "Must be between 18 years ago and yesterday")
    });

    // Test with valid date (within custom range)
    const validData = { date: dayjs().subtract(10, 'year').toDate() };
    await expect(testSchema.validate(validData)).resolves.toBeDefined();

    // Test with date too old (should fail)
    const tooOldData = { date: dayjs().subtract(20, 'year').toDate() };
    await expect(testSchema.validate(tooOldData)).rejects.toThrow('Must be between 18 years ago and yesterday');

    // Test with future date (should fail)
    const futureData = { date: dayjs().add(1, 'day').toDate() };
    await expect(testSchema.validate(futureData)).rejects.toThrow('Must be between 18 years ago and yesterday');
  });

  test('should use custom message when provided', async () => {
    const testSchema = yup.object().shape({
      date: yup.date().validDateRange(null, null, "Custom error message")
    });

    // Test with future date (should fail with custom message)
    const futureData = { date: dayjs().add(1, 'year').toDate() };
    await expect(testSchema.validate(futureData)).rejects.toThrow('Custom error message');
  });
}); 