export default function checkEnvVariables<T>(value: T | undefined) {
  if (value !== undefined) return value;
  throw new Error(`Variables not found in .env file`);
}
