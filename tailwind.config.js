/** @type {import('tailwindcss').Config} */
export const content = [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',

  // Or if using `src` directory:
  './src/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    spacing: {
      '128': '32rem',
      '144': '36rem',
      '68': '17rem'
    },
  },
  screens: {
    'smallsm': '375',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
    '375px': '375px',
    '425px': '425px',
  },
  colors: {
    'green': '#31422e',
    'green-ligth': '#e8eae4',
    'orange': '#fd6e39',
    'orange-light': '#ffe6dd',
    'bege': '#efe8d4',
    'white': '#ffffff',
    'gray': '#8492a6',
    'gray-light': '#d3dce6',
    'green-500': ' rgb(34 197 94)'
  },
};
export const plugins = [];