// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }
// .storybook/preview.tsx
import { theme } from "@chakra-ui/react"

export const parameters = {
  chakra: {
    theme
  }
}