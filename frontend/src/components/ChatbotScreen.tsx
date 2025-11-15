import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

interface ChatbotScreenProps {
  onComplete?: () => void;
}

export function ChatbotScreen({ onComplete }: ChatbotScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm your Career Discovery Assistant. I'm here to help you explore career paths that truly resonate with who you are. Let's have a conversation about your interests, passions, and what makes you excited about your future. Ready to begin?",
      sender: "bot",
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 2,
      text: "Yes, I'm ready!",
      sender: "user",
      timestamp: new Date(Date.now() - 55000)
    },
    {
      id: 3,
      text: "Wonderful! Let's start with something fun. What activities or hobbies do you enjoy the most in your free time?",
      sender: "bot",
      timestamp: new Date(Date.now() - 50000)
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    "What activities or hobbies do you enjoy the most in your free time?",
    "When you think about your future career, what type of work excites you the most?",
    "If you could spend your day doing something creative or artistic, what would it be?",
    "Are you more interested in the technical or creative side of work?",
    "What type of environment do you feel most energized in — creative spaces, structured offices, or dynamic, fast-paced situations?",
    "What kind of problems do you enjoy solving the most?",
    "Do you enjoy telling stories, whether through writing, visuals, or other mediums?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputValue("");

      // Simulate bot response with next question
      setTimeout(() => {
        let botResponse = "";
        const nextQuestionIndex = questionIndex + 1;

        if (nextQuestionIndex < questions.length) {
          // Acknowledgment + next question
          const acknowledgments = [
            "That's interesting! ",
            "Great to know! ",
            "I love hearing that! ",
            "Fascinating! ",
            "Thanks for sharing! "
          ];
          const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
          botResponse = ack + questions[nextQuestionIndex];
          setQuestionIndex(nextQuestionIndex);
        } else {
          // All questions answered
          botResponse = "Thank you so much for sharing all of that with me! 🎉 I have a much better understanding of your interests, strengths, and what drives you. Based on our conversation, I'm excited to help you explore career paths that align with your unique profile. Redirecting you to your personalized dashboard...";
          
          // Automatically go to dashboard after final message
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 3000);
        }

        const botMessage: Message = {
          id: messages.length + 2,
          text: botResponse,
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1500);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#667EEA]/5 via-[#F7F8FA] to-[#8BA888]/5 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667EEA] to-[#8BA888] flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Career Discovery Assistant</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-[#8BA888] animate-pulse" />
                <span>Online • Here to help you discover your path</span>
              </div>
            </div>
          </div>
          {onComplete && questionIndex >= questions.length && (
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-[#667EEA] to-[#8BA888] hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Continue to Dashboard
            </Button>
          )}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                  message.sender === "bot"
                    ? "bg-gradient-to-br from-[#667EEA] to-[#8BA888]"
                    : "bg-gradient-to-br from-gray-400 to-gray-500"
                }`}
              >
                {message.sender === "bot" ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className="flex-1 max-w-2xl">
                <div
                  className={`rounded-2xl px-6 py-4 shadow-sm ${
                    message.sender === "bot"
                      ? "bg-white border border-gray-200"
                      : "bg-gradient-to-br from-[#667EEA] to-[#7B8FEE] text-white"
                  }`}
                >
                  <p className="text-base leading-relaxed">{message.text}</p>
                </div>
                <p
                  className={`text-xs mt-2 px-2 ${
                    message.sender === "bot" ? "text-gray-400" : "text-gray-500 text-right"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#F7F8FA] rounded-full px-6 py-4 flex items-center border border-gray-200 focus-within:border-[#667EEA] focus-within:ring-2 focus-within:ring-[#667EEA]/20 transition-all">
              <input
                type="text"
                placeholder="Type your message here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-transparent outline-none text-base placeholder:text-gray-400"
              />
            </div>
            <Button
              onClick={handleSend}
              size="lg"
              className="h-14 px-8 rounded-full bg-gradient-to-br from-[#667EEA] to-[#8BA888] hover:opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Send
            </Button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            Press Enter to send • Be yourself and answer honestly
          </p>
        </div>
      </div>
    </div>
  );
}