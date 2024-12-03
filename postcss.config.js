import purgecss from 'postcss-purgecss';

const purgeCSS = purgecss({
  content: ['./src/**/*.html', './src/**/*.js'], 
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
