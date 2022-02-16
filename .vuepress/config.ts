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
      '/docs/base/': [
        {
          text: 'HTML',
          children: ['HTML 基础.html']
        }
      ]
    },
    navbar: [
      { text: 'notebook', link: 'https://yubincloud.github.io/notebook' },
      { text: '首页', link: '/' },
      {
        text: '前端基础',
        children: [
          { text: 'HTML', link: '/docs/base/HTML 基础.html' }
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
