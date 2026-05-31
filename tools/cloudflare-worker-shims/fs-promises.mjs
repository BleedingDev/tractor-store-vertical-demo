export const readFile = () =>
  Promise.reject(new Error('fs/promises is unavailable in the Cloudflare Worker runtime'));

export default {
  readFile,
};
