import { chat } from "@/libs/services/chatService";
import { useEffect, useRef, useState } from "react";
import bem from "react-bemthis";
import { Link } from "react-router-dom";
import styles from "./LiveTranslation.module.scss";

const { block, element } = bem(styles);

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = "fr";

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

function useLiveTranslation(text: string, lang = "english") {
  const [previousText, setPreviousText] = useState("");
  const [output, setOutput] = useState("");

  const handleTranslation = useDebounce(() => {
    checkForTranslation();
  }, 500);

  async function checkForTranslation() {
    if (text && text !== previousText) {
      await translate();
      await setPreviousText(text);
    }
  }

  async function translate() {
    console.log("translate", { text, previousText });
    const response = await chat(
      [
        {
          role: "user",
          content: `Important rule: Just write the same text from "text to translate" translated in ${lang}, nothing more

          Text to translate:
          ${text}

          Here's the text you translated last time, try to be consistent (no need to re-translate it, it is just to help you):
          ${previousText}
          `,
        },
      ],
      "llama3:latest"
    );

    setOutput(response.message.content);
  }

  useEffect(() => {
    handleTranslation();
  }, [text]);

  return { output };
}

function useVoiceRecognition() {
  const [input, setInput] = useState("");

  function start() {
    recognition.start();
  }

  useEffect(() => {
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Object.values(event.results)
        // .filter((result) => result.isFinal)
        .map((result) => result[0].transcript)
        .join(".\n");

      setInput(transcript);
    };

    recognition.onstart = () => {
      console.log("recognition start");
    };

    recognition.onend = () => {
      console.log("recognition stop");
    };

    return () => {
      recognition.stop();
    };
  }, []);

  return { input, start };
}

export default function LiveTranslation() {
  const { input, start } = useVoiceRecognition();
  const { output } = useLiveTranslation(input);

  return (
    <div className={block()}>
      <Link to="..">back to pal list</Link>
      <div className={element("wrapper")}>
        <div className={element("input")}>
          <button onClick={() => start()}>start voice recording</button>
          {input}
        </div>
        <div className={element("ouput")}>{output}</div>
      </div>
    </div>
  );
}
