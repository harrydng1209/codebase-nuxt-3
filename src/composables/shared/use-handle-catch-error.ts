import type { IFailureResponse } from '@/models/interfaces/auth.interface';

import { EToast } from '@/models/enums/shared.enum';

const { isFailureResponse, showToast } = utils.shared;

const useHandleCatchError = () => {
  const { t } = useI18n();

  const handleCatchError = (props: unknown) => {
    switch (true) {
      case isFailureResponse(props as IFailureResponse): {
        const errorProp = props as IFailureResponse;
        const errorMessageKey = errorProp.error.code;
        const translatedMessage = t(errorMessageKey);
        const errorMessage =
          translatedMessage !== String(errorMessageKey)
            ? translatedMessage
            : errorProp.error.message;
        showToast(errorMessage, EToast.Error);
        break;
      }

      case props instanceof Error:
        showToast(props.message);
        break;

      default:
        console.error(props);
    }
  };

  return { handleCatchError };
};

export default useHandleCatchError;
