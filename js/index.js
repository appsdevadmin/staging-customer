import LocomotiveScroll from 'locomotive-scroll'
import Component from './classes/Component'
import Paragraph from './animations/Paragraph'
import Odometer from './animations/Odometer'

export default class extends Component {
  constructor(element) {
    super({
      element,
      elements: {
        paragraphs: '[data-paragraph]',
        odometer: '[data-odometer]',
        scrollTo: '[data-go-to]'
      }
    })

    this.initScroll()
    this.createGoto()
    this.createAnimations()
    this.height = this.element.offsetHeight
  }

  initScroll() {
    this.locoScroll = new LocomotiveScroll({
      el: this.element,
      getDirection: true,
      smooth: true
    })

    this.locoScroll.on('scroll', ({ scroll, direction }) => {
      const height = this.element.offsetHeight

      if (this.height !== height) {
        this.height = height
        this.updateScroll()
      }
    })
  }

  createGoto() {
    this.locoScroll.scrollTo(this.elements.scrollTo)
  }

  updateScroll() {
    this.locoScroll.update()
  }

  createAnimations() {
    this.elements.paragraphs &&
      this.elements.paragraphs.forEach((element) => {
        return new Paragraph({ element })
      })
    this.elements.odometer &&
      this.elements.odometer.forEach((element) => {
        return new Odometer({ element })
      })
  }

  destroyScroll() {
    this.locoScroll.destroy()
  }
}
