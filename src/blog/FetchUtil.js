export const fetchText = (path) => fetch(path).then(res => res.text());

export const fetchJson = (path) => fetch(path).then(res => res.json());
