import { useEffect, useMemo, useState } from 'react';

export interface CartLine {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const storageKey = 'ultramodern-tractor-cart';
const cartEvent = 'ultramodern-cart-change';
const fieldLoader: CartLine = {
  id: 'CL-08-GR',
  name: 'Holland Hamster Polder Green',
  price: 7750,
  quantity: 1,
};

const readCart = (): CartLine[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const value = window.localStorage.getItem(storageKey);
    return value !== null && value.length > 0 ? (JSON.parse(value) as CartLine[]) : [];
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

const updateLine = (id: string, updater: (line: CartLine) => CartLine | undefined) => {
  const next = readCart()
    .map((line) => (line.id === id ? updater(line) : line))
    .filter((line): line is CartLine => line !== undefined);
  writeCart(next);
};

export const useCartLines = () => {
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
      remove: (id: string) => writeCart(readCart().filter((line) => line.id !== id)),
      total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    }),
    [lines],
  );
};
