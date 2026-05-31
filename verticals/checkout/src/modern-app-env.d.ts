/// <reference types='@modern-js/app-tools/types' />

declare const ULTRAMODERN_SITE_URL: string;
declare module '*.svg' {
  const url: string;
  export default url;
}
