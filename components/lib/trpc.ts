/**
 * API client for BlackRoad OS Gateway
 */

import { DEFAULT_GATEWAY_URL } from './constants';

export interface Agent {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  lastSeen: string;
}

/**
 * List all agents from the gateway
 */
export async function listAgents(): Promise<Agent[]> {
  try {
    const res = await fetch(`${DEFAULT_GATEWAY_URL}/agents`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch agents: ${res.status}`);
    }

    const data = await res.json();
    return data.agents || [];
  } catch (error) {
    console.error('Error fetching agents:', error);
    // Return empty array on error for demo purposes
    return [];
  }
}

/**
 * Get gateway version
 */
export async function gatewayVersion(): Promise<string> {
  try {
    const res = await fetch(`${DEFAULT_GATEWAY_URL}/version`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return 'unknown';
    }

    const data = await res.json();
    return data.version || 'unknown';
  } catch {
    return 'unknown';
  }
}
