import { ElMessageBox } from 'element-plus';

interface ConfirmDialogOptions {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const useConfirmDialog = () => {
  const { t } = useI18n();

  const showConfirm = async (options: ConfirmDialogOptions) => {
    const {
      title,
      message,
      onConfirm,
      onCancel,
      confirmButtonText = t('button.ok'),
      cancelButtonText = t('button.cancel')
    } = options || {};

    return ElMessageBox.confirm(message, title, {
      confirmButtonText,
      cancelButtonText,
      center: true,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false
    })
      .then(() => onConfirm())
      .catch(() => onCancel());
  };

  return { showConfirm };
};

export default useConfirmDialog;
