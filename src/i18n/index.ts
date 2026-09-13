import { ui, defaultLang, type UiKeys } from './ui';

export { defaultLang };
export { languages, ui } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang === 'zh') return 'zh';
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: UiKeys): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getUrlForLang(url: URL, targetLang: string): string {
  const currentLang = getLangFromUrl(url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  
  // Remove current language prefix
  if (pathParts[0] === currentLang) {
    pathParts.shift();
  }
  
  // Always include language prefix (prefixDefaultLocale: true) and trailing slash
  const pathStr = pathParts.join('/');
  const newPath = `/${targetLang}${pathStr ? `/${pathStr}` : ''}/`;
  return newPath;
}

export function getLanguageFromPath(path: string): string {
  const [, lang] = path.split('/');
  return lang === 'zh' ? 'zh' : 'en';
}

export function cleanContentSlug(id: string): string {
  return id.replace(/\.(en|zh)$/, '').replace(/\/index$/, '');
}
