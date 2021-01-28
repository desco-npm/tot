import vueComponentDom from '@desco/vue-component-dom'
import ExampleCode from '@desco/vue-example-code'
// import ExampleCode from '../../../../../vue-example-code'

export default {
  exampleCode: {
    update: function (_el) {
      _el.querySelectorAll('examplecode').forEach(el => {
        const container = el.parentNode
        const code = JSON.parse(el.getAttribute(':code'))

        container.removeChild(el)

        vueComponentDom(ExampleCode, container, { code, })
      })
    },
  },
}