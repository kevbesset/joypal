export type ChatMessage = {
  id: string;
  role: string;
  content: string;
  model: string;
  created_at: number;
  done?: boolean;
  total_duration?: number; // time spent generating the response (in ns)
  load_duration?: number; // time spent in ns loading the model
  prompt_eval_count?: number; // number of tokens in the prompt
  prompt_eval_duration?: number; // time spent in nanoseconds evaluating the prompt
  eval_count?: number; // number of tokens in the response
  eval_duration?: number; // time in nanoseconds spent generating the response
};

export type ChatChannel = {
  id: string;
  title?: string;
  messages: ChatMessage[];
};

export type ChatFolder = {
  id: string;
  name: string;
  parent?: string;
};

export type ChatChannelOrganizer = {
  channelId: string;
  folderId: string;
};

export type RTCCPrompt = {
  role?: string;
  task: string;
  context?: string;
  more?: string;
};
