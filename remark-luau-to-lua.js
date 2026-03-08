/**
 * Docusaurus remark plugin:
 * Treat ```luau code fences as ```lua so Prism highlighting works.
 */
module.exports = function remarkLuauToLua() {
  return (tree) => {
    /** @param {any} node */
    const walk = (node) => {
      if (!node || typeof node !== "object") return;

      if (node.type === "code" && node.lang === "luau") {
        node.lang = "lua";
      }

      const children = node.children;
      if (Array.isArray(children)) {
        for (const child of children) walk(child);
      }
    };

    walk(tree);
  };
};

