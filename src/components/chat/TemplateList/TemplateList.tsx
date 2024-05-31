import { sortChannels } from "@/libs/helpers/sort";
import { ChatChannel } from "@/types/Chat.type";
import bem from "react-bemthis";
import "react-complex-tree/lib/style-modern.css";
import TemplateCard from "../TemplateCard";
import styles from "./TemplateList.module.scss";

const { block } = bem(styles);

type Props = {
  templates?: ChatChannel[];
};

export default function TemplateList({ templates }: Props) {
  return (
    <div className={block()}>
      {templates &&
        templates
          .filter((template) => template.messages?.length)
          .sort(sortChannels)
          .map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
    </div>
  );
}
