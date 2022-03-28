const KEYCODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
}

const state = new Map()
// when container or children get focus
const onFocusin = e => {
  const {currentTarget: rover} = e
  if (state.get('last_rover') == rover) return
  if (state.has(rover)) {
    activate(rover, state.get(rover).active)
    state.set('last_rover', rover)
  }
}
const onKeydown = e => {
  const {currentTarget: rover} = e
  switch (e.keyCode) {
    case KEYCODE[isRtl ? 'LEFT' : 'RIGHT']:
    case KEYCODE.DOWN:
      e.preventDefault()
      focusNextItem(rover)
      break
    case KEYCODE[isRtl ? 'RIGHT' : 'LEFT']:
    case KEYCODE.UP:
      e.preventDefault()
      focusPreviousItem(rover)
      break
  }
}
const mo = new MutationObserver((mutationList, observer) =>{
  const stateElementsSet = new Set();
  state.forEach((v,k) =>{
    stateElementsSet.add(k.classList[0])
  } )
  mutationList
    .filter(x => x.removedNodes.length > 0)
    .forEach(mutation => {
      mutation.removedNodes.forEach(removedEl => {
      if (removedEl.nodeType !== 1) return //only elements
        state.forEach((val,key) => {
          if (key ==='last_rover') return;
          if (removedEl.contains(key)) {
            const currentEl = val;
            key.removeEventListener('focusin', onFocusin)
            key.removeEventListener('keydown', onKeydown)
            state.delete(key)
            currentEl.targets.forEach(a => a.tabIndex = '') 
            const keys = [...state.keys()]?.filter(x => x!=='last_rover')           
            if (keys.length === 0) {
              state.clear();
              // console.log('stop observing');
              mo.disconnect()
            }
          }
      })
    })
      
   })
 })         

export const rovingIndex = ({element:rover, target:selector}) => {
  const isRtl = window.getComputedStyle(document.documentElement).direction === 'rtl';
  // this api allows empty or a query string
  const target_query = selector || ':scope *'
  const targets = rover.querySelectorAll(target_query)
  const startingPoint = targets[0]

  // take container out of the focus flow
  rover.tabIndex = -1
  // and all the children
  targets.forEach(a => a.tabIndex = -1)
  // except the first target, that accepts focus
  startingPoint.tabIndex = 0

  // with the roving container as the key
  // save some state and handy references
  state.set(rover, {
    targets,
    active: startingPoint,
    index: 0,
  })

  rover.addEventListener('focusin', onFocusin)

  // watch for arrow keys
  
  rover.addEventListener('keydown', onKeydown)

  //  replace rover.addEventListener('DOMNodeRemovedFromDocument', cleanup)
  // with mutationObserver
  mo.observe(document, {
    childList: true,
    subtree: true
  }) 
}

const focusNextItem = rover => {
  const rx = state.get(rover)

  // increment state index
  rx.index += 1

  // clamp navigation to target bounds
  if (rx.index > rx.targets.length - 1)
    rx.index = rx.targets.length - 1

  // use rover index state to find next
  let next = rx.targets[rx.index]

  // found something, activate it
  next && activate(rover, next)
}

const focusPreviousItem = rover => {
  const rx = state.get(rover)

  // decrement from the state index
  rx.index -= 1

  // clamp to 0 and above only
  if (rx.index < 1)
    rx.index = 0

  // use rover index state to find next
  let prev = rx.targets[rx.index]

  // found something, activate it
  prev && activate(rover, prev)
}

const activate = (rover, item) => {
  const rx = state.get(rover)

  // remove old tab index item
  rx.active.tabIndex = -1

  // set new active item and focus it
  rx.active = item
  rx.active.tabIndex = 0
  rx.active.focus()
}
