import { ref, onMounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'

type BreakpointKey =
  | 'sm' | 'md' | 'lg' | 'xl'
  | '2xl' | '3xl' | '4xl' | '5xl'

export function useBreakpoint() {
  const breakpoints = ref<Record<BreakpointKey, string>>({
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
    '4xl': '2560px',
    '5xl': '3840px'
  })

  const queries = {
    isSm: useMediaQuery(`(max-width: ${breakpoints.value.sm})`),
    isMd: useMediaQuery(`(max-width: ${breakpoints.value.md})`),
    isLg: useMediaQuery(`(max-width: ${breakpoints.value.lg})`),
    isXl: useMediaQuery(`(max-width: ${breakpoints.value.xl})`),
    is2xl: useMediaQuery(`(max-width: ${breakpoints.value['2xl']})`),
    is3xl: useMediaQuery(`(max-width: ${breakpoints.value['3xl']})`),
    is4xl: useMediaQuery(`(max-width: ${breakpoints.value['4xl']})`),
    is5xl: useMediaQuery(`(max-width: ${breakpoints.value['5xl']})`)
  }

  onMounted(() => {
    const style = getComputedStyle(document.documentElement)

    ;(Object.keys(breakpoints.value) as BreakpointKey[]).forEach(key => {
      const cssVar = style.getPropertyValue(`--breakpoint-${key}`) // ✔ correto
      if (cssVar.trim()) {
        breakpoints.value[key] = cssVar.trim()
      }
    })
  })

  return {
    breakpoints,
    ...queries,
    isMobile: queries.isSm,
    isTablet: queries.isMd,
    isDesktop: queries.isLg
  }
}
