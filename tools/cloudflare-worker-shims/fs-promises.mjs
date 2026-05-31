export const readFile = async () => {
  throw new Error('fs/promises is unavailable in the Cloudflare Worker runtime');
};

export default {
  readFile,
};
