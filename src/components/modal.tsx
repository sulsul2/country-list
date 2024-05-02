import { ReactNode } from "react";
import "../style/style.css";

function Modal({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: VoidFunction;
  children: ReactNode;
}) {
  const handleOnClose = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((event.target as HTMLDivElement).id === "container") {
      onClose();
    }
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={(e) => handleOnClose(e)}
      className="container"
    >
      <div className="modal">
        {children}
      </div>
    </div>
  );
}

export default Modal;
