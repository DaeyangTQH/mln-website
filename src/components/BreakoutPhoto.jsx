/* BreakoutPhoto — Pattern B (Deep Blue): ảnh trong khung (crop) + lớp PNG cutout
   tràn ra ngoài khung. Một hộp scale chung (__stack), cutout định vị bằng % qua
   CSS vars (--cut-top/left/width/rotate) để không lệch khi zoom/resize.
   Animate CẢ [data-breakout] (không animate riêng cutout). */
export default function BreakoutPhoto({
  photo,
  photoAlt = "",
  cutout,
  cutoutAlt = "",
  className = "",
  style,
  children,
}) {
  return (
    <figure className={`breakout ${className}`} data-breakout="" style={style}>
      <div className="breakout__stack">
        <div className="breakout__frame">
          <img className="breakout__photo" src={photo} alt={photoAlt} />
        </div>
        {cutout && (
          <img
            className="breakout__cutout"
            src={cutout}
            alt={cutoutAlt}
            aria-hidden={cutoutAlt ? undefined : "true"}
          />
        )}
        {children}
      </div>
    </figure>
  );
}
