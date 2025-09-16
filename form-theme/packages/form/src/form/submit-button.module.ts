import type { Snippet } from "svelte";

import type { Config } from "./config.js";

declare module "./components.js" {
  interface FoundationalComponents {
    submitButton: {};
  }
  interface ComponentProps {
    submitButton: {
      config: Config;
      children: Snippet;
    };
  }
  interface ComponentBindings {
    submitButton: "";
  }
}
