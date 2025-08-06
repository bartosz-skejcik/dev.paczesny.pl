export default function ThemeScript() {
  const script = `
    (function() {
      function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      function updateTheme() {
        const savedTheme = localStorage.getItem('theme') || 'system';
        const systemTheme = getSystemTheme();
        const resolvedTheme = savedTheme === 'system' ? systemTheme : savedTheme;
        
        document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
      }
      
      // Apply theme immediately
      updateTheme();
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        const savedTheme = localStorage.getItem('theme') || 'system';
        if (savedTheme === 'system') {
          updateTheme();
        }
      });
    })();
  `

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}

