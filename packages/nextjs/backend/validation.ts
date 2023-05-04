export function parseSchema(
  query: Record<string, string | string[] | undefined>,
  shape: Record<string, (valueIn: string) => any>,
) {
  return Object.entries(query).reduce((result, [key, value]) => {
    if (shape[key] && value !== undefined) {
      return { ...result, [key]: Array.isArray(value) ? value.map(v => shape[key](v)) : shape[key](value) };
    }
    return result;
  }, {} as any);
}

export const EventSchema = {
  chainId: Number,
  address: String,
  type: Number,
  adspaceIndex: Number,
  bidIndex: Number,
} as const;
