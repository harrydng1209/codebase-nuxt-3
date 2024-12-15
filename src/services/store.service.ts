import { getActivePinia, type Pinia, type Store } from 'pinia';

interface IPinia extends Pinia {
  storeMap: Map<string, Store>;
}

const storeService = {
  getPinia: (): IPinia => {
    const pinia = getActivePinia() as IPinia;
    if (!pinia) throw new Error('There is no active Pinia instance');
    return pinia;
  },
  disposeAll: () => {
    const pinia = storeService.getPinia();
    pinia.storeMap.forEach((store) => store.$dispose());
  },
  resetAll: () => {
    const pinia = storeService.getPinia();
    pinia.storeMap.forEach((store) => store.$reset());
  }
};

export default storeService;
