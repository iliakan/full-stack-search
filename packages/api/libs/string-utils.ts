
/**
 * Generate a set of suffixes for a given string
 * @param string A string (such as a hotel name)
 * @returns A set of all suffixes 
 */
export function generateSuffixes(string: string) {
  const suffixes = new Set<string>();

  for (let start = 0; start < string.length; start++) {
    suffixes.add(string.slice(start));
  }

  return suffixes;
}
