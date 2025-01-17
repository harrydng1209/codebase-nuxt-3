import { getActivePinia, type Pinia, type Store } from 'pinia';

interface IPinia extends Pinia {
  storeMap: Map<string, Store>;
}

const storeService = {
  disposeAll: () => {
    try {
      const pinia = storeService.getPinia();
      pinia.storeMap.forEach((store) => store.$dispose());
    } catch (error) {
      console.error(error);
    }
  },

  getPinia: (): IPinia => {
    const pinia = getActivePinia() as IPinia;
    if (!pinia) throw new Error('There is no active Pinia instance');
    return pinia;
  },

  resetAll: () => {
    try {
      const pinia = storeService.getPinia();
      pinia.storeMap.forEach((store) => store.$reset());
    } catch (error) {
      console.error(error);
    }
  },
};

export default storeService;
