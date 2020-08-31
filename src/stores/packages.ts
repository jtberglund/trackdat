import { writable } from 'svelte/store';
import type { Package } from 'common/types';

const packages = writable([] as Package[]);

export default packages;
