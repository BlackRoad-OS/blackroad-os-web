/**
 * Cece Client - Frontend client for the Operator Engine /chat endpoint
 *
 * Connects the CecePanel UI to the BlackRoad Operator Engine.
 */

const DEFAULT_OPERATOR_URL =
  'https://blackroad-os-operator-production-8d28.up.railway.app';

function getOperatorUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_OPERATOR_URL;
  if (!envUrl) {
    console.warn(
      '[CeceClient] NEXT_PUBLIC_OPERATOR_URL not set, using default:',
      DEFAULT_OPERATOR_URL
    );
  }
  return envUrl || DEFAULT_OPERATOR_URL;
}

// Request types
export interface CeceChatRequest {
  message: string;
  userId?: string;
  model?: string;
}

// Trace info from the Operator Engine
export interface CeceChatTrace {
  llm_provider: string;
  model: string;
  used_rag: boolean;
  response_time_ms: number;
  rag_latency_ms?: number;
  num_context_chunks?: number;
}

// Response from the Operator Engine
export interface CeceChatResponse {
  reply: string;
  trace: CeceChatTrace;
}

// Error response
export interface CeceError {
  error: string;
  code?: string;
}

/**
 * Send a message to Cece via the Operator Engine /chat endpoint
 */
export async function sendCeceMessage(
  input: CeceChatRequest
): Promise<CeceChatResponse> {
  const baseUrl = getOperatorUrl();
  const url = `${baseUrl}/chat`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: input.message,
      user_id: input.userId || 'anonymous',
      model: input.model,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Cece request failed: ${response.status}`;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.detail || errorJson.error || errorMessage;
    } catch {
      if (errorText) {
        errorMessage = errorText;
      }
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();

  // Map the response to our types
  return {
    reply: data.reply,
    trace: {
      llm_provider: data.trace?.llm_provider || 'unknown',
      model: data.trace?.model || 'unknown',
      used_rag: data.trace?.used_rag || false,
      response_time_ms: data.trace?.response_time_ms || 0,
      rag_latency_ms: data.trace?.rag_latency_ms,
      num_context_chunks: data.trace?.num_context_chunks,
    },
  };
}

/**
 * Check if the Operator Engine is healthy
 */
export async function checkCeceHealth(): Promise<boolean> {
  const baseUrl = getOperatorUrl();
  try {
    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}
