import Cocoa

private let timerInterval: TimeInterval = 1

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    @IBOutlet private weak var statusItemMenu: NSMenu!
    
    func applicationDidFinishLaunching(_ aNotification: Notification) {
        initStatusItemMenu()
        setUpTimer()
    }
    
    deinit {
        timer?.invalidate()
    }
    
    // MARK: - Private
    
    private var statusItem: NSStatusItem?
    private var timer: ScheduledWeakTimer?
    
    private func initStatusItemMenu() {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        statusItem?.button?.image = NSImage(named: "Rocket")
        statusItem?.button?.title = date
        statusItem?.button?.imagePosition = .imageLeft
        statusItem?.menu = self.statusItemMenu
    }
    
    private func setUpTimer() {
        timer = ScheduledWeakTimer(timeInterval: timerInterval, repeats: true) {
            [weak self] in
            guard let self = self else { return }
            self.statusItem?.button?.title = self.date
        }
    }
    
    private var date: String {
        let date = Date()
        let dateFormatter = DateFormatter()
        dateFormatter.calendar = Calendar.current
        dateFormatter.dateStyle = .medium
        dateFormatter.timeStyle = .none
        dateFormatter.dateFormat = " YYww"
        dateFormatter.locale = Locale.current
        return dateFormatter.string(from: date)
    }
}
