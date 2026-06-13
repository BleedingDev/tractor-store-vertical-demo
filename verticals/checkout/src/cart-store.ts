import { useEffect, useMemo, useState } from 'react';

export interface CartLine {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  slug: string;
}

export interface CartOrder {
  id: string;
  lines: CartLine[];
  total: number;
}

const storageKey = 'ultramodern-tractor-cart';
const cartEvent = 'ultramodern-cart-change';
const orderStorageKey = 'ultramodern-tractor-last-order';
const orderSequenceStorageKey = 'ultramodern-tractor-order-sequence';
const finishSuffixPattern =
  / (Baltic Blue|Polder Green|Sahara Dawn|Silver|Tulip Magenta|Vintage Pink|Zestful Horizon)$/u;
const fieldLoader: CartLine = {
  id: 'CL-08-GR',
  image: 'https://blueprint.the-tractor.store/cdn/img/product/200/CL-08-GR.webp',
  name: 'Holland Hamster Polder Green',
  price: 7750,
  quantity: 1,
  slug: 'holland-hamster',
};

const productImage = (sku: string) =>
  `https://blueprint.the-tractor.store/cdn/img/product/200/${sku}.webp`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, '-')
    .replaceAll(/^-|-$/gu, '');

const lineFromUnknown = (value: unknown): CartLine | undefined => {
  if (typeof value !== 'object' || value === null) {
    return;
  }

  const candidate = value as Partial<CartLine>;
  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.name !== 'string' ||
    typeof candidate.price !== 'number'
  ) {
    return;
  }

  return {
    id: candidate.id,
    image:
      typeof candidate.image === 'string' && candidate.image.length > 0
        ? candidate.image
        : productImage(candidate.id),
    name: candidate.name,
    price: candidate.price,
    quantity:
      typeof candidate.quantity === 'number' && candidate.quantity > 0 ? candidate.quantity : 1,
    slug:
      typeof candidate.slug === 'string' && candidate.slug.length > 0
        ? candidate.slug
        : slugify(candidate.name.replace(finishSuffixPattern, '')),
  };
};

const readCart = (): CartLine[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const value = window.localStorage.getItem(storageKey);
    if (value === null || value.length === 0) {
      return [];
    }
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed)
      ? parsed.map(lineFromUnknown).filter((line): line is CartLine => line !== undefined)
      : [];
  } catch {
    return [];
  }
};

const writeCart = (lines: CartLine[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent(cartEvent));
};

const nextOrderId = () => {
  if (typeof window === 'undefined') {
    return 'tractor-1';
  }

  const current = Number(window.localStorage.getItem(orderSequenceStorageKey) ?? '0');
  const next = Number.isFinite(current) ? current + 1 : 1;
  window.localStorage.setItem(orderSequenceStorageKey, String(next));
  return `tractor-${next.toString(36)}`;
};

const readLastOrder = (): CartOrder | undefined => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const value = window.localStorage.getItem(orderStorageKey);
    if (value === null || value.length === 0) {
      return;
    }

    const parsed = JSON.parse(value) as Partial<CartOrder>;
    if (typeof parsed.id !== 'string' || !Array.isArray(parsed.lines)) {
      return;
    }

    const lines = parsed.lines
      .map(lineFromUnknown)
      .filter((line): line is CartLine => line !== undefined);
    return {
      id: parsed.id,
      lines,
      total:
        typeof parsed.total === 'number'
          ? parsed.total
          : lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    };
  } catch {
    return undefined;
  }
};

const updateLine = (id: string, updater: (line: CartLine) => CartLine | undefined) => {
  const next = readCart()
    .map((line) => (line.id === id ? updater(line) : line))
    .filter((line): line is CartLine => line !== undefined);
  writeCart(next);
};

export const useCartLines = () => {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const refresh = () => setLines(readCart());
    refresh();
    window.addEventListener(cartEvent, refresh);
    window.addEventListener('storage', refresh);

    return () => {
      window.removeEventListener(cartEvent, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return useMemo(
    () => ({
      addFieldLoader: () => {
        const existing = readCart();
        const match = existing.find((line) => line.id === fieldLoader.id);
        if (match === undefined) {
          writeCart([...existing, fieldLoader]);
          return;
        }
        writeCart(
          existing.map((line) =>
            line.id === fieldLoader.id ? { ...line, quantity: line.quantity + 1 } : line,
          ),
        );
      },
      addProduct: (product: Omit<CartLine, 'quantity'>) => {
        const existing = readCart();
        const match = existing.find((line) => line.id === product.id);
        if (match === undefined) {
          writeCart([...existing, { ...product, quantity: 1 }]);
          return;
        }
        writeCart(
          existing.map((line) =>
            line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
          ),
        );
      },
      decrement: (id: string) =>
        updateLine(id, (line) =>
          line.quantity > 1 ? { ...line, quantity: line.quantity - 1 } : undefined,
        ),
      increment: (id: string) =>
        updateLine(id, (line) => ({ ...line, quantity: line.quantity + 1 })),
      lines,
      placeOrder: () => {
        const currentLines = readCart();
        if (currentLines.length === 0) {
          return;
        }

        const order: CartOrder = {
          id: nextOrderId(),
          lines: currentLines,
          total: currentLines.reduce((sum, line) => sum + line.price * line.quantity, 0),
        };

        window.localStorage.setItem(orderStorageKey, JSON.stringify(order));
        writeCart([]);
        return order;
      },
      remove: (id: string) => writeCart(readCart().filter((line) => line.id !== id)),
      total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    }),
    [lines],
  );
};

export const useLastOrder = () => {
  const [order, setOrder] = useState<CartOrder | undefined>();

  useEffect(() => {
    setOrder(readLastOrder());
  }, []);

  return order;
};
