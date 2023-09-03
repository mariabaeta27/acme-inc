import { Message } from "../../../types/types";
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from "../Button";

const Modal = (
  { isOpen, onClose, message, button, onClick }:
    { isOpen: boolean, onClose: any, message?: Message, button?: string, onClick?: any }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-x-0 mt-24 flex items-center justify-center z-50 bg-black bg-opacity-50">

      <div className="bg-white p-8 rounded-lg shadow-md relative">
        <div className='flex flex-col items-center'>
          {message?.status === 200 ? <CheckCircleIcon className="h-6 w-6" /> : <ExclamationCircleIcon className="h-6 w-6" />}
          <h2 className="text-2xl font-semibold align-text-center">{message?.status === 200 ? 'Sucesso!' : 'Atenção!'}</h2>
        </div>
        <p>{message?.message}</p>
        <button
          onClick={onClose}
          className="m-1 p-1 absolute top-0 right-0"
        >
          {message?.status !== 200 && (<XMarkIcon className="text-green h-6 w-6" />)}

        </button>
        {button && (
          <div className="flex mt-5">
            <Button text={button} type="button" onClick={onClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
