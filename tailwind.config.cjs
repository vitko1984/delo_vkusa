/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      transition: {
        'transition': 'all .3s ease-out'
        },
      boxShadow: {
        'menu': '0px 2px 4px rgba(0, 0, 0, 0.08), inset 0px 4px 0px #333333',
        'sub': '0px 1px 2px rgba(0, 0, 0, 0.1)',
        'btns': '0px 0px 0px rgba(0, 0, 0, 0), inset 0px -2px 0px #1b7afa',
        'boxShadow': '0 0 5px rgba(65, 67, 144, 0.15)',
        //'rowDownShadow': 'inset 0 -1px 0 #f2f4f6',
        //'rowDownShadow': 'inset 0 -1px 0 #d9d9d9',
        'rowDownShadow': 'inset 0 -1px 0 #eeecf7',
        //'rowRightShadow': '4px 0 8px rgba(0, 0, 0, 0.04)',
        'rowRightShadow': '4px 0 8px #d9d9d9',
        //'rowStartColumnShadow': '4px 0 8px rgba(0, 0, 0, 0.04), inset 0 -1px 0 #f2f4f6',
        'rowStartColumnShadow': '4px 0 8px #d9d9d9, inset 0 -1px 0 #d9d9d9',
        'headerShadow': '0px 2px 6px rgba(0, 0, 0, 0.05)',
        'menuShadow': 'inset 0px -4px 0px #333333',
        'btnChartShadow': 'inset 3px 0px 0px #1b7afa',
        //'btnModalShadow': '0px 1px 1px #d9d9d9',
        'btnModalShadow': '0px 1px 1px #ffffff',
      },
      extend: {
        zIndex: {
          '-2': '-2',
         },
         transitionProperty: {
          'max-height': 'max-height',
         },
         backdropBlur: {
          sm: '6px',
        } 
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require('daisyui')],
}
