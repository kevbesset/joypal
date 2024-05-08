export type ChatMessage = {
  role: string;
  content: string;
  model: string;
  created_at: number;
  done: boolean;
  duration?: number;
};

export type ChatChannel = {
  id: string;
  messages: ChatMessage[];
};
