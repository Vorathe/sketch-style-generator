import userDefaults from './user-defaults.js'

export default function(context) {
    let repo_url = userDefaults.getPreference('repourl')

    var alert = COSAlertWindow.new()
    alert.setMessageText('Configure')
    alert.addTextLabelWithValue('URL')
    alert.addTextFieldWithValue(repo_url)
    alert.addButtonWithTitle('Save')
    alert.addButtonWithTitle('Cancel')
    alert.runModal()

    userDefaults.savePreference(alert.viewAtIndex(1).stringValue(), 'repourl')
}