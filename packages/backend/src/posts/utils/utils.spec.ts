import { convertToSlug } from './utils';

describe('convertToSlug', () => {
  it('should convert a string to a slug', () => {
    expect(convertToSlug('This is a test')).toBe('this-is-a-test');
    expect(convertToSlug(' "This is a test" ')).toBe('this-is-a-test');
    expect(convertToSlug('"The Dancing Flames of Passion"')).toBe(
      'the-dancing-flames-of-passion'
    );
    expect(convertToSlug('"Heaven\'s Bespoken Blue"')).toBe(
      'heavens-bespoken-blue'
    );
  });
});
