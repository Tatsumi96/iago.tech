/**
 * ThemeScript — Server Component uniquement.
 *
 * Émet le script bloquant anti-flash (FOUC) qui applique la classe
 * `light` / `dark` sur <html> avant le premier rendu.
 * Il vit dans l'arbre serveur pur : React ne le crée jamais lors
 * d'un rendu client, donc pas d'erreur « script tag » sous React 19.
 */
const THEME_STORAGE_KEY = 'theme';

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}")||"system";var r=s==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):s;document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(r);document.documentElement.style.colorScheme=r;}catch(e){}})();`;

export function ThemeScript() {
  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
