"use client";

import useModal from "@/hooks/useModal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react"
import { GoPlus, GoCheck } from "react-icons/go";
import TodoModal from "@/components/TodoModal";
import ScheduleUtil, { TodoItem, TodoState } from "@/utils/Schedule";

const menuBase = "z-1 w-full h-full leading-12 text-center font-bold duration-200 active:scale-95"

const Todo = () => {
  const [isTodo, setIsTodo] = useState<boolean>(true);
  const [todo, setTodo] = useState<TodoState>([]);
  const [selectedItem, setSelectedItem] = useState<TodoItem | null>(null);
  const { isOpen, open, close } = useModal();

  useEffect(() => {
    const todoData = localStorage.getItem("todoData");
    const todoObject = JSON.parse(todoData || "[]");
    setTodo(todoObject);
  }, [])

  const handleSubmit = (data: TodoItem) => {
    setTodo((prev) => {
      const newTodo = [ ...prev ];
      const index = newTodo.findIndex(o => o.id === data.id);
      if (index > -1) {
        newTodo[index] = data;
      } else {
        newTodo.push(data);
      }
      localStorage.setItem("todoData", JSON.stringify(newTodo));
      return newTodo;
    });
    close();
  }

  const handleDelete = () => {
    setTodo((prev) => {
      const newTodo = [ ...prev ];
      const index = newTodo.findIndex(o => o.id === selectedItem?.id);
      if (index > -1) {
        newTodo.splice(index, 1);
      }
      localStorage.setItem("todoData", JSON.stringify(newTodo));
      return newTodo;
    });
    close();
  }

  const handleSetTodo = (item: TodoItem | null) => {
    setSelectedItem(item);
    open();
  }

  const handleToggleDone = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>, 
    id: string
  ) => {
    e.stopPropagation();
    setTodo((prev) => {
      const newTodo = [ ...prev ];
      const index = newTodo.findIndex(o => o.id === id);
      newTodo[index] = { ...newTodo[index], done: !newTodo[index].done };
      localStorage.setItem("todoData", JSON.stringify(newTodo));
      return newTodo;
    });
  }

  const visibleTodos = isTodo
    ? todo.filter(item => !item.done)
    : [...todo].sort((a, b) => Number(a.done) - Number(b.done));

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <TodoModal
            onClose={close}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            selectedItem={selectedItem}
          />
        )}    
      </AnimatePresence>
      <div className="p-4">
        <div className="
          w-50 h-12 fixed
          left-0 right-0 mx-auto
          bg-slate-200 rounded-full
          text-lg text-slate-500
          flex flex-row items-center
        ">
          <div className={menuBase} onClick={() => setIsTodo(true)}>할일</div>
          <div className={menuBase} onClick={() => setIsTodo(false)}>전체</div>
          <div className={`
            w-24 h-10 absolute z-0
            bg-white rounded-full shadow-md
            duration-200
            left-0 right-0 mx-auto
            ${isTodo ? "-translate-x-1/2" : "translate-x-1/2"}
          `}></div>
        </div>

        <div 
          onClick={() => handleSetTodo(null)}
          className="
            fixed w-12 h-12 right-4
            bg-white rounded-full shadow-md text-3xl
            border border-slate-200
            flex items-center justify-center
            duration-100 active:scale-95
        ">
          <GoPlus />
        </div>

        <div className="pt-16 flex flex-col gap-2">
          <AnimatePresence>
            {visibleTodos.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0}}
                animate={{ opacity: item.done ? 0.5 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleSetTodo(item)}
                className={`
                  shadow-lg shadow-slate-200 
                  w-full p-3 text-md font-semibold rounded-xl break-keep
                  flex gap-4 items-center justify-between
                  ${ScheduleUtil.getColorById(item.colorId, "light")}
                  ${item.done ? 'italic' : ''}
                `}>
                {item.title}
                <div onClick={(e) => handleToggleDone(e, item.id)}>
                  {item.done ? (
                    <div className={`
                      w-6 h-6 rounded-lg shrink-0 duration-100 active:scale-90
                      ${ScheduleUtil.getColorById(item.colorId)}
                      flex items-center justify-center text-xl text-white
                    `}>
                      <GoCheck />
                    </div>
                  ) : (
                    <div className={`
                      w-6 h-6 rounded-lg bg-white shrink-0
                      duration-100 active:scale-90
                    `}></div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default Todo