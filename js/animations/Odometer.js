import Odometer from 'odometer'
import Animation from '../classes/Animation'
import 'odometer/themes/odometer-theme-default.css'

export default class extends Animation {
  constructor({ element }) {
    super({
      element
    })

    this.onResize()

    if ('IntersectionObserver' in window) {
      this.animateOut()
    }

    this.od = new Odometer({
      el: element,
      value: 0,
      format: 'd'
    })
  }

  animateIn() {
    if (super.hasAnimatedIn) {
      return
    }
    super.animateIn()

    const value = Number(this.element.dataset.odometer)

    this.od.update(value)
    super.hasAnimatedIn = true
  }

  animateOut() {
    if (super.hasAnimatedIn) {
      return
    }

    super.animateOut()
  }

  onResize() {}
}
