import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/Button/CopyButton";
import Dialog from "@/components/ui/Dialog";
import Icon from "@/components/ui/Icon";
import classNames from "classnames";
import { useState } from "react";
import bem from "react-bemthis";
import { useTranslation } from "react-i18next";
import Textarea from "../Textarea";
import styles from "./PromptRole.module.scss";

const { block, element } = bem(styles);

type Props = {
  onSubmit?: (role: string) => void;
  completed?: boolean;
  className?: string;
};

export default function PromptRole({ onSubmit, completed, className }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");

  function handleSubmit() {
    onSubmit?.(role);
    setOpen(false);
  }

  return (
    <>
      <Button
        rounded
        className={classNames(
          className,
          block({
            completed,
          })
        )}
        onClick={() => setOpen(!open)}
      >
        <Icon
          name={completed ? "check" : "engineering"}
          className={element("icon")}
        />
        <span className={element("label")}>
          {t(`chatbox.prompt.role.action.${completed ? "completed" : "empty"}`)}
        </span>
      </Button>
      <Dialog
        open={open}
        onChange={setOpen}
        title={t("chatbox.prompt.role.title")}
        subtitle={t("chatbox.prompt.role.subtitle")}
      >
        <div className={element("info")}>
          <div className={element("item")}>
            <div className={element("title")}>
              <Icon name="help" fill className={element("icon", "why")} />
              Why?
            </div>
            <div className={element("list")}>
              <div className={element("tip")}>
                Enhance the relevance of the response.
              </div>
              <div className={element("tip")}>
                Encourage a more targeted response tailored to your needs.
              </div>
              <div className={element("tip")}>
                Avoid digressions or generic answers.
              </div>
            </div>
          </div>
          <div className={element("item")}>
            <div className={element("title")}>
              <Icon name="bolt" fill className={element("icon", "how")} />
              How?
            </div>
            <div className={element("list")}>
              <div className={element("tip")}>
                Position it as an expert in the desired field.
              </div>
              <div className={element("tip")}>
                Specify the key skills necessary to accomplish this task.
              </div>
              <div className={element("tip")}>
                Formulate the prompt neutrally and objectively to avoid biases.
              </div>
            </div>
          </div>
          <div className={element("item")}>
            <div className={element("title")}>
              <Icon
                name="tooltip"
                fill
                className={element("icon", "example")}
              />
              Examples
            </div>
            <div className={element("list")}>
              <div className={element("tip")}>
                "As a digital marketing expert, relying on your skills in
                strategy and lead generation."
                <CopyButton
                  compact
                  copyMessage="As a digital marketing expert, relying on your skills in strategy and lead generation."
                  className={element("copy")}
                />
              </div>
              <div className={element("tip")}>
                "As an expert in nutrition and healthy eating, you have a
                profound understanding of nutrition, dietary requirements, and
                the impacts of various diets on health."
                <CopyButton
                  compact
                  copyMessage="As an expert in nutrition and healthy eating, you have a profound understanding of nutrition, dietary requirements, and the impacts of various diets on health."
                  className={element("copy")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={element("body")}>
          <Textarea
            name="role"
            value={role}
            onChange={setRole}
            placeholder={t("chatbox.prompt.role.placeholder")}
            className={element("input")}
            onSubmit={handleSubmit}
          />
        </div>
        <div className={element("footer")}>
          <Button
            highlight
            className={element("button")}
            onClick={handleSubmit}
          >
            Send
          </Button>
          <Button
            secondary
            className={element("button")}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
}
