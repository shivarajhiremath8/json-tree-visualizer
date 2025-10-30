import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-json'
import 'prismjs/themes/prism.css'
import { useEffect } from 'react'
import Editor from 'react-simple-code-editor'

const sample = `{
  "user": {
    "id": 101,
    "name": "Shivaraj Hiremath",
    "email": "shivaraj@example.com",
    "address": {
      "city": "Bangalore",
      "state": "Karnataka",
      "pincode": 560001
    },
    "skills": ["React", "JavaScript", "Python"]
  },
  "project": {
    "name": "JSON Tree Visualizer",
    "techStack": ["React", "React Flow", "Tailwind"],
    "progress": 85,
    "completed": false
  }
}`

export default function JSONEditor({ value, onChange, onVisualize, error, setValue, theme = 'light' }) {
    useEffect(() => {
        // if no initial value, load sample
        if (!value) {
            setValue(sample)
            onChange(sample)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const outerClass = theme === 'dark' ? 'bg-[#071024] border-white/5 text-slate-200' : 'bg-white border-slate-200 text-slate-900'

    return (
        <div className={`h-full flex flex-col rounded-lg border overflow-hidden ${outerClass}`}>
            <div className={`flex items-center gap-3 px-3 py-2 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                <h2 className="text-sm font-semibold">Input JSON</h2>
                <span className={`ml-auto text-xs ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>Paste JSON here</span>
            </div>

            <div className="flex-1 overflow-hidden">
                <Editor
                    value={value}
                    onValueChange={(val) => {
                        onChange(val)
                    }}
                    highlight={(code) => highlight(code, languages.json)}
                    padding={15}
                    style={{
                        fontFamily: '"Inconsolata", "Monaco", "Consolas", "Courier New", monospace',
                        fontSize: 13,
                        backgroundColor: theme === 'dark' ? '#071024' : '#ffffff',
                        color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                        minHeight: '100%',
                        outline: 'none',
                        border: 'none',
                        resize: 'none'
                    }}
                    className="h-full"
                />
            </div>

            <div className={`px-3 py-2 flex items-center gap-2 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                <button
                    onClick={() => {
                        setValue(sample)
                        onChange(sample)
                    }}
                    className={`text-xs px-3 py-1 rounded ${theme === 'dark' ? 'bg-white/6 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                >
                    Load Sample
                </button>

                <button onClick={onVisualize} className="ml-auto text-xs px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white">
                    Visualize
                </button>

                <div className="text-xs text-rose-500 ml-2">{error}</div>
            </div>
        </div>
    )
}
