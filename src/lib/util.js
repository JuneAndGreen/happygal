'use strict';

let id = +new Date();
export function getId() {
  return `auto-${++id}`;
};