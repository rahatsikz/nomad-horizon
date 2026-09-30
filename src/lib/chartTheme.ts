/**
 * ECharts draws to canvas, so it can't read CSS variables. These mirror the
 * golden-hour tokens in globals.css for both themes.
 */
export function getChartPalette(resolvedTheme?: string) {
  const dark = resolvedTheme === 'dark';

  return {
    title: dark ? '#F2EADF' : '#1A1613',
    axisLabel: dark ? '#A89C8C' : '#5F564B',
    line: dark ? 'rgba(242, 234, 223, 0.12)' : 'rgba(26, 22, 19, 0.12)',
    tooltipBg: dark ? '#1A1614' : '#F4EFE7',
    tooltipText: dark ? '#F2EADF' : '#1A1613',
    accent: 'rgb(242, 165, 65)',
    accentFade: 'rgba(242, 165, 65, 0.45)',
    accentClear: 'rgba(242, 165, 65, 0)',
  };
}
