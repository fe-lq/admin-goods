/**
 * @commitlint/config-conventional
 * https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/index.js
 */
export default {
  extends: ["@commitlint/config-conventional"],
  // 自定义commit格式
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)(?:\[(\d{4})\])?: (.*)$/,
    },
  },
  rules: {
    "custom-rule": [2, "never"],
  },
  // 自定义插件配置提示规则
  plugins: [
    {
      rules: {
        "custom-rule": (parsed: any) => {
          const { type, scope, subject } = parsed;
          const typeList = ["feat", "fix", "style", "build"];

          if (scope === null || subject === null) {
            if (type === null) {
              return [
                false,
                `header must be in format 'type[scope]: subject' and scope is 4 numbers`,
              ];
            } else if (typeList.includes(type)) {
              return [false, `[scope] may not be empty and it's 4 numbers`];
            }
          }
          return [true, ""];
        },
      },
    },
  ],
};
