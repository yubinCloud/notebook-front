import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  title: 'notebook of front-end',
  lang: 'zh-CN',
  description: 'Just playing around',
  theme: 'reco',
  base: '/notebook-front/',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
  ],
  themeConfig: {
    style: '@vuepress-reco/style-default',
    logo: '/images/logo.png',
    author: 'yubin',
    docsRepo: 'https://github.com/yubinCloud/notebook-front',
    docsBranch: 'main',
    docsDir: 'notebook-front',
    lastUpdatedText: '',
    // series 为原 sidebar
    series: {
      '/base/': [
        {
          text: 'HTML',
          children: ['html-base']
        },
        {
          text: 'JavaScript',
          children: ['es6-modeule-and-async']
        },
      ],
      '/docs/library/vue': [
        {
          text: 'Vue',
          children: ['vue-core']
        }
      ]
    },
    navbar: [
      { text: 'notebook', link: 'https://yubincloud.github.io/notebook' },
      { text: '首页', link: '/' },
      {
        text: '前端基础',
        children: [
          { text: 'HTML', link: '/base/html-base' },
          { text: 'JavaScript', link: '/base/es6-modeule-and-async'},
        ],
      },
      {
        text: '库与框架',
        children: [
          { text: 'Vue', link: '/docs/library/vue/vue-core' },
        ]
      },
    ],
    
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  },
  // debug: true,
})
