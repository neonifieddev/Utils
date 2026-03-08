/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "intro",
    {
      type: "category",
      label: "API",
      items: ["api/sync", "api/tween"],
    },
  ],
};

module.exports = sidebars;

