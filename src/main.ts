import { AiEditor } from "./core/AiEditor.ts";
// import { config } from "./xinghuo.ts";
// import { wenxinConfig } from "./wenxin.ts";
// wenxinConfig导出 { access_token: "****", }
// @ts-ignore
window.aiEditor = new AiEditor({
    element: "#aiEditor",
    placeholder: "点击输入内容1...",
    contentRetention: true,
    // editable:false,
    content: '<p> <strong>提示：</strong> <br/>1、输入 空格 + "/" 可以快速弹出 AI 菜单 <br/> 2、输入 空格 + "@" 可以提及某人</p> ',
    // onSave:()=>{
    //     alert("保存")
    //     return true;
    // },
    ai: {
        models: {
            // spark: {
            //     appId: '5cc23964',
            //     apiKey: '1669b3cc70ca7798cc4c62631b241ea8',
            //     apiSecret: 'ZDk5ZmUyMzZiYTcxZjg5NWQ5MzNlNTI4',
            //     version: 'v3.5'
            // },
            // wenxin: {
            //     ...wenxinConfig
            // },
            fastgpt: {
              apiKey: 'fastgpt-uFEa23fYXxTPFR6Ncof2JyU6kkU1ZfVXkJ9OgIS0idImhFaWJ50jATFu',
            }
        },
        bubblePanelEnable:true,
        bubblePanelModel: "fastgpt",
        onTokenConsume: (modelName, _modelConfig, count) => {
            console.log(modelName, " token count:" + count)
        }

    },
    i18n: {
        zh: {
            "undo": "撤销(可自定义国际化内容...)",
            "redo": "重做(可自定义国际化内容!)",
        }
    },
    onMentionQuery: (query) => {
        return [
            'Michael Yang', 'Jean Zhou', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder'
            , 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John'
            , 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey'
            , 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
        ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
    }
})
