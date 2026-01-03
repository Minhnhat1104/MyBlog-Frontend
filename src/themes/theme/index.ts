import { PalettesProps } from '@ant-design/colors';

import { PresetColor, ThemeMode } from '~/themes/types/config';
import { PaletteThemeProps } from '~/themes/types/theme';

import Default from './default';

const Theme = (colors: PalettesProps, presetColor: PresetColor, mode: ThemeMode): PaletteThemeProps => {
  return Default(colors);
};

export default Theme;
