import {AiModelConfig} from "../core/AiModelConfig.ts";

export interface FastGPTAiModelConfig extends AiModelConfig {
    apiKey: string,
    origin: string
}
