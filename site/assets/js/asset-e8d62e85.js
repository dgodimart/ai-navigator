/* @ds-bundle: {"format":4,"namespace":"ThoughtLabDesignSystem_9a5697","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"BarChart","sourcePath":"components/charts/BarChart.jsx"},{"name":"DonutChart","sourcePath":"components/charts/DonutChart.jsx"},{"name":"ProgressRing","sourcePath":"components/charts/ProgressRing.jsx"},{"name":"WaffleChart","sourcePath":"components/charts/WaffleChart.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"RankedList","sourcePath":"components/data/RankedList.jsx"},{"name":"StatCallout","sourcePath":"components/data/StatCallout.jsx"},{"name":"CalloutBox","sourcePath":"components/editorial/CalloutBox.jsx"},{"name":"QuoteBlock","sourcePath":"components/editorial/QuoteBlock.jsx"},{"name":"SlideFooter","sourcePath":"components/editorial/SlideFooter.jsx"},{"name":"SlideTitle","sourcePath":"components/editorial/SlideTitle.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"92311d36b8a0","components/charts/BarChart.jsx":"51c34a2bc6ac","components/charts/DonutChart.jsx":"7d1f49d47896","components/charts/ProgressRing.jsx":"1c3bf7798abd","components/charts/WaffleChart.jsx":"66c00884100f","components/data/DataTable.jsx":"33bf5ecd9e77","components/data/RankedList.jsx":"99b937099467","components/data/StatCallout.jsx":"b625e8dfe0ee","components/editorial/CalloutBox.jsx":"683728fe0151","components/editorial/QuoteBlock.jsx":"8e8c3f95bd0d","components/editorial/SlideFooter.jsx":"37eaa77c9f51","components/editorial/SlideTitle.jsx":"1dec23372b05","ui_kits/report/CoverSlide.jsx":"79b1d7127656","ui_kits/report/DataSlide.jsx":"031efc5b19fa","ui_kits/report/ProfileSlide.jsx":"fb7b3fcd64e4","ui_kits/report/StudySlide.jsx":"5821448bc3a6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ThoughtLabDesignSystem_9a5697 = window.ThoughtLabDesignSystem_9a5697 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function Logo({
  color = 'teal',
  size = 28,
  favicon = false
}) {
  const teal = 'var(--tl-teal)';
  const isBox = color === 'box';
  const fg = color === 'white' ? '#fff' : teal;
  const inner = favicon ? [/*#__PURE__*/React.createElement("b", {
    key: "t"
  }, "TL")] : [/*#__PURE__*/React.createElement("b", {
    key: "t"
  }, "Thought"), /*#__PURE__*/React.createElement("span", {
    key: "l",
    style: {
      fontWeight: 400
    }
  }, "Lab")];
  const mark = /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-logo)',
      fontSize: size,
      lineHeight: 1,
      letterSpacing: '-0.01em',
      color: isBox ? '#fff' : fg,
      whiteSpace: 'nowrap'
    }
  }, inner);
  if (!isBox) return mark;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      background: teal,
      padding: `${Math.round(size * 0.35)}px ${Math.round(size * 0.5)}px`
    }
  }, mark);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/charts/BarChart.jsx
try { (() => {
function BarChart({
  data = [],
  height = 180,
  barWidth = 46,
  gap = 28,
  suffix = '',
  color = 'var(--viz-3)',
  labelColor = 'var(--text-body)'
}) {
  const max = Math.max(...data.map(d => d.value), 1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap
    }
  }, data.map((d, i) => {
    const h = Math.max(4, Math.round(d.value / max * height));
    const inside = h > 34;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6
      }
    }, !inside && /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: labelColor
      }
    }, d.value, suffix), /*#__PURE__*/React.createElement("div", {
      style: {
        width: barWidth,
        height: h,
        background: d.color || color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }
    }, inside && /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: '#fff',
        paddingTop: 5
      }
    }, d.value, suffix)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: 'var(--text-body)',
        textAlign: 'center',
        maxWidth: barWidth + gap - 6
      }
    }, d.label));
  }));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/DonutChart.jsx
