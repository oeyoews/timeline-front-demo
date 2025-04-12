// 定义事件类型和对应的颜色
const eventColors = {
    'js-standard': '#FF4D4D',     // JavaScript/ECMAScript标准
    'html-standard': '#4169E1',   // HTML标准
    'css-standard': '#32CD32',    // CSS标准
    'other-standard': '#FFD700',  // 其他Web标准
    'ui-framework': '#FF69B4',    // UI框架
    'state-framework': '#9400D3', // 状态管理框架
    'build-tool': '#FF8C00',      // 构建工具
    'dev-tool': '#00CED1',        // 开发工具
    'browser': '#8B4513',         // 浏览器
    'runtime': '#4B0082',         // 运行时
    'web-standard': '#2F4F4F'     // Web基础标准
};

// 定义基本事件数据
const eventData = [
    {
        id: 1,
        title: '万维网诞生',
        link: 'https://info.cern.ch/hypertext/WWW/TheProject.html',
        description: 'Tim Berners-Lee发明了万维网，创建了第一个网页',
        date: '1991-03-12',
        type: 'web-standard'
    },
    {
        id: 2,
        title: 'JavaScript诞生',
        link: 'https://web.archive.org/web/20070916144913/http://wp.netscape.com/newsref/pr/newsrelease67.html',
        description: 'Brendan Eich在网景公司创造了JavaScript',
        date: '1995-05-23',
        type: 'js-standard'
    },
    {
        id: 3,
        title: 'CSS2规范发布',
        link: 'https://www.w3.org/TR/CSS2/',
        description: 'W3C发布CSS Level 2规范，增强了样式能力',
        date: '1998-05-12',
        type: 'css-standard'
    },
    {
        id: 4,
        title: 'AJAX技术兴起',
        link: 'https://web.archive.org/web/20110102130249/http://adaptivepath.com/ideas/essays/archives/000385.php',
        description: 'Jesse James Garrett提出AJAX概念，改变了Web交互方式',
        date: '2005-02-18',
        type: 'js-standard'
    },
    {
        id: 5,
        title: 'jQuery发布',
        link: 'https://blog.jquery.com/2006/08/26/jquery-1-0/',
        description: 'jQuery简化了JavaScript编程，统一了浏览器差异',
        date: '2006-08-26',
        type: 'ui-framework'
    },
    {
        id: 6,
        title: 'Chrome发布',
        link: 'https://blog.chromium.org/2008/09/welcome-to-chromium_02.html',
        description: 'Google发布Chrome浏览器及V8引擎，大幅提升JavaScript性能',
        date: '2008-09-02',
        type: 'browser'
    },
    {
        id: 7,
        title: 'Node.js发布',
        link: 'https://github.com/nodejs/node-v0.x-archive/commit/19478ed4b14263c489e872156ca55ff16a07ebe0',
        description: 'Ryan Dahl创建了Node.js，JavaScript进入服务器端',
        date: '2009-05-27',
        type: 'runtime'
    },
    {
        id: 8,
        title: 'HTML5规范确立',
        link: 'https://www.w3.org/TR/html5/',
        description: 'W3C正式推荐HTML5标准，带来革命性的Web功能',
        date: '2010-10-28',
        type: 'html-standard'
    },
    {
        id: 9,
        title: 'CSS3模块化',
        link: 'https://www.w3.org/Style/CSS/',
        description: 'CSS3采用模块化方式发展，引入了大量新特性',
        date: '2011-06-07',
        type: 'css-standard'
    },
    {
        id: 10,
        title: 'React发布',
        link: 'https://reactjs.org/blog/2013/06/05/why-react.html',
        description: 'Facebook发布React，开创了组件化开发新纪元',
        date: '2013-05-29',
        type: 'ui-framework'
    },
    {
        id: 11,
        title: 'Vue.js发布',
        link: 'https://blog.vuejs.org/posts/vue-1-0',
        description: '尤雨溪发布Vue.js，提供了渐进式JavaScript框架',
        date: '2014-02-24',
        type: 'ui-framework'
    },
    {
        id: 12,
        title: 'ES6标准发布',
        link: 'https://www.ecma-international.org/ecma-262/6.0/',
        description: 'ECMAScript 2015(ES6)发布，带来重大语言特性更新',
        date: '2015-06-17',
        type: 'js-standard'
    },
    {
        id: 13,
        title: 'WebAssembly发布',
        link: 'https://webassembly.org/',
        description: 'WebAssembly成为W3C标准，使Web性能达到新高度',
        date: '2019-12-05',
        type: 'other-standard'
    },
    {
        id: 14,
        title: 'Vite发布',
        link: 'https://vitejs.dev/blog/announcing-vite.html',
        description: '尤雨溪发布Vite构建工具，开创新一代前端工具链',
        date: '2020-04-21',
        type: 'build-tool'
    },
    {
        id: 15,
        title: 'TypeScript 1.0发布',
        link: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/',
        description: 'Microsoft发布TypeScript 1.0，为JavaScript添加类型系统',
        date: '2014-04-02',
        type: 'js-standard'
    },
    {
        id: 16,
        title: 'Angular发布',
        link: 'https://blog.angular.io/angular-2-0-0-released-64451a325b13',
        description: 'Google发布Angular框架，引入依赖注入等企业级特性',
        date: '2016-09-14',
        type: 'ui-framework'
    },
    {
        id: 17,
        title: 'PWA概念提出',
        link: 'https://developers.google.com/web/progressive-web-apps',
        description: 'Google提出Progressive Web Apps概念，推动Web应用原生化',
        date: '2015-11-20',
        type: 'web-standard'
    },
    {
        id: 18,
        title: 'Webpack 2发布',
        link: 'https://webpack.js.org/blog/2017-01-17-webpack-2-2/',
        description: 'Webpack发布2.0版本，引入Tree Shaking等优化特性',
        date: '2017-01-18',
        type: 'build-tool'
    },
    {
        id: 19,
        title: 'GraphQL规范发布',
        link: 'https://graphql.org/blog/graphql-a-query-language/',
        description: 'Facebook发布GraphQL规范，改变API查询方式',
        date: '2015-09-14',
        type: 'other-standard'
    },
    {
        id: 20,
        title: 'Deno发布',
        link: 'https://deno.com/blog/v1',
        description: 'Ryan Dahl发布Deno 1.0，重新思考Node.js设计',
        date: '2020-05-13',
        type: 'runtime'
    },
    {
        id: 21,
        title: 'Svelte 3发布',
        link: 'https://svelte.dev/blog/svelte-3-rethinking-reactivity',
        description: 'Rich Harris发布Svelte 3，开创编译时框架新范式',
        date: '2019-04-22',
        type: 'ui-framework'
    },
    {
        id: 22,
        title: 'GitHub Copilot发布',
        link: 'https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/',
        description: 'GitHub发布AI编程助手Copilot，开启AI辅助编程新时代',
        date: '2021-06-29',
        type: 'dev-tool'
    },
    {
        id: 23,
        title: 'Next.js 13发布',
        link: 'https://nextjs.org/blog/next-13',
        description: 'Vercel发布Next.js 13，引入App Router等革命性特性',
        date: '2022-10-25',
        type: 'ui-framework'
    },
    {
        id: 24,
        title: 'Bun 1.0发布',
        link: 'https://bun.sh/blog/bun-v1.0',
        description: 'Jarred Sumner发布Bun 1.0，为JavaScript带来极致性能',
        date: '2023-09-08',
        type: 'runtime'
    }
];

// 构建完整的时间线事件
const timelineEvents = eventData.map(event => ({
    id: event.id,
    content: `<a href="${event.link}" target="_blank">${event.title}</a><br>${event.description}`,
    start: event.date,
    className: event.type
}));

// 导出数据供timeline.html使用
export { eventColors, timelineEvents };