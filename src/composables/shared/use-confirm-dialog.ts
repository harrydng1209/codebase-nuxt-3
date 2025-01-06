interface IOptions {
  cancelButtonText?: string;
  confirmButtonText?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
}

const useConfirmDialog = () => {
  const { t } = useI18n();

  const showConfirm = async (options: IOptions) => {
    const {
      cancelButtonText = t('shared.button.cancel'),
      confirmButtonText = t('shared.button.ok'),
      message,
      onCancel,
      onConfirm,
      title
    } = options || {};

    ElMessageBox.confirm(message, title, {
      cancelButtonText,
      center: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      confirmButtonText,
      showClose: false
    })
      .then(() => onConfirm())
      .catch(() => onCancel());
  };

  return { showConfirm };
};

export default useConfirmDialog;
