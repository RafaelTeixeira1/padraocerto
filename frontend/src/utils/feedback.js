export const showFeedback = ({ type = 'success', title, message }) => {
  window.dispatchEvent(new CustomEvent('padraocerto:feedback', {
    detail: { type, title, message }
  }))
}
