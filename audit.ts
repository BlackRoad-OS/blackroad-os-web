import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { DnsConfig } from "./cloudflare";

export interface MemoryConfig {
  hash: string;
  reason: string;
  journalFile: string;
}

export interface DeployRequest {
  repo: string;
  port: number;
  domain: string;
  entry: string;
  envFile: string;
  runtime: string;
  agent: string;
  memory: MemoryConfig;
  dns: DnsConfig;
}

export interface DeploymentRecord {
  id: string;
  timestamp: string;
  repo: string;
  domain: string;
  port: number;
  entry: string;
  runtime: string;
  agent: string;
  memory: MemoryConfig;
  dnsTarget: string;
  envFile: string;
}

async function ensureDir(directory: string) {
  await fs.mkdir(directory, { recursive: true });
}

async function loadJournal(journalPath: string): Promise<DeploymentRecord[]> {
  try {
    const existing = await fs.readFile(journalPath, "utf-8");
    const parsed = JSON.parse(existing) as { entries?: DeploymentRecord[] } | DeploymentRecord[];

    if (Array.isArray(parsed)) return parsed;
    if (parsed.entries) return parsed.entries;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn(`Unable to read deployment journal at ${journalPath}:`, error);
    }
  }

  return [];
}

function createRecord(request: DeployRequest, timestamp: string): DeploymentRecord {
  const id = crypto.createHash("sha256").update(`${timestamp}:${request.domain}:${request.port}`).digest("hex");

  return {
    id,
    timestamp,
    repo: request.repo,
    domain: request.domain,
    port: request.port,
    entry: request.entry,
    runtime: request.runtime,
    agent: request.agent,
    memory: request.memory,
    dnsTarget: `${request.dns.recordName}.${request.dns.zone} -> ${request.dns.targetIP}`,
    envFile: request.envFile
  };
}

async function writeSnapshot(snapshotPath: string, record: DeploymentRecord, journalPath: string) {
  const snapshot = {
    snapshot: "genesis",
    journal: path.relative(path.dirname(snapshotPath), journalPath),
    record
  };

  await fs.writeFile(snapshotPath, JSON.stringify(snapshot, null, 2));
}

async function writeJournal(journalPath: string, records: DeploymentRecord[]) {
  const payload = { entries: records };
  await fs.writeFile(journalPath, JSON.stringify(payload, null, 2));
}

export async function recordDeploymentAudit(request: DeployRequest, workingDir = process.cwd()): Promise<DeploymentRecord> {
  const timestamp = new Date().toISOString();
  const record = createRecord(request, timestamp);

  const psshaDir = path.join(workingDir, ".pssha");
  const registryPath = path.join(workingDir, request.memory.journalFile);
  const snapshotPath = path.join(psshaDir, "genesis.snapshot.json");

  await ensureDir(psshaDir);
  await ensureDir(path.dirname(registryPath));

  const journal = await loadJournal(registryPath);
  journal.push(record);

  await writeJournal(registryPath, journal);
  await writeSnapshot(snapshotPath, record, registryPath);

  return record;
}
