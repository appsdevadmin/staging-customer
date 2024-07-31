import gsap from 'gsap'
import Splitting from 'splitting'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import Animation from '../classes/Animation'

export default class extends Animation {
  constructor({ element }) {
    super({
      element
    })

    this.results = Splitting({ target: element, by: 'lines' })

    this.hasAnimatedIn = false

    // this.onResize();

    if ('IntersectionObserver' in window) {
      this.animateOut()
    }
  }

  textIn() {
    this.results[0].lines.forEach((line, lineIndex) => {
      line.forEach((word, wordIndex) => {
        gsap.from(word, {
          autoAlpha: 0,
          y: 15,
          rotate: 6,
          delay: lineIndex * 0.2 + wordIndex * 0.02 + 0.5
        })
      })
    })
  }

  animateIn() {
    if (this.hasAnimatedIn) {
      return
    }
    super.animateIn()
    this.textIn()

    this.hasAnimatedIn = true
  }
}
