export function matchesGlob(path: string, glob: string): boolean {
  // Escape regex special characters
  let regexStr = glob.replace(/([.+^${}()|[\]\\])/g, '\\$1');

  // Convert glob wildcards to regex equivalents
  regexStr = regexStr
    .replace(/\*/g, '.*') // * matches any sequence of characters
    .replace(/\?/g, '.')   // ? matches any single character
    .replace(/{([^}]+)}/g, (match, group: string) => {
      // {a,b} matches 'a' or 'b'
      const options = group.split(',').map(option => option.trim());
      return `(${options.join('|')})`;
    });

  console.log(regexStr);
  return new RegExp(`^${regexStr}$`).test(path);
}
