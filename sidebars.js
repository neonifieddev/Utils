/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Utils",
      collapsed: false,
      items: [
        "sync/api",
        "tween/api",
      ],
    },
  ],
};

module.exports = sidebars;

