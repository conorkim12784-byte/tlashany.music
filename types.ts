
export interface BotConfig {
  botToken: string;
  apiId: string;
  apiHash: string;
  sudoUsers: string;
  prefix: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface Song {
  title: string;
  artist: string;
  duration: string;
  thumbnail: string;
}
