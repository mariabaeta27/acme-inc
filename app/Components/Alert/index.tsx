'use client'

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Message } from "../../../types/types";

const Alert = ({ onClose, message, showAlert, setShowAlert }: { onClose: any, message: Message, showAlert: boolean, setShowAlert: any }) => {

  const styleAlert = message?.status !== 200 && 'bg-red/10 textxt-red'

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false)
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (

    <>
      {showAlert && (
        <div className={`fixed top-0 right-0 mt-12 mr-5 p-3 w-auto rounded bg-green-500/10 shadow-lg flex ${styleAlert}`}>
          <p className="text-green text-sm">{message?.message}!</p>
          <XMarkIcon className="text-green h-3 w-3 ml-1" onClick={() => setShowAlert(false)} />
        </div>
      )}
    </>

  )
}

export default Alert