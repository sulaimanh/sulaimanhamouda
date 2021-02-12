const theme = {
  plain: {
    color: "#a6accd",
    backgroundColor: "#0f111a"
  },
  styles: [
    {
      types: ["string", "inserted"],
      style: {
        color: "rgb(195, 232, 141)"
      }
    },
    {
      types: ["boolean"],
      style: {
        color: "rgb(255, 156, 172)"
      }
    },
    {
      types: ["number", "keyword"],
      style: {
        color: "rgb(247, 140, 108)"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(70, 75, 93)",
        fontStyle: "italic"
      }
    },
    {
      types: ["punctuation", "builtin"],
      style: {
        color: "rgb(137, 221, 255)"
      }
    },
    {
      types: ["tag", "deleted"],
      style: {
        color: "rgb(240, 113, 120)"
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "rgb(255, 203, 107)"
      }
    },
    {
      types: ["function"],
      style: {
        color: "rgb(130, 170, 255)"
      }
    },
    {
      types: ["constant"],
      style: {
        color: "rgb(137, 221, 255)",
        fontStyle: "italic"
      }
    }
  ]
};

export default theme;
