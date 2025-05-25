import { Button } from '../components';

export function SemanticColorsDemo() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-600 mb-4">Semantic Log Level Colors</h1>
        <p className="text-slate-500">Colors designed to harmonize with your existing palette</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
          <h3 className="text-lg font-semibold text-slate-600 mb-4">Solid Variants</h3>
          <div className="space-y-3">
            <Button variant="success" className="w-full">
              Success - Task Complete
            </Button>
            <Button variant="info" className="w-full">
              Info - System Update
            </Button>
            <Button variant="warning" className="w-full">
              Warning - Check Balance
            </Button>
            <Button variant="danger" className="w-full">
              Danger - Account Locked
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
          <h3 className="text-lg font-semibold text-slate-600 mb-4">Outline Variants</h3>
          <div className="space-y-3">
            <Button variant="success-outline" className="w-full">
              Success Outline
            </Button>
            <Button variant="info-outline" className="w-full">
              Info Outline
            </Button>
            <Button variant="warning-outline" className="w-full">
              Warning Outline
            </Button>
            <Button variant="danger-outline" className="w-full">
              Danger Outline
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
          <h3 className="text-lg font-semibold text-slate-600 mb-4">Ghost Variants</h3>
          <div className="space-y-3">
            <Button variant="success-ghost" className="w-full">
              Success Ghost
            </Button>
            <Button variant="info-ghost" className="w-full">
              Info Ghost
            </Button>
            <Button variant="warning-ghost" className="w-full">
              Warning Ghost
            </Button>
            <Button variant="danger-ghost" className="w-full">
              Danger Ghost
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
          <h3 className="text-lg font-semibold text-slate-600 mb-4">Color Harmony</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-success-500 rounded-lg border border-slate-200 mx-auto mb-2"></div>
              <p className="text-xs text-slate-600 font-medium">Success</p>
              <p className="text-xs text-slate-400">Harmonizes with Sage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-info-500 rounded-lg border border-slate-200 mx-auto mb-2"></div>
              <p className="text-xs text-slate-600 font-medium">Info</p>
              <p className="text-xs text-slate-400">Harmonizes with Mist</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warning-500 rounded-lg border border-slate-200 mx-auto mb-2"></div>
              <p className="text-xs text-slate-600 font-medium">Warning</p>
              <p className="text-xs text-slate-400">Harmonizes with Coral</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-danger-500 rounded-lg border border-slate-200 mx-auto mb-2"></div>
              <p className="text-xs text-slate-600 font-medium">Danger</p>
              <p className="text-xs text-slate-400">Harmonizes with Coral</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-success-50 via-info-50 to-warning-50 rounded-xl p-6 border border-mist-200">
        <h3 className="text-lg font-semibold text-slate-600 mb-3 text-center">Usage Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-success-600 mb-2">✅ Success Messages</h4>
            <ul className="text-slate-600 space-y-1">
              <li>• Transaction completed</li>
              <li>• Account verified</li>
              <li>• Goal achieved</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-info-600 mb-2">ℹ️ Info Messages</h4>
            <ul className="text-slate-600 space-y-1">
              <li>• System updates</li>
              <li>• Account notifications</li>
              <li>• Feature announcements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-warning-600 mb-2">⚠️ Warning Messages</h4>
            <ul className="text-slate-600 space-y-1">
              <li>• Low balance alerts</li>
              <li>• Budget exceeded</li>
              <li>• Unusual activity</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-danger-600 mb-2">🚨 Danger Messages</h4>
            <ul className="text-slate-600 space-y-1">
              <li>• Account compromised</li>
              <li>• Failed transactions</li>
              <li>• Security issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
