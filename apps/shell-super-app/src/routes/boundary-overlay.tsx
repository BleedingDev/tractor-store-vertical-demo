import { useModernI18n } from '@modern-js/plugin-i18n/runtime';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';

interface BoundaryConfig {
  color: string;
  label: string;
}

type BoundaryBox = BoundaryConfig & {
  component: string | undefined;
  height: number;
  id: string;
  labelPlacement: 'above' | 'inside';
  left: number;
  top: number;
  width: number;
};

declare global {
  interface Window {
    __ULTRAMODERN_BOUNDARIES__?: Partial<
      Record<string, Partial<BoundaryConfig>>
    >;
  }
}

const defaultBoundaryColors = {
  checkout: 'var(--um-boundary-checkout, #f6cf45)',
  decide: 'var(--um-boundary-decide, #30e27a)',
  explore: 'var(--um-boundary-explore, #ff5a5f)',
} as const;

const boundaryIds = ['explore', 'decide', 'checkout'] as const;
const boundaryStorageKey = 'tractor-store.show-team-boundaries';
const boundaryStorageEvent = 'tractor-store-boundary-visibility-change';
const readBoundaryVisibility = () =>
  window.localStorage.getItem(boundaryStorageKey) === 'true';
const readServerBoundaryVisibility = () => false;
const subscribeToBoundaryVisibility = (onStoreChange: () => void) => {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(boundaryStorageEvent, onStoreChange);
  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(boundaryStorageEvent, onStoreChange);
  };
};
const moduleLabel = (
  boundaryId: string | undefined,
  expose: string | undefined
) => {
  if (boundaryId === undefined || boundaryId.length === 0) {
    return;
  }
  if (expose === undefined || expose.length === 0) {
    return boundaryId;
  }
  return `${boundaryId}/${expose.replace(/^\.\//u, '')}`;
};

export default function BoundaryOverlay() {
  const { t } = useModernI18n();
  const enabled = useSyncExternalStore(
    subscribeToBoundaryVisibility,
    readBoundaryVisibility,
    readServerBoundaryVisibility
  );
  const [boxes, setBoxes] = useState<BoundaryBox[]>([]);
  const boundaryConfig = useMemo(() => {
    const runtimeOverrides =
      typeof window === 'undefined'
        ? {}
        : (window.__ULTRAMODERN_BOUNDARIES__ ?? {});

    return Object.fromEntries(
      boundaryIds.map((id) => [
        id,
        {
          color: runtimeOverrides[id]?.color ?? defaultBoundaryColors[id],
          label: runtimeOverrides[id]?.label ?? t(`shell.boundaries.${id}`),
        },
      ])
    ) as Record<string, BoundaryConfig>;
  }, [t]);
  const toggleLabel = t('shell.boundaries.toggle');

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const readBoxes = () => {
      const nextBoxes = [
        ...document.querySelectorAll<HTMLElement>('[data-modern-boundary-id]'),
      ].flatMap((element, index) => {
        const id = element.dataset['modernBoundaryId'] ?? 'unknown';
        const rect = element.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
          return [];
        }
        const fallback = {
          color: 'var(--um-boundary-unknown, #7c8cff)',
          label: id,
        };
        const config = boundaryConfig[id] ?? fallback;

        return [
          {
            ...config,
            component: moduleLabel(id, element.dataset['modernMfExpose']),
            height: rect.height,
            id: `${id}-${index}`,
            labelPlacement: rect.height < 48 ? 'above' : 'inside',
            left: rect.left,
            top: rect.top,
            width: rect.width,
          } satisfies BoundaryBox,
        ];
      });

      setBoxes(nextBoxes);
    };

    readBoxes();

    const resizeObserver = new ResizeObserver(readBoxes);
    for (const element of document.querySelectorAll<HTMLElement>(
      '[data-modern-boundary-id]'
    )) {
      resizeObserver.observe(element);
    }

    const mutationObserver = new MutationObserver(readBoxes);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', readBoxes);
    window.addEventListener('scroll', readBoxes, true);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', readBoxes);
      window.removeEventListener('scroll', readBoxes, true);
    };
  }, [boundaryConfig, enabled]);

  return (
    <>
      <label className="shell:mx-auto shell:mb-8 shell:mt-4 shell:flex shell:w-fit shell:max-w-[calc(100%-2rem)] shell:items-center shell:gap-2 shell:rounded-lg shell:border shell:border-stone-900/10 shell:bg-white/95 shell:px-3 shell:py-2 shell:text-sm shell:font-semibold shell:text-stone-950 shell:shadow-lg shell:shadow-stone-900/10">
        <input
          aria-label={toggleLabel}
          className="shell:size-4 shell:accent-emerald-800"
          checked={enabled}
          onChange={(event) => {
            const nextEnabled = event.currentTarget.checked;
            window.localStorage.setItem(
              boundaryStorageKey,
              String(nextEnabled)
            );
            window.dispatchEvent(new CustomEvent(boundaryStorageEvent));
          }}
          type="checkbox"
        />
        <span>{toggleLabel}</span>
      </label>
      {enabled ? (
        <div
          aria-hidden="true"
          className="shell:pointer-events-none shell:fixed shell:inset-0 shell:z-[70]"
        >
          {boxes.map((box) => (
            <div
              className="shell:fixed shell:rounded-lg shell:border-2"
              data-label-placement={box.labelPlacement}
              key={box.id}
              style={
                {
                  borderColor: box.color,
                  boxShadow: `0 0 0 1px rgba(255,255,255,.72), 0 6px 20px color-mix(in srgb, ${box.color} 20%, transparent)`,
                  height: box.height,
                  left: box.left,
                  top: box.top,
                  width: box.width,
                } as CSSProperties
              }
            >
              <span
                className={`shell:absolute shell:max-w-[min(18rem,calc(100vw-2rem))] shell:whitespace-nowrap shell:rounded-md shell:px-2 shell:py-1 shell:text-[0.7rem] shell:font-black shell:leading-none shell:text-stone-950 ${box.component === undefined ? '' : 'shell:font-mono shell:text-[0.65rem]'} ${box.labelPlacement === 'above' ? 'shell:bottom-[calc(100%+0.25rem)] shell:right-1 shell:top-auto' : 'shell:right-1 shell:top-1'}`}
                style={{ backgroundColor: box.color }}
              >
                {box.component ?? box.label}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
