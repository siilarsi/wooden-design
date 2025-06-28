export function buildQuery(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (typeof v === 'number') {
      q.set(k, v.toFixed(2));
    } else {
      q.set(k, v);
    }
  });
  return q.toString();
}

export function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}
