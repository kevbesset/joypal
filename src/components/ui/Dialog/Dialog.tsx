import { PropsWithChildren, useEffect, useRef, useState } from "react";
import bem from "react-bemthis";
import { createPortal } from "react-dom";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./Dialog.module.scss";

const { block, element } = bem(styles);

type Props = PropsWithChildren & {
  persistent?: boolean;
  open?: boolean;
  onChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
};

export default function Dialog({
  children,
  open,
  persistent,
  title,
  subtitle,
  onChange,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [activeElement, setActiveElement] = useState<HTMLElement>();

  function focusInsideModal() {
    const currentActiveElement = document.activeElement;
    if (!dialogRef.current?.contains(currentActiveElement)) {
      const firstFocusableElement = dialogRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }

  function handleBackdropClick() {
    if (!persistent) {
      onChange(false);
    }
  }

  function handleOpen() {
    // Get current focus element
    setActiveElement(document.activeElement as HTMLElement);

    // Bind click on escape
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (["Escape"].includes(event.code)) {
        handleBackdropClick();
      }
    });
  }

  function handleClose() {
    // Reset to previous focus element
    if (activeElement) {
      activeElement.focus();
    }

    // Clear binding
    document.removeEventListener("keydown", (event: KeyboardEvent) => {
      if (["Escape"].includes(event.code)) {
        handleBackdropClick();
      }
    });
  }

  useEffect(() => {
    if (open) {
      handleOpen();
      focusInsideModal();
    } else {
      handleClose();
    }
  }, [open]);

  return createPortal(
    open && (
      <div ref={dialogRef} className={block()} onClick={handleBackdropClick}>
        <div className={element("inner")} onClick={(e) => e.stopPropagation()}>
          {title && <div className={element("title")}>{title}</div>}
          {subtitle && <div className={element("subtitle")}>{subtitle}</div>}
          {children}
          <Button className={element("close")} onClick={() => onChange(false)}>
            <Icon name="close" />
          </Button>
        </div>
      </div>
    ),
    document.body
  );
}
