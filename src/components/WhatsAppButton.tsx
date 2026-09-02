import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "2347039148743";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to talk about a project.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle size={26} className="text-white" fill="white" />
    </a>
  );
}
