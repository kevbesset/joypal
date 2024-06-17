import { useAppDispatch, useAppSelector } from "@/store";
import { clear as clearInStore, push } from "@/store/eventStore";
import { useEffect, useState } from "react";

export default function useEvent(eventName: string) {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.event.events);
  const [hasEvent, setHasEvent] = useState(false);
  const eventFound = events && events.find((event) => event.name === eventName);

  function trigger(args?: Record<string, unknown>) {
    dispatch(push({ name: eventName, args }));
  }

  function clear() {
    dispatch(clearInStore(eventName));
  }

  function read() {
    if (eventFound) {
      clear();
      return eventFound?.args;
    }

    return undefined;
  }

  useEffect(() => {
    if (eventFound) {
      setHasEvent(true);
    }
  }, [eventFound, eventName]);

  return {
    trigger,
    clear,
    read,
    hasEventReceived: hasEvent,
  };
}
