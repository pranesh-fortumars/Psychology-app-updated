
import { Colors } from '@/constants/theme';

/**
 * Custom hook to use the ClarityMind pale color scheme.
 * Since the app follows a strict "Pale Blue/Mint" guide (CF-402),
 * this hook ensures we use the consistent brand Colors.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors
) {
  // We prioritize the theme Colors over manual props in this specialized pale UI
  const colorFromProps = props.light; // Fallback to light prop if specific color is requested

  if (colorFromProps && colorName === 'primary') {
    return colorFromProps;
  }

  // Always return the standard pale colors defined in constants/theme.ts
  return Colors[colorName];
}
