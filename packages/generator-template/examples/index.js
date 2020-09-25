const { generate } = require('../dist/index')

const template = `
<view v-if="c">
  <header :value="a">hello</header>
  <header>{{count > 0 ? double : hello}}</header>
  <view @click="handler">hello world</view>
  <component />
</view>
<view v-else>haha</view>
`

const tpl = generate(template.trim())

console.log(tpl)