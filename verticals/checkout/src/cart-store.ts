import { useEffect, useMemo, useState } from 'react';

export type CartLine = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const storageKey = 'ultramodern-tractor-cart';
const cartEvent = 'ultramodern-cart-change';
const fieldLoader: CartLine = {
  id: 'field-loader-112',
  name: 'Field Loader 112',
  price: 42500,
  quantity: 1,
};

const readCart = (): CartLine[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const value = window.localStorage.getItem(storageKey);
    return value ? (JSON.parse(value) as CartLine[]) : [];
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

const updateLine = (
  id: string,
  updater: (line: CartLine) => CartLine | undefined,
) => {
  const next = readCart()
    .map(line => (line.id === id ? updater(line) : line))
    .filter((line): line is CartLine => Boolean(line));
  writeCart(next);
};

export function useCartLines() {
  const [lines, setLines] = useState<CartLine[]>(() => readCart());

  useEffect(() => {
    const refresh = () => setLines(readCart());
    window.addEventListener(cartEvent, refresh);
    window.addEventListener('storage', refresh);
    refresh();

    return () => {
      window.removeEventListener(cartEvent, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return useMemo(
    () => ({
      lines,
      total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
      addFieldLoader: () => {
        const existing = readCart();
        const match = existing.find(line => line.id === fieldLoader.id);
        writeCart(
          match
            ? existing.map(line =>
                line.id === fieldLoader.id
                  ? { ...line, quantity: line.quantity + 1 }
                  : line,
              )
            : [...existing, fieldLoader],
        );
      },
      increment: (id: string) =>
        updateLine(id, line => ({ ...line, quantity: line.quantity + 1 })),
      decrement: (id: string) =>
        updateLine(id, line =>
          line.quantity > 1 ? { ...line, quantity: line.quantity - 1 } : undefined,
        ),
      remove: (id: string) => writeCart(readCart().filter(line => line.id !== id)),
    }),
    [lines],
  );
}
