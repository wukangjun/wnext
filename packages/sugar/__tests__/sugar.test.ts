'use strict';

import { createApp } from '../src'

describe('sugar', () => {
    it('测试template', () => {
        createApp({
            template: `
                <div id="app" @click="handler">
                    <h2>{{msg}}</h2>
                </div>
            `,
            setup() {}
        })
    })
});
