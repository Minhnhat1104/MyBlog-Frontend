import { useRecoilState } from 'recoil';
// types
import { DefaultConfigProps, PresetColor, ThemeDirection, ThemeMode } from '~/base/types/config';
import { configAtom } from '~/base/store/atoms/config';
import _ from 'lodash';
// import { useAppSetting } from './user-setting/useAppSetting';

// ==============================|| CONFIG - HOOKS  ||============================== //

export interface UseConfigProps {
  onChange: (nConfig: DefaultConfigProps) => void;
}

const useConfig = () => {
  // const { saveAppSetting } = useAppSetting();
  const [config, setConfig] = useRecoilState<DefaultConfigProps>(configAtom);
  // console.log('🚀 ~ file: useConfig.ts:11 ~ useConfig ~ config', config);

  // save app config
  const handleAppSetting = (nConfig: DefaultConfigProps) => {
    // console.log('handleAppSetting');
    setConfig(nConfig);
    // saveAppSetting(nConfig);
  };

  return {
    ...config,
    onChangeContainer: () => {},
    // onChangeLocalization: async (lang: LangType) => {
    //   Ls.set('language-system', lang);
    //   const nConfig = { ...config, i18n: lang };
    //   handleAppSetting(nConfig);
    //   //change language view
    //   await i18n.changeLanguage(lang);
    // },
    onChangeMode: (mode: ThemeMode) => {
      const nConfig = { ...config, mode: mode };
      handleAppSetting(nConfig);
    },
    onChangePresetColor: (theme: PresetColor) => {
      const nConfig = { ...config, presetColor: theme };
      handleAppSetting(nConfig);
    },
    onChangeDirection: (direction: ThemeDirection) => {},
    // onChangeMiniDrawer: (miniDrawer: boolean) => {},
    onChangeFontFamily: (fontFamily: string) => {},
    initAppSetting: (nConfig: DefaultConfigProps) => {
      // console.log('initAppSetting', nConfig, config);
      if (!_.eq(nConfig, config)) {
        setConfig(nConfig);
      }
    },
  };
};

export default useConfig;
