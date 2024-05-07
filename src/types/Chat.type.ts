export type ChatMessage = {
  role: string;
  content: string;
  model: string;
  created_at: Date;
  done: boolean;
  duration?: number;
};
