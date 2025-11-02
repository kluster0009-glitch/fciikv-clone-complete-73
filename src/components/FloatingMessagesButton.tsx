import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export function FloatingMessagesButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link to="/chat">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-neon-purple to-neon-cyan hover:scale-110"
        >
          <Send className="w-6 h-6 text-black" />
        </Button>
      </Link>
    </motion.div>
  );
}
