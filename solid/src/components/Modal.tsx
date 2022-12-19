import { JSX, Component } from "solid-js";

interface ModalProps {
  children?: JSX.Element;
  backdropClose?: boolean;
  close?: Function;
  title?: string;
}

const Modal: Component<ModalProps> = (props: ModalProps) => {
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
      class="z-40 
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
        class="flex-initial border-2 border-gray rounded-md bg-slate-800 z-50"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div class="bg-slate-900 p-4 text-left">
          <h2 class="font-bold text-xl">{props.title}</h2>
        </div>
        <div class="p-8">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
