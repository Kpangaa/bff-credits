import { ConfigEnvironment } from "@pepa/common";
import { AppConfiguration } from "./app.configuration";
import { createConfiguration } from "./config";

let config: ConfigEnvironment<AppConfiguration>;

try {
  config = createConfiguration();
  config.validate();
} catch (error) {
  if (process.env.NODE_ENV !== 'production') {
    throw error;
  }

  const msg = {
    message: error && error.name === 'MissingEnvVarsError' ? 'Missing env vars' : 'Invalid configuration',
    error: error,
  };
  console.log(JSON.stringify(msg));
  process.exit(1);
}

export const environment = config.get() as AppConfiguration;
