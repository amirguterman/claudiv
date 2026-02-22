/**
 * Headless Claude execution.
 *
 * Every Claudiv invocation is headless — no conversation sessions, no system
 * prompt overhead. The assembled prompt IS the complete context.
 *
 * Supports two modes:
 * - SDK: Claude Agent SDK `query()` with multi-turn thinking and sub-agents
 * - API: Direct Anthropic API call
 */

import { query } from '@anthropic-ai/claude-agent-sdk';
import type { AssembledPrompt } from './types.js';

export interface ExecutionResult {
  /** Whether execution succeeded */
  success: boolean;

  /** Claude's response text */
  response: string;

  /** Error message if failed */
  error?: string;

  /** Execution duration in ms */
  durationMs: number;
}

export interface ExecutorConfig {
  /** Execution mode */
  mode: 'sdk' | 'api';

  /** API key (for API mode) */
  apiKey?: string;

  /** Model to use */
  model?: string;

  /** Timeout in ms */
  timeoutMs?: number;

  /** Max tokens */
  maxTokens?: number;
}

const SYSTEM_PROMPT = `You are a code generation assistant for the Claudiv platform.

Follow the instructions in the prompt exactly. You may read files and explore the codebase to inform your response.

Do NOT ask questions as free text. If you need user input before you can proceed, output a <plan:questions> block using this syntax:

<plan:questions>
  <select question="Which approach?">
    <a>Option A</a>
    <b>Option B</b>
    <answer></answer>
  </select>
  <multiselect question="Which features?">
    <a>Feature 1</a>
    <b>Feature 2</b>
    <answer></answer>
  </multiselect>
  <yesno question="Enable X?"><answer></answer></yesno>
  <value question="What name?"><answer></answer></value>
  <input question="Describe the behavior?"><answer></answer></input>
</plan:questions>

Question types: select (single choice), multiselect (multiple), yesno (boolean), value (short text), input (long text).
Options use single-letter tags: <a>, <b>, <c>, etc.

Return CDML elements or <plan:questions> only — no explanatory prose.`;

/**
 * Execute a headless Claude invocation with the assembled prompt.
 */
export async function executeClaudeHeadless(
  assembled: AssembledPrompt,
  config: ExecutorConfig
): Promise<ExecutionResult> {
  const startTime = Date.now();

  try {
    let response: string;

    if (config.mode === 'sdk') {
      response = await executeSdk(assembled.prompt, config);
    } else {
      response = await executeApi(assembled.prompt, config);
    }

    return {
      success: true,
      response,
      durationMs: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      response: '',
      error: (error as Error).message,
      durationMs: Date.now() - startTime,
    };
  }
}

// ─── SDK Mode ───────────────────────────────────────────────────

/** Read-only tools for codebase exploration + sub-agents */
const SDK_ALLOWED_TOOLS = ['Read', 'Glob', 'Grep', 'Task'];

async function executeSdk(prompt: string, config: ExecutorConfig): Promise<string> {
  const abortController = new AbortController();
  const timeout = config.timeoutMs || 300_000;
  const timer = setTimeout(() => abortController.abort(), timeout);

  try {
    const conversation = query({
      prompt,
      options: {
        abortController,
        model: config.model,
        allowedTools: SDK_ALLOWED_TOOLS,
        systemPrompt: SYSTEM_PROMPT,
        cwd: process.cwd(),
      },
    });

    for await (const message of conversation) {
      if (message.type === 'result') {
        if (message.subtype === 'success') {
          return message.result;
        }
        const errors = 'errors' in message ? (message as any).errors.join('; ') : message.subtype;
        throw new Error(`Claude SDK error: ${errors}`);
      }
    }

    throw new Error('No result received from Claude Agent SDK');
  } finally {
    clearTimeout(timer);
  }
}

// ─── API Mode ───────────────────────────────────────────────────

async function executeApi(prompt: string, config: ExecutorConfig): Promise<string> {
  if (!config.apiKey) {
    throw new Error('API key required for API mode');
  }

  // Dynamic import to avoid requiring @anthropic-ai/sdk as a core dependency
  const { default: Anthropic } = await import('@anthropic-ai/sdk');

  const client = new Anthropic({ apiKey: config.apiKey });

  const message = await client.messages.create({
    model: config.model || 'claude-sonnet-4-20250514',
    max_tokens: config.maxTokens || 8192,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  // Extract text from response
  const textBlocks = message.content.filter((b: { type: string }) => b.type === 'text');
  return textBlocks.map((b: any) => b.text).join('\n');
}
