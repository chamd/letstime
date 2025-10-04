"use client";

import useModal from "@/hooks/useModal";
import { AnimatePresence } from "framer-motion";
import { useState } from "react"
import { GoPlus } from "react-icons/go";
import TodoModal from "@/components/TodoModal";
import { TodoItem, TodoState } from "@/utils/Schedule";

const menuBase = "z-1 w-full h-full leading-12 text-center font-bold duration-200 active:scale-95"

const Todo = () => {
  const [isTodo, setIsTodo] = useState<boolean>(true);
  const { isOpen, open, close } = useModal();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <TodoModal
            onClose={close}
            onSubmit={() => {}}
            onDelete={() => {}}
            selectedItem={null}
          />
        )}    
      </AnimatePresence>
      <div className="p-4 flex flex-col gap-3">
        <div className="
          w-50 h-12 fixed
          left-0 right-0 mx-auto
          bg-slate-200 rounded-full
          text-lg text-slate-500
          flex flex-row items-center
        ">
          <div className={menuBase} onClick={() => setIsTodo(true)}>할일</div>
          <div className={menuBase} onClick={() => setIsTodo(false)}>완료</div>
          <div className={`
            w-24 h-10 absolute z-0
            bg-white rounded-full shadow-md
            duration-200
            left-0 right-0 mx-auto
            ${isTodo ? "-translate-x-1/2" : "translate-x-1/2"}
          `}></div>
        </div>

        <div 
          onClick={open}
          className="
            fixed w-12 h-12 right-4
            bg-white rounded-full shadow-md text-3xl
            border border-slate-200
            flex items-center justify-center
            duration-100 active:scale-95
        ">
          <GoPlus />
        </div>
      </div>
    </>
  )
}

export default Todo