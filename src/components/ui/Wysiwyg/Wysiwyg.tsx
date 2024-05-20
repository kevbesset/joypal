import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  content: string;
};

export default function Wysiwyg({ content }: Props) {
  return (
    <Markdown
      children={content}
      components={{
        code({ children, ...props }) {
          const language =
            props.className?.replace("language-", "") || "plaintext";

          return (
            <SyntaxHighlighter
              language={language}
              children={String(children).replace(/\n$/, "")}
              style={docco}
            />
          );
        },
      }}
    />
  );
}
