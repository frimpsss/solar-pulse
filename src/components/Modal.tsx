import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
interface props {
  isOpen: boolean;
  toogleIsOpen: any;
  children: ReactNode;
  closeOnBackdropClicked?: boolean;
}
const Modal = ({
  isOpen,
  toogleIsOpen,
  children,
  closeOnBackdropClicked = true,
}: props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#000] bg-opacity-20 backdrop-blur-[3px] flex items-center justify-center "
          onClick={() => {
            if (closeOnBackdropClicked) {
              toogleIsOpen();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;