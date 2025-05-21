
import { motion } from "framer-motion";
import { RoleSelectionModal } from "@/components/RoleSelectionModal";

export default function RoleSelection() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-background/80 to-background flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
      >
        <RoleSelectionModal />
      </motion.div>
    </motion.div>
  );
}
