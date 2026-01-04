export const revokeIfBlob = (url: string | null) => {
  if (!url) return;
  if (!url.startsWith('blob:')) return;
  URL.revokeObjectURL(url);
};
