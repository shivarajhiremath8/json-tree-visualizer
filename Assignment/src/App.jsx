import React, { useState } from 'react'
import JSONEditor from './components/JSONEditor'
import TreeVisualizer from './components/TreeVisualizer'

export default function App() {
  const [text, setText] = useState('')
  const [json, setJson] = useState(null)
  const [error, setError] = useState('')
  const [theme, setTheme] = useState('light') // 'dark' or 'light'

  const handleVisualize = () => {
    if (!text.trim()) {
      setError('Please enter JSON to visualize')
      setJson(null)
      return
    }
    try {
      const parsed = JSON.parse(text)
      setJson(parsed)
      setError('')
    } catch {
      setError('Invalid JSON')
      setJson(null)
    }
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-[#061021] text-white' : 'bg-white text-slate-900'} min-h-screen p-4`}>
      <div className="flex items-center justify-between mb-3 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold">Json Tree</div>
        </div>
        <div />
      </div>

      <div className="w-full mx-auto h-[88vh] max-w-[1600px] flex gap-6">
        {/* Left: JSON editor ~28% */}
        <div className="w-[28%]">
          <JSONEditor
            value={text}
            setValue={setText}
            onChange={setText}
            onVisualize={handleVisualize}
            error={error}
            setValue={setText}
            theme={theme}
          />
        </div>

        {/* Right: Tree visualizer ~72% */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3 w-full">
            <input
              className={`flex-1 px-3 py-2 rounded text-sm ${theme === 'dark' ? 'bg-[#2d2d2d] border border-gray-600 text-white placeholder:text-gray-400' : 'bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500'}`}
              placeholder="Search by JSON path (not implemented yet)"
              readOnly
            />
            <button
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className={`px-3 py-2 rounded text-sm ${theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            <button
              className={`px-3 py-2 rounded text-sm ${theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => {
                if (json) {
                  const dataStr = JSON.stringify(json, null, 2)
                  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
                  const exportFileDefaultName = 'data.json'
                  const linkElement = document.createElement('a')
                  linkElement.setAttribute('href', dataUri)
                  linkElement.setAttribute('download', exportFileDefaultName)
                  linkElement.click()
                }
              }}
            >
              Download JSON
            </button>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}></div>
          </div>

          <div className="flex-1">
            <TreeVisualizer theme={theme} jsonData={json} />
          </div>
        </div>
      </div>
    </div>
  )
}
