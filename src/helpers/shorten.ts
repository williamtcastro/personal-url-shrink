export const makeShortUrl = (length: number) => {
  let url = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRTUVVWXYZabcdefghijklmnopqrtuvvwxyz0123456789' as const;

  for (let i = 0; i < length; i++) {
    url += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return url;
};
