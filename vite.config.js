import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
// import { resolve, dirname } from "path";
// import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsConfigPaths()],
  // resolve: {
  //   alias: {
  //     "#assets": resolve(dirname(fileURLToPath(import.meta.url)), "src/assets"),
  //     "#components": resolve(
  //       dirname(fileURLToPath(import.meta.url)),
  //       "src/components",
  //     ),
  //     "#constants": resolve(
  //       dirname(fileURLToPath(import.meta.url)),
  //       "src/constants",
  //     ),
  //   },
  // },
});
