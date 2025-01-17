interface IProps {
  cancelButtonText?: string;
  confirmButtonText?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
}

const useConfirmDialog = () => {
  const { t } = useI18n();

  const showConfirmDialog = async (props: IProps) => {
    const {
      cancelButtonText = t('shared.button.cancel'),
      confirmButtonText = t('shared.button.ok'),
      message,
      onCancel,
      onConfirm,
      title,
    } = props || {};

    ElMessageBox.confirm(message, title, {
      cancelButtonText,
      center: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      confirmButtonText,
      showClose: false,
    })
      .then(() => onConfirm())
      .catch(() => onCancel());
  };

  return { showConfirmDialog };
};

export default useConfirmDialog;
