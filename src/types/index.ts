export type ChatMode = 'info' | 'chat' | 'booking' | 'system'; // 'system' can be used for welcome/mode change messages

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  mode: ChatMode; 
}
