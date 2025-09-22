import ScheduleModal from "@/components/ScheduleModal";
import { ScheduleItem } from "@/utils/Schedule";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const useScheduleModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const Modal = (props: { onSubmit: (data: ScheduleItem) => void, onDelete: () => void }) => (
    <AnimatePresence>
      {isOpen && <ScheduleModal onClose={close} onSubmit={props.onSubmit} onDelete={props.onDelete} />}
    </AnimatePresence>
  )

  return { open, close, Modal };
}

export default useScheduleModal