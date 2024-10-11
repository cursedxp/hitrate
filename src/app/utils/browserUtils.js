export function getBrowserLanguageAndRegion() {
  let language = "en"; // Default to English
  let region = "US";

  if (typeof navigator !== "undefined" && navigator.language) {
    // Get language
    language = navigator.language.split("-")[0]; // e.g., 'en-US' becomes 'en'

    // Get region
    if (navigator.language.includes("-")) {
      region = navigator.language.split("-")[1].toUpperCase();
    } else if (navigator.languages && navigator.languages.length > 0) {
      for (let lang of navigator.languages) {
        if (lang.includes("-")) {
          region = lang.split("-")[1].toUpperCase();
          break;
        }
      }
    }
  }

  return { language, region };
}
