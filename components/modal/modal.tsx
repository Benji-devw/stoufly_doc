import { Dialog } from "@mui/material"

const Modal = ({children, open, onClose}: any) => {
  return (
    <Dialog
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      disableScrollLock={true}
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1
        }
      }}
    >
      {children}
    </Dialog>
  )
}

export default Modal;
