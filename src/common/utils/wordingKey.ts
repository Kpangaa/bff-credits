export const getWordingByKey = (wording, key) => {
  const keys = key.split('.');
  let result = wording;
  for (const k of keys) {
    result = result[k];
    if (!result) {
      break;
    }
  }
  return result;
};

export const replacePlaceholders = (template, data) => {
  return template.replace(
    /\{\{(.*?)\}\}/g,
    (match, key) => data[key.trim()] || match,
  );
};
