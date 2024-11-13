import React, { useState, useRef, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import '../../styles/faqPage/Faq.css';

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  { 
    question: "What is NewsTailor?", 
    answer: "NewsTailor is an AI-powered news aggregator that curates news from various sources, personalizing it based on your interests and available time." 
  },
  { 
    question: "How does NewsTailor adjust news length?", 
    answer: "Simply let us know how much time you have, and our AI will summarize the news to fit within that time, ensuring you get the information you need efficiently." 
  },
  { 
    question: "Can I choose specific news categories?", 
    answer: "Yes! You can select the categories that interest you most, and NewsTailor will prioritize news in those areas." 
  },
  { 
    question: "How often is the news updated?", 
    answer: "Our AI curates and updates news in real-time, keeping you informed on the latest developments as they happen." 
  }
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      contentRefs.current[openIndex]!.style.height = contentRefs.current[openIndex]!.scrollHeight + "px";
    }
    contentRefs.current.forEach((ref, i) => {
      if (i !== openIndex && ref) {
        ref.style.height = "0";
      }
    });
  }, [openIndex]);

  return (
    <div className="faq-section">
      {faqItems.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question-box" onClick={() => toggleAnswer(index)}>
            <h3 className="faq-question">{item.question}</h3>
            {openIndex === index ? (
              <AiOutlineMinus className="faq-icon" />
            ) : (
              <AiOutlinePlus className="faq-icon" />
            )}
          </div>
          <div 
            ref={(el) => (contentRefs.current[index] = el)} 
            className="faq-answer-wrapper"
          >
            <p className="faq-answer">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
