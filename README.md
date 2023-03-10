<div align="center">
   <h2><i>RECTRIS</i></h2>
   <img src="src/assets/rectris.svg" width="15%">
</div>

Play Demo [here](https://rectris.netlify.app)

## The Stack
#### This react.js game was coded using the following stack:
- State management: Valtio
- CSS framework: Tailwind
- Animations: Framer Motion
- Component library: N/A

## Stores/Proxies
The *stores*, actually proxies, in a total of four, were designed such that some properties act as events so the subscribers can handle changes. As a consequence, each store only communicates with each other via event/subscription. The same idea applies to components, i.e., they react to store property changes. And, when some action needs to be done, the component uses the handler passed to it as a prop, similar to mapDispatchToProps in the first versions of Redux.

In short, I tried to follow the mantra that says:
> *Components must be concerned only with displaying stuff*

rather than manipulating store properties.

### How To:
- Modals: used vanilla html dialogs (through useRefs) and a blur backdrop filter for styling
- Dual colors block: SVG linear gradient (hard edged)
- Smoke effect: CSS, generated by SASS from [this site](https://fribly.com/2019/02/06/pure-css-smoke-effect-purple-haze/), with minor css tweaks (delay, mirroring, etc.)

### Resources: 
- Blob modal: configured using https://9elements.github.io/fancy-border-radius
- Neumorphism in panels: https://neumorphism.io/#e0e0e0
- Icons: https://tablericons.com/
- Bg-image: https://similarpng.com/colorful-3d-cubes-flow-png
- Colors: https://www.canva.com/colors/color-palettes
- Level changed effect: https://animista.net/

### Other tweaks:
- Keyboard's repeat delay, see [helper.ts](src/Components/helper.ts)
- Unicode in text form: see [PreGame.tsx](src/Components/Modals/PreGame.tsx)


https://user-images.githubusercontent.com/34761387/211169581-5582ef65-e741-466a-9b70-633680e8fe0c.mp4

