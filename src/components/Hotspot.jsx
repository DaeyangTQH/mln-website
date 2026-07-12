/* Icon dạng line-art thay cho dấu "+" trần trong các hotspot có data-icon.
   Giữ nguyên bộ path như bản gốc trong app.js. */
const ICONS = {
  bolt: '<path d="M13 2 L5 13 h5 l-1 9 L19 10 h-5 z"/>',
  droplet: '<path d="M12 3 C12 3 6 10 6 14.5 A6 6 0 0 0 18 14.5 C18 10 12 3 12 3 Z"/>',
  tower: '<path d="M8.4 21 L12 4 L15.6 21 M6.6 9 H17.4 M9.6 14.5 L14.4 11.5 M14.4 14.5 L9.6 11.5 M10.4 6.6 H13.6 M7.5 17.5 H16.5"/>',
  gauge: '<path d="M4.5 17.5 A8 8 0 0 1 19.5 17.5"/><path d="M12 17.5 L15.6 11"/><circle cx="12" cy="17.5" r="1.3"/>',
  plug: '<path d="M9 3 v4 M15 3 v4 M6.5 7 h11 v2.4 a5.5 5.5 0 0 1 -11 0 z M12 14.9 v6.1"/>',
  home: '<path d="M4 11 L12 4 L20 11 M6.5 9.4 V20 H17.5 V9.4"/>',
  factory: '<path d="M3 20 V11 l5 3 V11 l5 3 V8 h6 v12 z"/><path d="M6.5 20 v-3 M11 20 v-3 M15.5 20 v-3"/>',
  landmark: '<path d="M3 21 H21 M6 18 V10 M10 18 V10 M14 18 V10 M18 18 V10"/><path d="M4 7 L12 3 L20 7 Z"/>',
  "triangle-alert": '<path d="M10.3 4.1 L2.7 17.3 A2 2 0 0 0 4.4 20 H19.6 A2 2 0 0 0 21.3 17.3 L13.7 4.1 A2 2 0 0 0 10.3 4.1 Z"/><path d="M12 9 V13 M12 17 H12.01"/>',
  pipe: '<path d="M3 8 q3.2 -3.6 6.4 0 t6.4 0 t6.4 0"/><path d="M3 14 q3.2 -3.6 6.4 0 t6.4 0 t6.4 0"/>',
  shield: '<path d="M12 3 L19 6 V11 C19 15.2 16 18.4 12 20.4 C8 18.4 5 15.2 5 11 V6 Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12 H21 M12 3 C15 6 15 18 12 21 M12 3 C9 6 9 18 12 21"/>',
  shieldcheck: '<path d="M12 3 L19 6 V11 C19 15.2 16 18.4 12 20.4 C8 18.4 5 15.2 5 11 V6 Z"/><path d="M9 11.4 l2 2 l4 -4.2"/>',
  badge: '<circle cx="12" cy="12" r="8"/><path d="M8.4 12 l2.6 2.6 l4.6 -5.2"/>',
  heart: '<path d="M12 20.4 C12 20.4 4 14.2 4 8.9 A3.9 3.9 0 0 1 12 6.4 A3.9 3.9 0 0 1 20 8.9 C20 14.2 12 20.4 12 20.4 Z"/>',
  pin: '<path d="M12 21 C12 21 6 14.4 6 9.4 A6 6 0 0 1 18 9.4 C18 14.4 12 21 12 21 Z"/><circle cx="12" cy="9.4" r="2.3"/>',
  tag: '<path d="M20.6 13.4 L13.4 20.6 a2 2 0 0 1 -2.8 0 L4 14 V4 h10 l6.6 6.6 a2 2 0 0 1 0 2.8 Z"/><circle cx="8.6" cy="8.6" r="1.3"/>',
};

export function LineIcon({ name, className = "" }) {
  const glyph = ICONS[name];
  if (!glyph) return null;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: glyph }}
    />
  );
}

export function Hotspot({ icon, title, body, regStep, index, mini = false, className = "", style }) {
  const cls = ["hotspot", mini ? "mini" : "", className].filter(Boolean).join(" ");
  const attrs = {};
  if (icon) attrs["data-icon"] = icon;
  if (title) attrs["data-title"] = title;
  if (body) attrs["data-body"] = body;
  if (regStep != null) attrs["data-reg-step"] = regStep;
  if (index != null) attrs["data-index"] = index;

  return (
    <button className={cls} style={style} {...attrs}>
      {icon ? (
        <LineIcon name={icon} />
      ) : (
        "+"
      )}
    </button>
  );
}
