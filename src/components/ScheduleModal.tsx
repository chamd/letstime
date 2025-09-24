import React, { useState } from "react";
import { motion } from "framer-motion";
import ScheduleUtil, { ScheduleItem } from "@/utils/Schedule";

type Props = {
  onClose: () => void;
  onSubmit: (data: ScheduleItem) => void;
  onDelete: () => void;
  selectedItem: ScheduleItem | null;
}

const ScheduleModal = ({ onClose, onSubmit, onDelete, selectedItem }: Props) => {
  const [title, setTitle] = useState(selectedItem?.title || "");
  const [long, setLong] = useState(selectedItem?.long || 1);
  const [colorId, setColorId] = useState(selectedItem?.colorId ?? 0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ 
      title: title.trim() || "일정",
      long: long > 0 ? long : 1,
      colorId 
    });
  }

  const inputBaseStyle = `
    border-b-2 border-b-slate-300 
    h-10 mx-auto text-center 
    duration-200 focus:outline-0 focus:border-b-blue-500
  `;
  const buttonBaseStyle = `
    w-full h-10 rounded-xl 
    text-lg font-bold 
    duration-100 active:scale-95
  `;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950 z-10"
      />
      
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.2 }}
        className="fixed top-20 inset-x-0 w-80 h-auto mx-auto p-6 bg-slate-50 z-20 rounded-3xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="text-2xl font-bold text-center">
            {selectedItem ? "일정 수정" : "일정 등록"}
          </div>

          <div className="flex flex-row gap-4">
            <input 
              type="text" 
              placeholder="일정"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full text-xl ${inputBaseStyle}`}
            />
            <input 
              type="number"
              placeholder="1"
              min="1"
              value={long}
              onChange={(e) => setLong(Number(e.target.value))}
              className={`w-14 text-lg ${inputBaseStyle}`}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {ScheduleUtil.colors.map((_, index) => (
              <label 
                key={index}
                className={`
                  w-8 h-8 block rounded-full duration-200
                  ${ScheduleUtil.getColorById(index)}
                  ${colorId === index ? 'scale-120 shadow-lg shadow-slate-400' : ''}
                `}
              >
                <input 
                  type="radio" 
                  name="colorId"
                  value={index} 
                  checked={colorId === index}
                  onChange={() => setColorId(index)}
                  className="hidden" 
                />
              </label>
            ))}
          </div>
          
          <div className="flex flex-row gap-2 mt-2">
            {selectedItem && (
              <button
                type="button"
                onClick={onDelete}
                className={`bg-slate-200 text-slate-950 ${buttonBaseStyle}`}
              >
                삭제
              </button>
            )}
            <button 
              type="submit"
              className={`text-slate-50 ${selectedItem ? "bg-green-500" : "bg-blue-500"} ${buttonBaseStyle}`}
            >
              {selectedItem ? "수정" : "등록"}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  )
}

export default ScheduleModal;