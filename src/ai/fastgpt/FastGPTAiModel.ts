import { AiClient } from '../core/AiClient.ts';
import { AiMessageListener } from '../core/AiMessageListener.ts';
import { AiModel } from '../core/AiModel.ts';
import { HttpStreamSocketClient, configType } from '../core/client/http/HttpSocketClient.ts';
import { AiGlobalConfig } from '../AiGlobalConfig.ts';
import { Editor } from '@tiptap/core';
import { FastGPTAiModelConfig } from './FastGPTAiModelConfig.ts';

export class FastGPTAiModel extends AiModel {

  constructor(editor: Editor, globalConfig: AiGlobalConfig) {
    super(editor, globalConfig, 'fastgpt');
    this.aiModelConfig = {
      ...globalConfig.models['fastgpt']
    } as FastGPTAiModelConfig;
  }

  createAiClient(config: any, listener: AiMessageListener): AiClient {
    return new HttpStreamSocketClient(config, {
      onStart: listener.onStart,
      onStop: listener.onStop,
      // 星火内容解析 https://www.xfyun.cn/doc/spark/Web.html#_1-%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E
      onMessage: (messageData: any) => {
        // 将文本按换行符分割成数组
        let msgStrArray = messageData.split('\n');
        // 遍历数组，解析每个数据并输出
        msgStrArray.filter(d => d && !d.includes('[DONE]')).forEach(str => {
          const msg = JSON.parse(str.trim().slice(6));

          if (msg.choices != null) {
            listener.onMessage({
              content: msg.choices[0].delta.content,
              index: msg.choices[0].index,
              status: msg.choices.finish_reason === 'stop' ? 2 : 1
            });
          }
        });
      }
    });
  }

  wrapMessage(promptMessage: string) {
    const object = {
      'stream': true,
      'detail': false,
      'messages': []
    };

    object.messages.push(
        { role: 'user', content: promptMessage }
    );

    return JSON.stringify(object);
  }

  createAiClientUrl(): any {
    const aiModelConfig = this.aiModelConfig as FastGPTAiModelConfig;
    const url = aiModelConfig.isCloud ? 'https://api.fastgpt.in/api/v1/chat/completions' : 'http://172.16.26.68:3006/api/v1/chat/completions';
    return {
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ aiModelConfig.apiKey }`
      }
    };
  }


}