import { Button } from './button';

export function SemanticColorsDemo() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-600 mb-4">Semantic Log Level Colors</h1>
        <p className="text-lg text-slate-500 mb-8">Harmonized colors for financial app logging and user feedback</p>
      </div>

      {/* Button Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
          <h3 className="text-lg font-semibold text-slate-600 mb-4 text-center">Solid Variants</h3>
          <div className="space-y-3">
            <Button variant="success" className="w-full">
              ✅ Transaction Complete
            </Button>
            <Button variant="info" className="w-full">
              ℹ️ Account Updated
            </Button>
            <Button variant="warning" className="w-full">
              ⚠️ Budget Alert
            </Button>
            <Button variant="danger" className="w-full">
              🚨 Security Issue
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
          <h3 className="text-lg font-semibold text-slate-600 mb-4 text-center">Outline Variants</h3>
          <div className="space-y-3">
            <Button variant="success-outline" className="w-full">
              Success Action
            </Button>
            <Button variant="info-outline" className="w-full">
              Info Action
            </Button>
            <Button variant="warning-outline" className="w-full">
              Warning Action
            </Button>
            <Button variant="danger-outline" className="w-full">
              Danger Action
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
          <h3 className="text-lg font-semibold text-slate-600 mb-4 text-center">Ghost Variants</h3>
          <div className="space-y-3">
            <Button variant="success-ghost" className="w-full">
              Subtle Success
            </Button>
            <Button variant="info-ghost" className="w-full">
              Subtle Info
            </Button>
            <Button variant="warning-ghost" className="w-full">
              Subtle Warning
            </Button>
            <Button variant="danger-ghost" className="w-full">
              Subtle Danger
            </Button>
          </div>
        </div>
      </div>

      {/* Color Harmony Showcase */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-mist-200">
        <h3 className="text-2xl font-semibold text-slate-600 mb-6 text-center">Color Harmony</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-success-500 rounded-xl border border-slate-200 mx-auto mb-3 shadow-md"></div>
            <h4 className="font-semibold text-success-600 mb-1">Success</h4>
            <p className="text-sm text-slate-500">Harmonizes with Sage</p>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-4 h-4 bg-sage-400 rounded border"></div>
              <div className="w-4 h-4 bg-sage-500 rounded border"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-info-500 rounded-xl border border-slate-200 mx-auto mb-3 shadow-md"></div>
            <h4 className="font-semibold text-info-600 mb-1">Info</h4>
            <p className="text-sm text-slate-500">Harmonizes with Mist</p>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-4 h-4 bg-mist-400 rounded border"></div>
              <div className="w-4 h-4 bg-mist-500 rounded border"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-warning-500 rounded-xl border border-slate-200 mx-auto mb-3 shadow-md"></div>
            <h4 className="font-semibold text-warning-600 mb-1">Warning</h4>
            <p className="text-sm text-slate-500">Harmonizes with Coral</p>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-4 h-4 bg-coral-400 rounded border"></div>
              <div className="w-4 h-4 bg-coral-500 rounded border"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-danger-500 rounded-xl border border-slate-200 mx-auto mb-3 shadow-md"></div>
            <h4 className="font-semibold text-danger-600 mb-1">Danger</h4>
            <p className="text-sm text-slate-500">Harmonizes with Coral</p>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-4 h-4 bg-coral-500 rounded border"></div>
              <div className="w-4 h-4 bg-coral-300 rounded border"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial App Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-success-50 to-sage-50 rounded-xl p-6 border border-success-200">
          <h4 className="font-bold text-success-700 mb-4 flex items-center">✅ Success Use Cases</h4>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-success-500 font-bold">•</span>
              Payment processed successfully
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-500 font-bold">•</span>
              Savings goal achieved
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-500 font-bold">•</span>
              Account verification complete
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-500 font-bold">•</span>
              Investment profit notification
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-info-50 to-mist-50 rounded-xl p-6 border border-info-200">
          <h4 className="font-bold text-info-700 mb-4 flex items-center">ℹ️ Info Use Cases</h4>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-info-500 font-bold">•</span>
              System maintenance notice
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info-500 font-bold">•</span>
              New feature announcement
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info-500 font-bold">•</span>
              Account settings updated
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info-500 font-bold">•</span>
              Monthly statement ready
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-warning-50 to-cream-50 rounded-xl p-6 border border-warning-200">
          <h4 className="font-bold text-warning-700 mb-4 flex items-center">⚠️ Warning Use Cases</h4>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-warning-500 font-bold">•</span>
              Low account balance alert
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning-500 font-bold">•</span>
              Budget limit approaching
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning-500 font-bold">•</span>
              Unusual spending pattern
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning-500 font-bold">•</span>
              Subscription renewal due
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-danger-50 to-coral-50 rounded-xl p-6 border border-danger-200">
          <h4 className="font-bold text-danger-700 mb-4 flex items-center">🚨 Danger Use Cases</h4>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-danger-500 font-bold">•</span>
              Transaction failed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger-500 font-bold">•</span>
              Account security breach
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger-500 font-bold">•</span>
              Unauthorized access attempt
            </li>
            <li className="flex items-start gap-2">
              <span className="text-danger-500 font-bold">•</span>
              Payment method declined
            </li>
          </ul>
        </div>
      </div>

      {/* Color Palette Summary */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-mist-200 text-center">
        <h3 className="text-2xl font-semibold text-slate-600 mb-4">Complete Color System</h3>
        <p className="text-slate-500 mb-6 max-w-3xl mx-auto">
          Your financial app now has a comprehensive color system with semantic log levels that maintain visual harmony
          with your existing palette. Each semantic color includes 50-900 shade variations for maximum flexibility.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm">20 Success Shades</span>
          <span className="px-3 py-1 bg-info-100 text-info-700 rounded-full text-sm">20 Info Shades</span>
          <span className="px-3 py-1 bg-warning-100 text-warning-700 rounded-full text-sm">20 Warning Shades</span>
          <span className="px-3 py-1 bg-danger-100 text-danger-700 rounded-full text-sm">20 Danger Shades</span>
        </div>
      </div>
    </div>
  );
}
