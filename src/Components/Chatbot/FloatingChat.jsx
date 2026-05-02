import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import chatbot from '../../assets/Images/chatBot.png';
import '../../assets/Styles/ChatBot/FloatingChat.scss';
import ChatBot from '../Chatbot/ChatBot';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button 
        className="floating-chatbot-btn" 
        onClick={() => setIsOpen(true)} 
        aria-label="Open AI Chatbot"
      >
        <img src={chatbot} alt="" className="chatboticon"/>
        <span className="pulse-ring"></span>
      </button>

      {isOpen && (
        <div className="chatbot-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="chatbot-close-btn" 
              onClick={() => setIsOpen(false)}
              aria-label="Close Chatbot"
            >
              <X size={24} />
            </button>
            <ChatBot onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
