import { getCodeSandboxHost } from "@codesandbox/utils";

const codeSandboxHost = getCodeSandboxHost(3001)

export default {
  api: {
    baseUrl: codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'
  },
  search: {
    limit: 100,
    debounce: 200
  }
} as const;
