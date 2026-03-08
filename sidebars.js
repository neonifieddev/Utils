/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Utils",
      collapsed: false,
      items: [
        "sync/intro",
        "sync/api",
        "tween/intro",
        "tween/api",
      ],
    },
  ],
};

module.exports = sidebars;

