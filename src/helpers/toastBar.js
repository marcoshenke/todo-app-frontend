import { useToast } from 'vue-toast-notification'

const toast = useToast()

const toastBar = ({ message, type }) => {
  toast.clear()

  return toast.open({
    message: message,
    type: type,
    duration: 0,
    duration: type === 'error' ? 0 : 4000,
    position: 'top'
  })
}

export default toastBar
