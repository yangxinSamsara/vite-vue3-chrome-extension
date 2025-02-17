import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  root: "src/",
  plugins: [
    vue(),
    tailwindcss(),
    copy({
      targets: [
        { src: "manifest.json", dest: "dist" },
        { src: "src/icons/**", dest: "dist/icons" },
      ],
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, "src/popup/index.html"),
        contentPage: path.resolve(__dirname, "src/contentPage/index.html"),
        content: path.resolve(__dirname, "src/content/content.ts"),
        background: path.resolve(__dirname, "src/background/service-worker.ts"),
      },
      output: {
        assetFileNames: "assets/[name]-[hash].[ext]",
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: (chunkInfo) => {
          console.log("🚀 ~ chunkInfo:", chunkInfo);
          const baseName = path.basename(
            (chunkInfo as any).facadeModuleId,
            path.extname((chunkInfo as any).facadeModuleId)
          );
          const saveArr = ["content", "service-worker"];
          return `[name]/${saveArr.includes(baseName) ? baseName : chunkInfo.name}.js`;
        },
        name: "[name].js",
      },
    },
  },
});
