import React from "react";
import { motion } from "framer-motion";
import { ScheduleItem } from "@/utils/Schedule";

const colors = [
  "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500",
  "bg-lime-500", "bg-green-500", "bg-emerald-500", "bg-teal-500",
  "bg-cyan-500", "bg-sky-500", "bg-blue-500", "bg-indigo-500",
  "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", "bg-pink-500", "bg-rose-500"
];

type Props = {
  onClose: () => void;
  onSubmit: (data: ScheduleItem) => void;
  onDelete: () => void;
}

const ScheduleModal = ({ onClose, onSubmit, onDelete }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string || "일정";
    const longStr = formData.get("long") as string || "1";
    const long = Number(longStr);
    const color = formData.get("color") as string;

    onSubmit({ title, long, color });    
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "linear", duration: 0.2 }}
        onClick={onClose}
        className="w-full h-full fixed top-0 bg-slate-950 z-1">
      </motion.div>    
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ ease: "linear", duration: 0.2 }}
        className="
          w-80 h-auto fixed
          top-40 left-0 right-0 mx-auto p-5
          bg-slate-50 z-2 rounded-3xl"
      >
        <form 
          onSubmit={(event) => handleSubmit(event)}
          className="
            flex flex-col gap-4"
        >
          <div className="text-2xl font-bold text-center">일정 등록</div>
          <input 
            type="text" 
            placeholder="일정"
            name="title"
            className="
              border-b-2 border-b-slate-300 
              w-3/4 h-10 mx-auto 
              duration-200 text-xl text-center
              focus:outline-0 focus:border-b-blue-500"
              />
          <input 
            type="number"
            placeholder="시간"
            name="long"
            className="
              border-b-2 border-b-slate-300 
              w-3/4 h-10 mx-auto 
              duration-200 text-xl text-center
              focus:outline-0 focus:border-b-blue-500"
          />
          <div className="flex flex-wrap gap-2 place-content-center">
            {colors.map((item, index) => (
              <React.Fragment key={index}>
                <label 
                  className={`
                    w-8 h-8 block 
                    ${item} rounded-full duration-200 
                    has-[:checked]:scale-120 has-[:checked]:shadow-lg has-[:checked]:shadow-slate-400
                  `}
                >
                  <input type="radio" name="color" value={item} className="hidden" defaultChecked={index === 0 && true} />
                </label>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={onDelete}
              className="
                bg-slate-200 text-slate-950 
                w-full h-10 rounded-xl 
                text-lg font-bold
                active:scale-98 duration-200
              ">
              삭제
            </button>
            <button 
              type="submit"
              className="
                bg-blue-500 text-slate-50 
                w-full h-10 rounded-xl 
                text-lg font-bold 
                active:scale-98 duration-200
              ">
              등록
            </button>
          </div>
        </form>
      </motion.div>
    </>
  )
}

export default ScheduleModal;