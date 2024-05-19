import bem from "react-bemthis";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./Wysiwyg.module.scss";

const { block } = bem(styles);

type Props = {
  content: string;
};

export default function Wysiwyg({ content }: Props) {
  return (
    <div className={block()}>
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
    </div>
  );
}
