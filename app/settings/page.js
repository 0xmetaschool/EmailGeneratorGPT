'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Switch } from '@headlessui/react'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailDefaults: {
      signature: '',
      defaultTone: 'professional',
      defaultType: 'business'
    },
    notifications: {
      emailGenerated: true,
      templateSaved: true,
      weeklyDigest: false
    },
    appearance: {
      theme: 'system',
      compactMode: false
    }
  })

  const saveSettings = () => {
    // Implementation for saving settings
    toast.success('Settings saved successfully')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="border-b px-6 py-4">
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>

          <div className="p-6 space-y-8">
            {/* Email Defaults */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Email Defaults</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Default Signature
                  </label>
                  <textarea
                    value={settings.emailDefaults.signature}
                    onChange={(e) => setSettings({
                      ...settings,
                      emailDefaults: {
                        ...settings.emailDefaults,
                        signature: e.target.value
                      }
                    })}
                    className="w-full p-2 border rounded-md h-24"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Default Tone
                    </label>
                    <select
                      value={settings.emailDefaults.defaultTone}
                      onChange={(e) => setSettings({
                        ...settings,
                        emailDefaults: {
                          ...settings.emailDefaults,
                          defaultTone: e.target.value
                        }
                      })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="casual">Casual</option>
                      <option value="formal">Formal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Default Email Type
                    </label>
                    <select
                      value={settings.emailDefaults.defaultType}
                      onChange={(e) => setSettings({
                        ...settings,
                        emailDefaults: {
                          ...settings.emailDefaults,
                          defaultType: e.target.value
                        }
                      })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="business">Business</option>
                      <option value="sales">Sales</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm">
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </span>
                    <Switch
                      checked={value}
                      onChange={(checked) => setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          [key]: checked
                        }
                      })}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Appearance */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <select
                    value={settings.appearance.theme}
                    onChange={(e) => setSettings({
                      ...settings,
                      appearance: {
                        ...settings.appearance,
                        theme: e.target.value
                      }
                    })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="system">System Default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Compact Mode</span>
                  <Switch
                    checked={settings.appearance.compactMode}
                    onChange={(checked) => setSettings({
                      ...settings,
                      appearance: {
                        ...settings.appearance,
                        compactMode: checked
                      }
                    })}
                  />
                </div>
              </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={saveSettings}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Save Settings
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SettingsPage