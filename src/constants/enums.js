
class OSFeel {
  static MacOs = new OSFeel("MacOs")
  static Windows = new OSFeel("Windows")
  static Ubuntu = new OSFeel("Ubuntu")
  
  constructor(name) {
    this.name = name
  }

  isMacOs() {
    return this.name === OSFeel.MacOs.name
  }

  isWindows() {
    return this.name === OSFeel.Windows.name
  }

  isUbuntu() {
    return this.name === OSFeel.Ubuntu.name
  }

}

class AppTheme {
  static Dark = new AppTheme("Dark")
  static Light = new AppTheme("Light")
  
  constructor(name) {
    this.name = name
  }
  
  isDark() {
    return this.name === AppTheme.Dark.name
  }

  isLight() {
    return this.name === AppTheme.Light.name
  }
  
}

export {OSFeel, AppTheme};