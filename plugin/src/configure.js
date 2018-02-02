import userDefaults from './user-defaults.js'

export default function(context) {
    let repo_url = userDefaults.getPreference('repourl')
    let secret_key = userDefaults.getPreference('secretkey')

    var alert = COSAlertWindow.new()
    alert.setMessageText('Configure')
    alert.addTextLabelWithValue('URL')
    alert.addTextFieldWithValue(repo_url)
    alert.addTextLabelWithValue('Secret Key')
    alert.addTextFieldWithValue(secret_key)
    alert.addButtonWithTitle('Save')
    alert.addButtonWithTitle('Cancel')
    alert.runModal()

    userDefaults.savePreference(alert.viewAtIndex(1).stringValue(), 'repourl')
    userDefaults.savePreference(alert.viewAtIndex(3).stringValue(), 'secretkey')

    log(userDefaults.getPreference('repourl'))
    log(userDefaults.getPreference('secretkey'))
}