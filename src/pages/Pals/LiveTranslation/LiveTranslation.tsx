import { chat } from "@/libs/services/chatService";
import ElevenLabsAPI from "elevenlabs-ts";
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
const elevenLabs = new ElevenLabsAPI("2ff4907359d128b0df64267969e0f20c");

const useDebounce = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: unknown[]) => {
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

  async function play() {
    const audioResponse = await elevenLabs.textToSpeech(
      import.meta.env.VITE_ELEVENLABS_API_KEY,
      {
        text: output,
      }
    );
    const blob = new Blob([audioResponse], { type: "audio/mpeg" }); // Assurez-vous de spécifier le type MIME correct pour votre fichier audio
    const audioURL = URL.createObjectURL(blob);

    const audio = new Audio(audioURL);
    audio.play();
  }

  async function translate() {
    const response = await chat(
      [
        {
          role: "user",
          content: `Translate the following text in ${lang} with no explaination, no titles, nothing more

          Text to translate:
          ${text.trim()}

          Here's the text you translated last time, but do not repeat it:
          ${previousText}
          `,
        },
      ],
      "llama3:latest"
    );

    setOutput((o) => (o ? o + ".\n" : "") + response.message.content);
  }

  useEffect(() => {
    handleTranslation();
  }, [text]);

  return { output, play };
}

function useVoiceRecognition() {
  const [input, setInput] = useState("");
  const [fullInput, setFullInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  function start() {
    recognition.start();
  }

  useEffect(() => {
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Object.values(event.results)
        .filter((result) => result.isFinal)
        .map((result) => result[0].transcript);

      if (transcript.length) {
        setInput(transcript[transcript.length - 1]);
      }
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  useEffect(() => {
    if (input) {
      setFullInput((i) => i + input);
    }
  }, [input]);

  return { input, fullInput, start, isListening };
}

export default function LiveTranslation() {
  const { input, fullInput, start, isListening } = useVoiceRecognition();
  const { output, play } = useLiveTranslation(input);

  return (
    <div className={block()}>
      <Link to="..">back to pal list</Link>
      <div className={element("wrapper")}>
        <div className={element("input")}>
          {isListening ? (
            <>
              Listening...
              <br />
            </>
          ) : (
            <button onClick={() => start()}>start voice recording</button>
          )}
          {fullInput}
        </div>
        <div className={element("ouput")}>
          <button onClick={() => play()}>play</button>
          {output}
        </div>
      </div>
    </div>
  );
}
