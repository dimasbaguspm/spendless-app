import { createFileRoute } from '@tanstack/react-router';

import { Button } from '../components';
import { BadgeDemo } from '../components/badge/demo';
import { KbdDemo } from '../components/kbd/demo';
import { useDrawer } from '../providers/drawer';
import { useModal } from '../providers/modal';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const { openDrawer } = useDrawer();
  const { openModal } = useModal();
  return (
    <div className="min-h-screen bg-sand-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-600 mb-4">Spendless App</h1>
          <p className="text-xl text-slate-500 mb-8">Beautiful Color Palette Showcase</p>

          <div className="flex gap-4 justify-center mb-8">
            <Button variant="coral" onClick={() => openDrawer('')} size="lg">
              Open Drawer
            </Button>
            <Button variant="sage" size="lg" onClick={() => openModal('')}>
              Get Started
            </Button>
            <Button variant="mist" size="lg">
              View Semantic Colors
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
            <h3 className="text-lg font-semibold text-slate-600 mb-4">Primary Colors</h3>
            <div className="space-y-3">
              <Button variant="coral" className="w-full">
                Coral
              </Button>
              <Button variant="sage" className="w-full">
                Sage
              </Button>
              <Button variant="mist" className="w-full">
                Mist
              </Button>
              <Button variant="outline" className="w-full">
                Slate
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
            <h3 className="text-lg font-semibold text-slate-600 mb-4">Outline Styles</h3>
            <div className="space-y-3">
              <Button variant="coral-outline" className="w-full">
                Coral Outline
              </Button>
              <Button variant="sage-outline" className="w-full">
                Sage Outline
              </Button>
              <Button variant="mist-outline" className="w-full">
                Mist Outline
              </Button>
              <Button variant="slate-outline" className="w-full">
                Slate Outline
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200">
            <h3 className="text-lg font-semibold text-slate-600 mb-4">Log Level Colors</h3>
            <div className="space-y-3">
              <Button variant="success" className="w-full">
                ✅ Success - Payment Complete
              </Button>
              <Button variant="info" className="w-full">
                ℹ️ Info - Account Updated
              </Button>
              <Button variant="warning" className="w-full">
                ⚠️ Warning - Low Balance
              </Button>
              <Button variant="danger" className="w-full">
                🚨 Danger - Account Locked
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
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200 text-center">
          <h3 className="text-lg font-semibold text-slate-600 mb-4">All Color Swatches</h3>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
            {/* Original palette */}
            <div className="text-center">
              <div className="w-12 h-12 bg-cream-300 rounded-lg border border-slate-200 mx-auto mb-1"></div>
              <p className="text-xs text-slate-600">Cream</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-coral-500 rounded-lg border border-slate-200 mx-auto mb-1"></div>
              <p className="text-xs text-slate-600">Coral</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sage-500 rounded-lg border border-slate-200 mx-auto mb-1"></div>
              <p className="text-xs text-slate-600">Sage</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-600 rounded-lg border border-slate-200 mx-auto mb-1"></div>
              <p className="text-xs text-slate-600">Slate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-mist-500 rounded-lg border border-slate-200 mx-auto mb-1"></div>
              <p className="text-xs text-slate-600">Mist</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-rose-400 rounded-lg border border-slate-200 mx-auto mb-1"></div>
              <p className="text-xs text-slate-600">Rose</p>
            </div>
          </div>

          <div className="border-t border-mist-200 pt-4">
            <h4 className="text-md font-medium text-slate-500 mb-3">Semantic Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-success-500 rounded-lg border border-slate-200 mx-auto mb-1"></div>
                <p className="text-xs text-slate-600">Success</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-info-500 rounded-lg border border-slate-200 mx-auto mb-1"></div>
                <p className="text-xs text-slate-600">Info</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-warning-500 rounded-lg border border-slate-200 mx-auto mb-1"></div>
                <p className="text-xs text-slate-600">Warning</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-danger-500 rounded-lg border border-slate-200 mx-auto mb-1"></div>
                <p className="text-xs text-slate-600">Danger</p>
              </div>
            </div>
          </div>
        </div>

        <BadgeDemo />
        <KbdDemo />

        <div className="bg-white rounded-xl p-6 shadow-lg border border-mist-200 text-center">
          <p className="text-slate-600 text-lg mb-4">Your complete palette with semantic colors! 🎨</p>
          <p className="text-slate-500">Perfect for financial apps with clear log levels and beautiful design.</p>
        </div>
      </div>
    </div>
  );
}
