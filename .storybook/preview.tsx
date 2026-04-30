import type { Preview } from "@storybook/nextjs-vite";
import ThemeProvider from "../context/ThemeProvider";
import ToggleTheme from "../components/ToggleTheme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },

  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="dark">
        <main id="storybook-root" className="min-h-screen flex items-center justify-center">
          <ToggleTheme styles="fixed top-8 z-50 inset-x-0 mx-auto" />
          <Story />
        </main>
      </ThemeProvider>
    ),
  ],
};

export default preview;