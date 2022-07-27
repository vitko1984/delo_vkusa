import {  writable } from 'svelte/store';
import type { Edit, DataGallery } from '$lib/types';

export const form = writable<Edit>({name: "", email: "", phone: "", address: "", });
export const isHandleErrors = writable(false);
export const modalDialog = writable<boolean[]>([]);
export const initData = writable<string[]>([]);
export const dataGallery = writable<Edit[]>([]);
export const edit = writable({name: false, email: false, phone: false});
export const users = writable<Edit[]>([]);
export const uid = writable<string>();
export const modalId = writable('');
export const contentBasket = writable<DataGallery[]>([]);
export const amountOrder = writable(0);