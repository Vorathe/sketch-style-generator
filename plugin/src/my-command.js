// export default function(context) {
//   context.document.showMessage("Hello World")
// }

export default function (context) {
  const selectedLayers = context.selection
  const selectedCount = selectedLayers.length

  if (selectedCount === 0) {
    context.document.showMessage('No layers are selected.')
  } else {
    context.document.showMessage(`${selectedCount} layers selected.`)
  }
}

// module.exports = function (config, isPluginCommand) {
//     console.log('hello world')
// }