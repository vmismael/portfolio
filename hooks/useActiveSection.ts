"use client";
import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const map = new Map<Element, string>();
    const visible = new Set<string>();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = map.get(entry.target);
          if (!id) return;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        });
        const first = ids.find(id => visible.has(id));
        if (first) setActive(first);
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 },
    );

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) { map.set(el, id); obs.observe(el); }
    });

    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}
