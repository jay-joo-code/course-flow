import { toast } from "react-toastify"

type IToastVariant = 'info' | 'success' | 'warning' | 'error'

export const showToast = (variant: IToastVariant, msg: string) => {
  toast[variant](msg)
}