try { (() => {
function DonutChart({
  segments = [],
  size = 150,
  thickness = 34,
  centerLabel = '',
  legend = true
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2,
    c = 2 * Math.PI * r;
  let acc = 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, segments.map((s, i) => {
    const frac = s.value / total,
      off = acc;
    acc += frac;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: s.color || `var(--viz-${i % 8 + 1})`,
      strokeWidth: thickness,
      strokeDasharray: `${frac * c} ${c}`,
      strokeDashoffset: -off * c
    });
  })), centerLabel && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: size / 6.5,
      color: 'var(--text-title)'
    }
  }, centerLabel)), legend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, segments.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 13.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      background: s.color || `var(--viz-${i % 8 + 1})`,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", null, s.label, " ", /*#__PURE__*/React.createElement("b", null, Math.round(s.value / total * 100), "%"))))));
}
Object.assign(__ds_scope, { DonutChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/DonutChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/ProgressRing.jsx
try { (() => {
function ProgressRing({
  value = 0,
  max = 100,
  size = 96,
  thickness = 9,
  color = 'var(--tl-teal)',
  trackColor = 'transparent',
  label,
  sublabel
}) {
  const r = (size - thickness) / 2,
    c = 2 * Math.PI * r,
    frac = Math.min(1, value / max);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: trackColor === 'transparent' ? 'var(--tl-ice-mid)' : trackColor,
    strokeWidth: thickness
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: thickness,
    strokeDasharray: `${frac * c} ${c}`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: size / 3.4,
      color: 'var(--text-title)',
      lineHeight: 1
    }
  }, label ?? value), sublabel && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, sublabel)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/charts/WaffleChart.jsx
try { (() => {
function WaffleChart({
  percent = 0,
  columns = 7,
  rows = 9,
  cell = 13,
  gap = 3,
  color = 'var(--viz-3)',
  emptyColor = 'var(--tl-ice-mid)',
  label = '',
  labelColor
}) {
  const total = columns * rows;
  const filled = Math.round(percent / 100 * total);
  const cells = [];
  for (let r = rows - 1; r >= 0; r--) for (let c = 0; c < columns; c++) cells.push(r * columns + c);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, label !== '' && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 19,
      color: labelColor || color
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, ${cell}px)`,
      gap
    }
  }, Array.from({
    length: total
  }, (_, i) => {
    const row = Math.floor(i / columns);
    const fillFromBottom = (rows - 1 - row) * columns + i % columns;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: cell,
        height: cell,
        background: fillFromBottom < filled ? color : emptyColor
      }
    });
  })));
}
Object.assign(__ds_scope, { WaffleChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/WaffleChart.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function DataTable({
  title,
  columns = [],
  rows = [],
  striped = true,
  headRule = true
}) {
  const colorMap = {
    green: 'var(--tl-green)',
    brown: 'var(--tl-brown)',
    teal: 'var(--tl-teal)',
    gray: 'var(--text-muted)'
  };
  return /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-chart-title)',
      fontWeight: 700,
      marginBottom: 8
    }
  }, title), /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: 'collapse',
      width: '100%',
      fontSize: 14.5
    }
  }, columns.some(c => c.label) && /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: c.align || (i === 0 ? 'left' : 'right'),
      padding: '6px 12px',
      fontWeight: 700,
      color: colorMap[c.color] || 'var(--text-body)',
      borderBottom: headRule ? '2px solid var(--tl-ink)' : 'none'
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri,
    style: {
      background: striped && ri % 2 === 0 ? 'var(--surface-row-alt)' : 'transparent'
    }
  }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    style: {
      textAlign: c.align || (ci === 0 ? 'left' : 'right'),
      padding: '7px 12px',
      fontWeight: c.bold ? 700 : 400,
      color: colorMap[c.color] || 'var(--text-body)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, r[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/RankedList.jsx
try { (() => {
function RankedList({
  items = [],
  columns = 1,
  startAt = 1
}) {
  const cycle = ['var(--tl-blue-gray)', 'var(--tl-gray)', 'var(--tl-teal)', 'var(--tl-green)', 'var(--tl-gray-light)'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '18px 48px'
    }
  }, items.map((it, i) => {
    const c = it.color || cycle[i % cycle.length];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: c,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 17,
        flex: 'none'
      }
    }, startAt + i), /*#__PURE__*/React.createElement("div", null, it.value && /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 400,
        fontSize: 19,
        color: c
      }
    }, it.value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        color: c,
        maxWidth: 230
      }
    }, it.label)));
  }));
}
Object.assign(__ds_scope, { RankedList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/RankedList.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCallout.jsx
try { (() => {
function StatCallout({
  value,
  label,
  sublabel,
  color = 'teal',
  size = 'xl',
  icon
}) {
  const colors = {
    teal: 'var(--tl-teal)',
    green: 'var(--tl-green)',
    'blue-gray': 'var(--tl-blue-gray)',
    brown: 'var(--tl-brown)',
    gray: 'var(--tl-gray)',
    ink: 'var(--tl-ink)'
  };
  const fs = size === 'xl' ? 'var(--fs-stat-xl)' : 'var(--fs-stat)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      color: colors[color] || color,
      flex: 'none',
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs,
      fontWeight: 400,
      color: colors[color] || color,
      lineHeight: 1.05
    }
  }, value), label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: colors[color] || color,
      marginTop: 2
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, sublabel)));
}
Object.assign(__ds_scope, { StatCallout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCallout.jsx", error: String((e && e.message) || e) }); }

// components/editorial/CalloutBox.jsx
try { (() => {
function CalloutBox({
  title,
  children,
  padding = '18px 22px',
  width
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-callout)',
      padding,
      width,
      boxSizing: 'border-box'
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 17,
      marginBottom: 8
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15.5,
      lineHeight: 1.45
    }
  }, children));
}
Object.assign(__ds_scope, { CalloutBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/CalloutBox.jsx", error: String((e && e.message) || e) }); }

// components/editorial/QuoteBlock.jsx
try { (() => {
function QuoteBlock({
  quote,
  name,
  title,
  org,
  variant = 'glyph',
  width
}) {
  const attribution = [name, title, org].filter(Boolean).join(', ');
  if (variant === 'panel') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-callout)',
        padding: '8px 16px',
        fontSize: 18,
        fontWeight: 400,
        color: 'var(--text-title)'
      }
    }, "Executives say"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '14px 16px 0'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 15,
        lineHeight: 1.45
      }
    }, "\u201C", quote, "\u201D"), attribution && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '10px 0 0',
        fontSize: 14,
        color: 'var(--tl-teal)'
      }
    }, attribution)));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'Georgia, serif',
      fontSize: 64,
      lineHeight: 0.5,
      color: 'var(--tl-green)',
      marginBottom: 14,
      paddingTop: 18
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 19,
      fontWeight: 700,
      lineHeight: 1.35,
      color: 'var(--tl-ink)'
    }
  }, quote), attribution && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 14.5
    }
  }, "\u2014", attribution));
}
Object.assign(__ds_scope, { QuoteBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/QuoteBlock.jsx", error: String((e && e.message) || e) }); }

// components/editorial/SlideFooter.jsx
try { (() => {
function SlideFooter({
  reportTitle,
  page,
  divider = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: 26
  }), divider && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 30,
      background: 'var(--border-rule)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      alignItems: 'baseline',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)'
    }
  }, reportTitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, reportTitle), page != null && /*#__PURE__*/React.createElement("span", null, page)));
}
Object.assign(__ds_scope, { SlideFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/SlideFooter.jsx", error: String((e && e.message) || e) }); }

// components/editorial/SlideTitle.jsx
try { (() => {
function SlideTitle({
  title,
  subtitle,
  color = 'blue-gray',
  size = 40
}) {
  const c = color === 'teal' ? 'var(--text-title-alt)' : 'var(--text-title)';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.15,
      color: c,
      whiteSpace: 'pre-line'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: size * 0.55,
      fontWeight: 400,
      color: 'var(--text-title-alt)',
      marginTop: 4
    }
  }, subtitle));
}
Object.assign(__ds_scope, { SlideTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/SlideTitle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/report/CoverSlide.jsx
try { (() => {
function CoverSlide() {
  const {
    Logo
  } = window.ThoughtLabDesignSystem_9a5697;
  const img = (src, alt) => /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      height: 720,
      background: '#fff',
      display: 'flex',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 470,
      background: 'var(--tl-teal)',
      color: '#fff',
      padding: '0 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontWeight: 700,
      fontSize: 54,
      lineHeight: 1.18,
      margin: 0
    }
  }, "From Future Vision to Urban Reality"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 21,
      lineHeight: 1.35,
      margin: '28px 0 0'
    }
  }, "An urban playbook for driving sustainability, resilience, prosperity, and digital change")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '30px 48px 26px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 30
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: 18,
      margin: '22px 0'
    }
  }, img('../../assets/imagery/transit-tram.jpg', 'Urban transit'), img('../../assets/imagery/city-night-aerial.jpg', 'City at night'), img('../../assets/imagery/city-intersection-aerial.jpg', 'City intersection'), img('../../assets/imagery/skyline-dusk.jpg', 'Solar skyline')), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-hairline)',
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Sponsored by"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26,
      fontSize: 14,
      color: 'var(--text-muted)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Axis Communications"), /*#__PURE__*/React.createElement("span", null, "Deloitte"), /*#__PURE__*/React.createElement("span", null, "FTI Consulting"), /*#__PURE__*/React.createElement("span", null, "GM"), /*#__PURE__*/React.createElement("span", null, "Intel"), /*#__PURE__*/React.createElement("span", null, "Itron"), /*#__PURE__*/React.createElement("span", null, "ServiceNow"), /*#__PURE__*/React.createElement("span", null, "Wireside")))));
}
window.CoverSlide = CoverSlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/report/CoverSlide.jsx", error: String((e && e.message) || e) }); }

// ui_kits/report/DataSlide.jsx
try { (() => {
function DataSlide() {
  const {
    SlideTitle,
    SlideFooter,
    WaffleChart
  } = window.ThoughtLabDesignSystem_9a5697;
  const region = (name, a, b, dim) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--tl-blue-gray)',
      color: '#fff',
      textAlign: 'center',
      padding: '6px 0',
      fontSize: 16
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(WaffleChart, {
    percent: a,
    label: `${a}%`,
    cell: 11,
    gap: 3,
    color: dim ? 'var(--tl-sky)' : 'var(--tl-teal)',
    labelColor: dim ? 'var(--tl-sky)' : 'var(--tl-teal)'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13
    }
  }, "Last 3 years")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(WaffleChart, {
    percent: b,
    label: `${b}%`,
    cell: 11,
    gap: 3,
    color: dim ? 'var(--tl-sky-light)' : 'var(--tl-teal-bright)',
    labelColor: dim ? 'var(--tl-sky)' : 'var(--tl-teal-bright)'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13
    }
  }, "Next 3 years"))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      height: 720,
      background: '#fff',
      padding: 'var(--slide-pad-top) var(--slide-pad-x) 24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement(SlideTitle, {
    title: 'The data\ndeluge',
    color: "teal"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 'var(--col-gap)',
      marginTop: 30,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 330,
      fontSize: 15.5,
      lineHeight: 1.42
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px'
    }
  }, "Organizations are seeing exponential growth in the volume of data within and outside their businesses. How they harness that data dictates whether they will be winners or losers in a data-driven world."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px'
    }
  }, "On average, surveyed executives report that data volume grew by 36% over the last three years, and they expect it to swell by 61% over the next three years."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "By region, North American (US) organizations report the most rapid growth over the same periods (44% and 68%).")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--border-rule)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-chart-title)',
      fontWeight: 700,
      marginBottom: 20
    }
  }, "Data volume growth by region"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 26
    }
  }, region('North America', 44, 68, false), region('APAC', 36, 60, true), region('Europe', 35, 60, true), region('South America', 32, 57, true)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-row-alt)',
      padding: '6px 12px',
      fontSize: 'var(--fs-caption)',
      margin: '16px -16px 12px',
      color: 'var(--text-body)'
    }
  }, "Survey Q. How much has the volume of data that your organization accesses and uses grown cumulatively over the last three years, and how much do you expect it to grow over the next three years?"), /*#__PURE__*/React.createElement(SlideFooter, {
    reportTitle: "Data into action",
    page: 7,
    divider: true
  }));
}
window.DataSlide = DataSlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/report/DataSlide.jsx", error: String((e && e.message) || e) }); }

// ui_kits/report/ProfileSlide.jsx
try { (() => {
function ProfileSlide() {
  const {
    SlideTitle,
    SlideFooter,
    StatCallout,
    QuoteBlock
  } = window.ThoughtLabDesignSystem_9a5697;
  const chip = (label, alt) => /*#__PURE__*/React.createElement("div", {
    style: {
      background: alt ? 'var(--tl-ice-mid)' : 'transparent',
      padding: '7px 12px',
      fontSize: 14.5
    }
  }, label);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      height: 720,
      background: '#fff',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      background: 'var(--tl-teal)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '26px var(--slide-pad-x) 24px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(SlideTitle, {
    color: "teal",
    title: "Philadelphia, Pennsylvania",
    subtitle: "A practical approach to transportation and mobility"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 'var(--col-gap)',
      marginTop: 26,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1.15,
      fontSize: 15,
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px'
    }
  }, "Amid the hustle of daily commutes, Philadelphia\u2019s public transportation system is quietly setting the stage for a bold new future. SEPTA isn\u2019t just upgrading its services\u2014it\u2019s reimagining transit for a city on the cusp of transformation."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      fontWeight: 700
    }
  }, "Emphasis on data"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px'
    }
  }, "One hallmark of Yates\u2019s leadership is the emphasis on data. From the transition to zero-emission buses to improving rider experience, Yates and her team work to ensure that decisions are grounded in data."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "\u201COur automated passenger counters provide boardings but also geolocation,\u201D Yates noted. These devices track ridership in real time and help the agency optimize routes and schedules.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(QuoteBlock, {
    quote: "We are trying to be smarter about how we deploy technology. Let's not just say we think this is the right solution, let's be sure it's the right solution.",
    name: "Emily Yates",
    title: "Chief Innovation and Sustainability Officer",
    org: "SEPTA"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 330,
      background: 'var(--surface-callout)',
      padding: '24px 26px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 700
    }
  }, "Key city data points"), /*#__PURE__*/React.createElement(StatCallout, {
    value: "1.5 million",
    label: "Population",
    color: "green",
    size: "md"
  }), /*#__PURE__*/React.createElement(StatCallout, {
    value: "$4 billion",
    label: "City's operating budget in 2024",
    color: "green",
    size: "md"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14.5,
      marginBottom: 8
    }
  }, "Top sources of funding for tech investments"), chip('Taxes', true), chip('Public funding and grants', false), chip('Government borrowing', true)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)'
    }
  }, "Source: 2024 ThoughtLab survey of 250 cities"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(SlideFooter, {
    reportTitle: "City profiles",
    page: 22
  }))));
}
window.ProfileSlide = ProfileSlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/report/ProfileSlide.jsx", error: String((e && e.message) || e) }); }

// ui_kits/report/StudySlide.jsx
try { (() => {
function StudySlide() {
  const {
    SlideTitle,
    SlideFooter,
    StatCallout,
    BarChart,
    CalloutBox
  } = window.ThoughtLabDesignSystem_9a5697;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      height: 720,
      background: '#fff',
      padding: 'var(--slide-pad-top) var(--slide-pad-x) 24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement(SlideTitle, {
    title: 'A rigorous benchmarking study\nof 250 cities in 78 countries'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 'var(--col-gap)',
      marginTop: 36,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 330,
      fontSize: 15.5,
      lineHeight: 1.42
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px'
    }
  }, "In the second quarter of 2024, we conducted a rigorous study of 250 cities in 78 countries to analyze the progress they made in operationalizing their future-ready plans."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      fontWeight: 700
    }
  }, "Valuable insights into practices"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px'
    }
  }, "The study examined the most effective strategies and digital solutions used by cities to achieve their future goals, along with the challenges they face in achieving results."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Our 2024 study analyzed cities across all regions, with a combined 734.2 million residents\u2014or 9% of the world\u2019s population.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--border-rule)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 26,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(StatCallout, {
    value: "250",
    label: "Cities",
    color: "teal"
  }), /*#__PURE__*/React.createElement(StatCallout, {
    value: "78",
    label: "Countries",
    color: "blue-gray"
  }), /*#__PURE__*/React.createElement(StatCallout, {
    value: "734.2",
    label: "million residents",
    color: "green"
  }), /*#__PURE__*/React.createElement(StatCallout, {
    value: "9%",
    label: "of global population",
    color: "brown",
    size: "md"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-chart-title)',
      fontWeight: 700,
      marginBottom: 18
    }
  }, "Number of cities by population"), /*#__PURE__*/React.createElement(BarChart, {
    suffix: "",
    height: 150,
    barWidth: 52,
    gap: 30,
    data: [{
      label: 'Smallest',
      value: 84
    }, {
      label: 'Small',
      value: 28
    }, {
      label: 'Medium',
      value: 103
    }, {
      label: 'Large',
      value: 21
    }, {
      label: 'Mega',
      value: 14
    }]
  })), /*#__PURE__*/React.createElement(CalloutBox, null, "The study covered progress across five urban domains: (1) environment and sustainability, (2) urban infrastructure, (3) mobility and transportation, (4) safety, security, and resilience, and (5) citizen living, health, and trust."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(SlideFooter, {
    reportTitle: "From Future Vision to Urban Reality",
    page: 6
  })));
}
window.StudySlide = StudySlide;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/report/StudySlide.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DonutChart = __ds_scope.DonutChart;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.WaffleChart = __ds_scope.WaffleChart;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.RankedList = __ds_scope.RankedList;

__ds_ns.StatCallout = __ds_scope.StatCallout;

__ds_ns.CalloutBox = __ds_scope.CalloutBox;

__ds_ns.QuoteBlock = __ds_scope.QuoteBlock;

__ds_ns.SlideFooter = __ds_scope.SlideFooter;

__ds_ns.SlideTitle = __ds_scope.SlideTitle;

})();
