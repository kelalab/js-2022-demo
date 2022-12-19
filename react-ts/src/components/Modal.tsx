import { EventHandler, MouseEventHandler } from "react";

interface ModalProps {
  children?: JSX.Element;
  backdropClose?: boolean;
  close?: Function;
  title?: string;
}

const Modal = (props: ModalProps) => {
  const { backdropClose, close } = props;

  return (
    <div
      onClick={
        backdropClose !== false
          ? close !== undefined
            ? () => close()
            : undefined
          : undefined
      }
      className="z-40 
                   absolute 
                   left-0 
                   top-0 
                   w-full 
                   h-full 
                   text-center
                   align-middle
                   bg-gray-900/75
                   backdrop-blur-sm
                   flex-col
                   flex
                   items-center
                   justify-center
                   "
    >
      <div
        className="flex-initial border-2 border-gray rounded-md bg-slate-800 z-50"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="bg-slate-900 p-4 text-left">
          <h2 className="font-bold text-xl">{props.title}</h2>
        </div>
        <div className="p-8">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
