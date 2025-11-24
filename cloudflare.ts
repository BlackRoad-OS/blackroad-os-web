export interface DnsConfig {
  provider: "cloudflare";
  zone: string;
  recordName: string;
  targetIP: string;
}

interface CloudflareZoneSearch {
  success: boolean;
  errors?: { message: string }[];
  result?: { id: string }[];
}

interface CloudflareRecordResponse {
  success: boolean;
  errors?: { message: string }[];
  result?: { id: string };
}

const CLOUDFLARE_API = "https://api.cloudflare.com/client/v4";

function getAuthHeaders(apiToken: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`
  };
}

function formatErrors(errors: { message: string }[] | undefined) {
  if (!errors || errors.length === 0) return "Unknown Cloudflare error";
  return errors.map((error) => error.message).join("; ");
}

async function findZoneId(zone: string, headers: Record<string, string>): Promise<string> {
  const response = await fetch(`${CLOUDFLARE_API}/zones?name=${zone}`, { headers });
  const data = (await response.json()) as CloudflareZoneSearch;

  if (!data.success || !data.result?.length) {
    throw new Error(`Unable to locate Cloudflare zone for ${zone}: ${formatErrors(data.errors)}`);
  }

  return data.result[0].id;
}

async function findExistingRecord(
  zoneId: string,
  fqdn: string,
  headers: Record<string, string>
): Promise<string | undefined> {
  const response = await fetch(
    `${CLOUDFLARE_API}/zones/${zoneId}/dns_records?type=A&name=${fqdn}`,
    { headers }
  );

  const data = (await response.json()) as CloudflareZoneSearch & { result?: { id: string }[] };
  if (!data.success) {
    throw new Error(`Failed to query DNS records for ${fqdn}: ${formatErrors(data.errors)}`);
  }

  return data.result?.[0]?.id;
}

async function upsertRecord(
  zoneId: string,
  fqdn: string,
  targetIP: string,
  headers: Record<string, string>,
  existingRecordId?: string
): Promise<string> {
  const payload = {
    type: "A",
    name: fqdn,
    content: targetIP,
    ttl: 120,
    proxied: false
  };

  const url = existingRecordId
    ? `${CLOUDFLARE_API}/zones/${zoneId}/dns_records/${existingRecordId}`
    : `${CLOUDFLARE_API}/zones/${zoneId}/dns_records`;

  const method = existingRecordId ? "PUT" : "POST";
  const response = await fetch(url, { method, headers, body: JSON.stringify(payload) });
  const data = (await response.json()) as CloudflareRecordResponse;

  if (!data.success || !data.result?.id) {
    throw new Error(`Failed to ${existingRecordId ? "update" : "create"} DNS record: ${formatErrors(data.errors)}`);
  }

  return data.result.id;
}

export interface CloudflareResult {
  recordId: string;
  fqdn: string;
}

export async function ensureCloudflareDns(dns: DnsConfig): Promise<CloudflareResult> {
  if (dns.provider !== "cloudflare") {
    throw new Error(`Unsupported DNS provider: ${dns.provider}`);
  }

  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!apiToken) {
    throw new Error("CLOUDFLARE_API_TOKEN is required to manage DNS records");
  }

  const headers = getAuthHeaders(apiToken);
  const fqdn = `${dns.recordName}.${dns.zone}`;

  const zoneId = await findZoneId(dns.zone, headers);
  const existingRecordId = await findExistingRecord(zoneId, fqdn, headers);
  const recordId = await upsertRecord(zoneId, fqdn, dns.targetIP, headers, existingRecordId);

  return { recordId, fqdn };
}

export function describeDnsPlan(dns: DnsConfig) {
  return `DNS: ${dns.provider} will point ${dns.recordName}.${dns.zone} -> ${dns.targetIP}`;
}
