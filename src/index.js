import png from '../static/img/2-6.png'
import '../static/css/font-awesome.css'
import '../static/css/base.css'
import '../static/css/baseless.less'
import _ from 'lodash'
import('./foo')

console.log(_.join(['测试','测试2'], '-'))

const img = document.createElement('img')
img.src = png
document.body.appendChild(img)

const div = document.createElement('div')
const div2 = document.createElement('div')
console.log(div);
div.classList.add('div-style','fa','fa-home')
div2.classList.add('height')
document.body.appendChild(div)
document.body.appendChild(div2)

async function foo() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(123)
        })
    })
}

foo().then(res => {
    console.log(res)
})

