function convertToSlug(categoryName) {
  // Convert the string to lowercase
  let slug = categoryName.toLowerCase();
  // Replace Vietnamese diacritics with their non-diacritic counterparts
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Replace spaces with hyphens
  slug = slug.replace(/\s+/g, '-');
  // Remove any characters that are not letters, numbers, or hyphens
  slug = slug.replace(/[^a-z0-9-]/g, '');
  return slug;
}
 module.exports = convertToSlug;