import type { TFailureResponse } from '@/models/types/auth.type';

import { EToast } from '@/models/enums/shared.enum';

import { isFailureResponse, showToast } from '~/utils/shared.util';

export const useHandleCatchError = () => {
  const { t } = useI18n();

  const handleCatchError = <D>(props: unknown) => {
    switch (true) {
      case isFailureResponse(props as TFailureResponse<D>): {
        const errorProp = props as TFailureResponse<D>;
        const errorData = errorProp.error.data;
        const errorCode = errorProp.error.code;
        const translatedMessage = t(errorCode);
        const errorMessage =
          translatedMessage !== String(errorCode)
            ? translatedMessage
            : errorProp.error.message;
        showToast(errorMessage, EToast.Error);
        return errorData;
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
