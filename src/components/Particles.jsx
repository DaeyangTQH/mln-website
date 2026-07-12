import { useMemo } from "react";

/* Các phần tử trang trí được render bằng JSX (thay cho việc app.js chèn DOM),
   nhưng giữ nguyên class, id và cách sinh giá trị ngẫu nhiên như bản gốc để
   CSS/animation hoạt động y hệt. */

export function Bubbles({ id, count, className = "bubbles" }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 8 + Math.random() * 40,
        dur: (9 + Math.random() * 7).toFixed(1),
        del: (-Math.random() * 9).toFixed(1),
      })),
    [count]
  );

  return (
    <div className={className} id={id}>
      {items.map((b, i) => (
        <i
          key={i}
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.del}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Starfield({ id, count = 120 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: 0.2 + Math.random() * 0.6,
      })),
    [count]
  );

  return (
    <div className="starfield" id={id}>
      {items.map((s, i) => (
        <i key={i} style={{ left: `${s.left}%`, top: `${s.top}%`, opacity: s.opacity }} />
      ))}
    </div>
  );
}

export function WaveBars({ id }) {
  const N = 70;
  const items = useMemo(
    () =>
      Array.from({ length: N }, (_, i) => {
        const base = Math.sin((i / N) * Math.PI);
        return Math.min(20 + base * 110 + Math.random() * 30, 150);
      }),
    []
  );

  return (
    <div className="wave-bars" id={id}>
      {items.map((h, i) => (
        <i key={i} style={{ height: `${h}px`, "--i": i }} />
      ))}
    </div>
  );
}
