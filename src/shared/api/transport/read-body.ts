export type ReadBodyResult =
  | { kind: 'json'; data: unknown; rawText: string; contentType: string }
  | { kind: 'invalid_json'; data: null; rawText: string; contentType: string }
  | { kind: 'text'; data: null; rawText: string; contentType: string };

export const readBody = async (res: Response): Promise<ReadBodyResult> => {
  const contentType = res.headers.get('Content-Type') || '';
  const rawText = await res.text().catch(() => '');

  const trimmed = rawText.trim();
  const looksJson =
    contentType.includes('application/json') ||
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'));

  if (looksJson && trimmed) {
    try {
      const data = JSON.parse(trimmed);
      return { kind: 'json', data, rawText, contentType };
    } catch {
      return { kind: 'invalid_json', data: null, rawText, contentType };
    }
  }

  return { kind: 'text', data: null, rawText, contentType };
};
