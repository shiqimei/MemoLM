/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-background': '#fafafa',
        'message-border': '#e8e8e8',
        'message-border-hover': '#b9b9b9',
        'seperator-color': '#dfdfdf',
        'input-icon': '#424243',
        'input-foreground': '#646a73',
        'input-hover-foreground': '#1f2329',
        'input-background': '#e1e2e3',
        'input-border': '#d7d9da',
        'input-hover-background': '#d5d6d7',
        'shortcut-background': '#ededee',
        'shortcut-border': '#cacbcc',
        'sidebar-background': '#ecedee',
        'sidebar-item-foreground': '#666666',
        'sidebar-item-active-foreground': '#000000',
        'sidebar-item-active-background': '#d4d5d6'
      },
      backgroundImage: {
        logo: "url('logo.png')"
      }
    }
  },
  plugins: []
}
