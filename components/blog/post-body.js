import React from "react";
import markdownStyles from "@/components/blog/markdown-styles.module.css";

export default React.forwardRef(({ content }, ref) => {
  return (
    <div ref={ref} className={markdownStyles["markdown"]}>
      {content}
    </div>
  );
});
