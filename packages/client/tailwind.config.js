const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
        __dirname,
        '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    colors: {
      'dark-blue': '#0F172A',
      'blue-600': '#3b82f6',
      'dark-yellow': '#f5deb3',
      'white': '#fff',
    },
  },
  plugins: [],
};