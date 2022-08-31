import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  base: "/apps/react-diagram-maker/",
  build: {
    outDir: "react-diagram-maker",
  },
});
