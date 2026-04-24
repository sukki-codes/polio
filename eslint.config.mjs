import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import perfectionist from "eslint-plugin-perfectionist";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ─── @stylistic — JSX 포맷팅 규칙 ─────────────────────────────────────────
  {
    plugins: { "@stylistic": stylistic },
    rules: {
      "@stylistic/jsx-child-element-spacing": "warn",
      "@stylistic/jsx-closing-bracket-location": "warn",
      "@stylistic/jsx-closing-tag-location": "warn",
      "@stylistic/jsx-curly-brace-presence": ["warn", {
        props: "never",
        children: "never",
        propElementValues: "always",
      }],
      "@stylistic/jsx-curly-newline": ["warn", "consistent"],
      "@stylistic/jsx-curly-spacing": ["warn", "never"],
      "@stylistic/jsx-equals-spacing": ["warn", "never"],
      "@stylistic/jsx-first-prop-new-line": ["warn", "multiline-multiprop"],
      "@stylistic/jsx-function-call-newline": ["warn", "multiline"],
      "@stylistic/indent": ["warn", 2, { SwitchCase: 1 }],
      "@stylistic/jsx-indent-props": ["warn", 2],
      "@stylistic/jsx-max-props-per-line": ["warn", {
        maximum: { single: 3, multi: 1 },
      }],
      "@stylistic/jsx-newline": ["warn", { prevent: true }],
      "@stylistic/jsx-one-expression-per-line": ["warn", { allow: "single-child" }],
      "@stylistic/no-multi-spaces": "warn",
      "@stylistic/jsx-pascal-case": "warn",
      "@stylistic/jsx-self-closing-comp": ["warn", { component: true, html: true }],
      "@stylistic/jsx-tag-spacing": ["warn", {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never",
      }],
      "@stylistic/jsx-wrap-multilines": ["warn", {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line",
      }],
      "@stylistic/jsx-quotes": ["warn", "prefer-double"],
    },
  },

  // ─── perfectionist — 정렬 규칙 ────────────────────────────────────────────
  {
    plugins: { perfectionist },
    rules: {
      "perfectionist/sort-jsx-props": ["warn", {
        type: "alphabetical",
        order: "asc",
        groups: ["key", "ref", "shorthand", "unknown", "multiline", "callback"],
        customGroups: [
          { groupName: "key", elementNamePattern: "^key$" },
          { groupName: "ref", elementNamePattern: "^ref$" },
          { groupName: "callback", elementNamePattern: "^on[A-Z]" },
        ],
      }],
    },
  },

  // ─── React 규칙 (플러그인은 eslint-config-next가 이미 등록) ───────────────
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/destructuring-assignment": "off",
      "react/button-has-type": "off",
      "react/jsx-no-useless-fragment": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "react/no-array-index-key": "error",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/self-closing-comp": "off", // @stylistic/jsx-self-closing-comp으로 대체
    },
  },

  // ─── react-hooks 규칙 ─────────────────────────────────────────────────────
  {
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // ─── import/order — react* / redux* / zustand* → builtin → external ───────
  {
    rules: {
      "import/order": ["warn", {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        pathGroups: [
          { pattern: "react", group: "builtin", position: "before" },
          { pattern: "react/**", group: "builtin", position: "before" },
          { pattern: "react*", group: "builtin", position: "before" },
          { pattern: "react*/**", group: "builtin", position: "before" },
          { pattern: "redux*", group: "builtin", position: "before" },
          { pattern: "redux*/**", group: "builtin", position: "before" },
          { pattern: "zustand*", group: "builtin", position: "before" },
          { pattern: "zustand*/**", group: "builtin", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      }],
    },
  },

  // ─── 코드 품질 규칙 ───────────────────────────────────────────────────────
  {
    rules: {
      "no-unused-vars": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
