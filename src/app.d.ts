/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
	id?: number; userid?: string; authenticated?: boolean; message?: string;
  // admin
    user?: string | object; session?: string;
  };
  // interface Platform {}
  interface Session {
	authenticated?: boolean; message?: string; userid?: string;
	// admin
	user?: string | object;
  };
  // interface Stuff {}
};
