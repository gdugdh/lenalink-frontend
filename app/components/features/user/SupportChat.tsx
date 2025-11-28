'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { MessageCircle, Send } from 'lucide-react';

export function SupportChat() {
  const [message, setMessage] = useState('');
  const [messages] = useState<any[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      setMessage('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg h-[400px] flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold">Служба поддержки</p>
            <p className="text-xs text-muted-foreground">Обычное время ответа: 5 минут</p>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${msg.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Начните разговор с нашей службой поддержки</p>
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

