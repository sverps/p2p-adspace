export const media = (query: string, className: string) => {
  return className.split(" ").map(c => (c.includes(":") ? c : `${query}:${c}`));
};

export const md = (className: string) => media("md", className);
