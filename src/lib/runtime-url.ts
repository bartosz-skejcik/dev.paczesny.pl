import { SITE_URL } from "@/lib/seo"

const LOCAL_DEV_URL = "http://localhost:3000"

export type DeploymentEnvironment = "production" | "preview" | "development"

type DeploymentContext = {
  baseUrl: string
  env: DeploymentEnvironment
  isProduction: boolean
}

function normalizeUrl(candidate: string) {
  if (!candidate) {
    return ""
  }
  return candidate.startsWith("http") ? candidate : `https://${candidate}`
}

function detectEnvironment(): DeploymentEnvironment {
  const vercelEnv = process.env.VERCEL_ENV as DeploymentEnvironment | undefined
  if (vercelEnv === "production" || vercelEnv === "preview") {
    return vercelEnv
  }
  return process.env.NODE_ENV === "production" ? "production" : "development"
}

const deploymentContext: DeploymentContext = (() => {
  const env = detectEnvironment()
  const explicitUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? ""

  if (explicitUrl) {
    const normalized = normalizeUrl(explicitUrl)
    return { baseUrl: normalized, env, isProduction: env === "production" }
  }

  if (env === "production") {
    return { baseUrl: SITE_URL, env, isProduction: true }
  }

  if (process.env.VERCEL_URL) {
    return {
      baseUrl: normalizeUrl(process.env.VERCEL_URL),
      env,
      isProduction: false,
    }
  }

  return { baseUrl: LOCAL_DEV_URL, env, isProduction: false }
})()

export function getDeploymentContext(): DeploymentContext {
  return deploymentContext
}

export function runtimeAbsoluteUrl(path = "/"): string {
  const { baseUrl } = deploymentContext
  return new URL(path, baseUrl).toString()
}
