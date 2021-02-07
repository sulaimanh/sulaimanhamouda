import markdownStyles from "@/components/blog/markdown-styles.module.css";

export default function PostBody({ content }) {
  return <div className={markdownStyles["markdown"]}>{content}</div>;
}
