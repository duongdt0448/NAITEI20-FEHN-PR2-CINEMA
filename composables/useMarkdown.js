import MarkdownIt from "markdown-it";

export function useMarkdown() {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true,
  });

  const renderMarkdown = (content) => md.render(content);

  return { renderMarkdown };
}
