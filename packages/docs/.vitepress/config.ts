import { defineConfig, withBase } from "vitepress";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";

const base =
  process.env.DOCS_BASE ||
  (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/` : "/");

export default defineConfig({
  title: "MX UI",
  description: "基于 Ant Design Vue 的二次封装组件库",

  // 部署路径配置
  // 如果部署在服务器根路径，使用 "/"
  // 如果部署在 GitHub Pages 子路径，使用 "/mt-components/"
  base,

  head: [
    ["link", { rel: "icon", href: withBase("/favicon.ico") }],
    ["link", { rel: "stylesheet", href: withBase("/custom.css") }],
  ],

  // Vite 配置
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        "@my-vue/components": resolve(__dirname, "../../components/src"),
        "@my-vue/utils": resolve(__dirname, "../../utils/src"),
        "@": resolve(__dirname, "../../components/src"),
      },
    },
    optimizeDeps: {
      include: ["ant-design-vue", "@ant-design/icons-vue"],
    },
    ssr: {
      noExternal: ["@ant-design/icons-vue"],
    },
  },

  // 主题配置
  themeConfig: {
    // 网站标题
    siteTitle: "MX UI",

    // Logo
    logo: "/logo.png",

    // 导航栏
    nav: [
      { text: "指南", link: "/guide/introduction" },
      { text: "组件", link: "/components/button/" },
      { text: "Hooks", link: "/hooks/overview" },
      { text: "工具", link: "/utils/overview" },
      { text: "更新日志", link: "/changelog" },
    ],

    // 侧边栏
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "介绍", link: "/guide/introduction" },
            { text: "快速开始", link: "/guide/quickstart" },
            { text: "安装", link: "/guide/installation" },
            { text: "在项目中使用", link: "/guide/usage" },
            { text: "权限控制", link: "/guide/permission" },
            { text: "组件文档编写", link: "/guide/component-docs" },
          ],
        },
      ],
      "/components/": [
        {
          text: "通用",
          items: [{ text: "Button 按钮", link: "/components/button/" }],
        },
        {
          text: "业务组件",
          items: [
            { text: "DeleteButton 删除按钮", link: "/components/delete-button/" },
            { text: "ImportButton 导入按钮", link: "/components/import-button/" },
            { text: "SearchButton 搜索按钮", link: "/components/search-button/" },
            { text: "ResetButton 重置按钮", link: "/components/reset-button/" },
            { text: "SubmitButton 提交按钮", link: "/components/submit-button/" },
          ],
        },
        {
          text: "布局组件",
          items: [
            { text: "ButtonGroup 按钮组", link: "/components/button-group/" },
            { text: "FormLayout 表单布局", link: "/components/form-layout/" },
            { text: "TableAction 表格操作栏", link: "/components/table-action/" },
            { text: "BatchAction 批量操作", link: "/components/batch-action/" },
          ],
        },
        {
          text: "数据展示",
          items: [
            { text: "Table 表格", link: "/components/table/" },
            { text: "TableToolbar 表格工具栏", link: "/components/table-toolbar/" },
          ],
        },
        {
          text: "反馈",
          items: [{ text: "Modal 弹窗", link: "/components/modal/" }],
        },
      ],
      "/hooks/": [
        {
          text: "Hooks",
          items: [
            { text: "概览", link: "/hooks/overview" },
            { text: "useLocalStorage", link: "/hooks/use-local-storage" },
            { text: "useRequest", link: "/hooks/use-request" },
            { text: "useTable", link: "/hooks/use-table" },
          ],
        },
      ],
      "/utils/": [
        {
          text: "工具函数",
          items: [
            { text: "概览", link: "/utils/overview" },
            { text: "常用工具", link: "/utils/common" },
          ],
        },
      ],
    },

    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/Vcowner/mt-components" }],

    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present MX UI",
    },

    // 编辑链接
    editLink: {
      pattern: "https://github.com/Vcowner/mt-components/tree/main/packages/docs/:path",
      text: "在 GitHub 上编辑此页",
    },

    // 开启右侧目录导航
    outline: {
      level: [2, 3], // 显示 h2 和 h3 标题
      label: "目录",
    },
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
  },
});
