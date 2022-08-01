/** Dispatch event on keydown Escape of node */
export function keydownEscape(node) {
  const handle = (event) => {
    if (event.key === 'Escape') {
      node.dispatchEvent(new CustomEvent('keydown-escape', node))
    }
  }

  document.addEventListener('keydown', handle, true)

  return {
    destroy() {
      document.removeEventListener('keydown', handle, true)
    },
  }
}

/** Dispatch event on keydown Enter of node */
export function keydownEnter(node) {
  const handle = (event) => {
    if (event.key === 'Enter') {
      node.dispatchEvent(new CustomEvent('keydown-enter', node))
    }
  }

  document.addEventListener('keydown', handle, true)

  return {
    destroy() {
      document.removeEventListener('keydown', handle, true)
    },
  }
}

