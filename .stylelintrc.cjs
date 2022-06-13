module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-scss",
    "stylelint-config-prettier-scss",
  ],
  overrides: [
    {
      files: ["**/*.html", "**/*.vue"],
      customSyntax: "postcss-html",
    },
  ],
  rules: {
    "custom-property-pattern": "^([a-z][a-z0-9]*)(-{1,2}[a-z0-9]+)*$",
    "scss/dollar-variable-pattern": "^([a-z][a-z0-9]*)(-{1,2}[a-z0-9]+)*$",
  },
};
