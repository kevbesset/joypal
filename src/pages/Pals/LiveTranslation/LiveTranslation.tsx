import { chat } from "@/libs/services/chatService";
import { useEffect, useState } from "react";
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

function useLiveTranslation(text: string, lang = "english") {
  const [currentTextTranslated, setCurrentTextTranslated] = useState("");
  const [output, setOutput] = useState("");

  async function checkForTranslation() {
    const textToTranslate = text.slice(currentTextTranslated.length);
    const textContext = text.slice(0, currentTextTranslated.length);
    const hasTextToTranslate = true; // check if not only ponctuations / emojis
    if (textToTranslate && hasTextToTranslate) {
      await setCurrentTextTranslated(text);
      await translate(textToTranslate, textContext);
    }
  }

  async function translate(textToTranslate: string, textContext: string) {
    console.log("translate", textToTranslate);
    const response = await chat(
      [
        {
          role: "user",
          content: `You are a super translator, I want you to translate in ${lang} what I just give you.
          Important rule: Just give me the translation of the text to translate, no extra text around

          Text to translate:
          ${textToTranslate}

          Here's what was before the text you need to translate:
          ${textContext}
          `,
        },
      ],
      "llama3:latest"
    );

    setOutput((o) => `${o} ${response.message.content}`);
  }

  useEffect(() => {
    checkForTranslation();
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
        .filter((result) => result.isFinal)
        .map((result) => result[0].transcript)
        .join("\n");
      console.log("onresult", transcript);

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
