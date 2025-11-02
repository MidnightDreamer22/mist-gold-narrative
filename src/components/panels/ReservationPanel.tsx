import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';

const ReservationPanel = () => {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', text: string }>>([
    { role: 'assistant', text: "Welcome to Simona! I'm here to help you reserve a table. When would you like to visit?" }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatMessages(prev => [...prev, { role: 'user', text: message }]);
    setMessage('');
    
    // Simulate response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "Thank you! Let me check availability for you. How many guests will be joining?" 
      }]);
    }, 800);
  };

  return (
    <section className="snap-section min-h-screen bg-ink-900">
      <div className="section-content container mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-5xl md:text-6xl font-display text-mist-100 text-center mb-12">
          Reserve a Table
        </h2>

        {/* Conversation Tab */}
        <div className="bg-ink-700 rounded-lg border border-border overflow-hidden mb-8">
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{
                  animation: 'messageEnter 480ms cubic-bezier(.16,1,.3,1) forwards',
                  opacity: 0
                }}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-gold-400 text-ink-900'
                      : 'bg-ink-500 text-mist-300'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-ink-900/50">
            <div className="flex gap-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-ink-700 border-border text-mist-300 focus:ring-gold-400"
                autoFocus
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gold-400 hover:bg-gold-300 text-ink-900"
                size="icon"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* DOCX Notations Section */}
        <div className="bg-ink-700 rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-ink-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <span className="text-lg font-display text-mist-100">
              View Full Reservation Details & Policies
            </span>
            {expanded ? <ChevronUp size={20} className="text-gold-400" /> : <ChevronDown size={20} className="text-gold-400" />}
          </button>

          {expanded && (
            <div 
              className="px-6 py-6 border-t border-border"
              style={{
                animation: 'expandDown 500ms cubic-bezier(.16,1,.3,1) forwards'
              }}
            >
              <div className="prose prose-invert max-w-none space-y-4 text-mist-300">
                <h3 className="text-2xl font-display text-mist-100">Reservation Information</h3>
                
                <p className="text-lg font-semibold text-gold-400">
                  📄 DOCX Content Placeholder
                </p>
                
                <p>
                  This section will display all reservation policies, notations, disclaimers, 
                  and instructions from your DOCX file. The content will include:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reservation policies and cancellation terms</li>
                  <li>Dress code requirements</li>
                  <li>Group booking guidelines</li>
                  <li>Special event information</li>
                  <li>COVID-19 safety protocols</li>
                  <li>Payment and deposit policies</li>
                </ul>
                
                <div className="mt-6 p-4 border border-gold-400/20 rounded bg-ink-900/50">
                  <p className="text-sm text-gold-400">
                    📄 To add your policies: Upload your DOCX file and the content will automatically 
                    appear here with proper formatting (headings, lists, emphasis preserved).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes messageEnter {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 2000px;
          }
        }
      `}</style>
    </section>
  );
};

export default ReservationPanel;
