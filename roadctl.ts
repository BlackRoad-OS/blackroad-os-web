#!/usr/bin/env -S node --loader tsx
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { ensureCloudflareDns, DnsConfig, describeDnsPlan } from "./cloudflare";
import { DeployRequest, recordDeploymentAudit } from "./audit";

interface DeployMap {
  [key: string]: DeployRequest;
}

function parseEnvFile(envPath: string) {
  if (!fs.existsSync(envPath)) {
    console.warn(`Env file not found at ${envPath}, skipping injection`);
    return {} as Record<string, string>;
  }

  const content = fs.readFileSync(envPath, "utf-8");
  const env: Record<string, string> = {};

  for (const line of content.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const [key, ...rest] = line.split("=");
    const value = rest.join("=").trim();
    if (key) {
      const trimmedKey = key.trim();
      env[trimmedKey] = value;
      if (process.env[trimmedKey] === undefined) {
        process.env[trimmedKey] = value;
      }
    }
  }

  return env;
}

async function runEntry(entry: string, port: number, extraEnv: Record<string, string>) {
  const env = { ...process.env, ...extraEnv, PORT: String(port) };

  if (process.env.ROADCTL_SKIP_ENTRY === "1") {
    console.log(`[roadctl] ROADCTL_SKIP_ENTRY=1 set; not launching entry command (${entry})`);
    return;
  }

  console.log(`[roadctl] running: ${entry} (PORT=${port})`);
  await new Promise<void>((resolve, reject) => {
    const child = spawn(entry, { shell: true, stdio: "inherit", env });
    child.on("close", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`Entry command exited with code ${code}`));
    });
  });
}

async function deploy(target: string, deployments: DeployMap) {
  const request = deployments[target];
  if (!request) {
    const available = Object.keys(deployments).join(", ") || "<none>";
    throw new Error(`Unknown deployment target '${target}'. Available: ${available}`);
  }

  const envPath = path.join(process.cwd(), request.envFile);
  const envFromFile = parseEnvFile(envPath);

  console.log("[roadctl] Starting deployment with:");
  console.log(`  repo: ${request.repo}`);
  console.log(`  domain: ${request.domain}`);
  console.log(`  entry: ${request.entry}`);
  console.log(`  env file: ${envPath}`);
  console.log(`  dns: ${describeDnsPlan(request.dns)}`);

  const dnsResult = await ensureCloudflareDns(request.dns);
  console.log(`[roadctl] DNS ready for ${dnsResult.fqdn} (record id: ${dnsResult.recordId})`);

  const record = await recordDeploymentAudit(request);
  console.log(`[roadctl] Audit recorded as ${record.id}`);

  await runEntry(request.entry, request.port, envFromFile);
}

const deployments: DeployMap = {
  web: {
    repo: "blackroad-os-web",
    port: 3100,
    domain: "web.blackroad.systems",
    entry: "npm run start",
    envFile: "env/shared.env",
    runtime: "node",
    agent: "cadillac",
    memory: {
      hash: "pssha://deploy-web-genesis",
      reason: "BlackRoad OS Web Genesis Deploy",
      journalFile: "registry/deployments.json"
    },
    dns: {
      provider: "cloudflare",
      zone: "blackroad.systems",
      recordName: "web",
      targetIP: process.env.TARGET_IP ?? "1.2.3.4"
    } satisfies DnsConfig
  }
};

async function main() {
  const [, , command, target] = process.argv;

  if (command !== "deploy" || !target) {
    console.log("Usage: roadctl deploy <target>\n");
    console.log("Available targets:");
    for (const key of Object.keys(deployments)) {
      console.log(`  - ${key}`);
    }
    process.exit(command ? 1 : 0);
  }

  try {
    await deploy(target, deployments);
  } catch (error) {
    console.error("[roadctl] Deployment failed:", error);
    process.exit(1);
  }
}

void main();
