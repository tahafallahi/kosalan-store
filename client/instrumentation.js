export function register() {
  const required = [
    "NEXT_PUBLIC_MEDUSA_BACKEND_URL",
    "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
  ];

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) throw new Error(`Missing required env variables: ${missing.join(", ")}`)
}
