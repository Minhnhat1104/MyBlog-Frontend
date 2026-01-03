import { atom } from 'recoil';

import config from '~/config/config';
import { DefaultConfigProps } from '~/themes/types/config';

export const configAtom = atom<DefaultConfigProps>({
  key: 'configAtom',
  default: {
    ...config,
  } as DefaultConfigProps,
});
