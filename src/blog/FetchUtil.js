import {homepage} from '../../package';

export const fetchText = (path) => fetch(`${homepage}${path}`).then(res => res.text());

export const fetchJson = (path) => fetch(`${homepage}${path}`).then(res => res.json());
