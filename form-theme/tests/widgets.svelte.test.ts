import { widgetTests } from "testing/snapshots/widget-tests";

import { theme } from "../src/index.js";
import { specs } from "../src/specs.js";

widgetTests(theme, specs);
