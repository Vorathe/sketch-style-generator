const DEFAULTS_IDENTIFIER = 'com.hellojosh.sketch.generate-styles'

function getPreference (name) {
    var userDefaults = NSUserDefaults.alloc().initWithSuiteName(DEFAULTS_IDENTIFIER)

    return userDefaults.objectForKey(name)
}

function savePreference (value, name) {
    var userDefaults = NSUserDefaults.alloc().initWithSuiteName(DEFAULTS_IDENTIFIER)
    userDefaults.setObject_forKey(value, name)
    userDefaults.synchronize()
}

export default { getPreference, savePreference }