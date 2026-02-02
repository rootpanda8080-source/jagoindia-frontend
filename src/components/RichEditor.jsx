import { useRef, useEffect } from 'react'

export const RichEditor = ({ value, onChange, className = '' }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && value !== ref.current.innerHTML) {
      ref.current.innerHTML = value || ''
    }
  }, [value])

  const exec = (command, arg = null) => {
    document.execCommand(command, false, arg)
    // bubble change
    onChange(ref.current.innerHTML)
    ref.current.focus()
  }

  const handleLink = () => {
    const url = window.prompt('Enter URL (https://...)')
    if (url) exec('createLink', url)
  }

  return (
    <div className={`rich-editor ${className}`}>
      <div className="mb-2 flex flex-wrap gap-2">
        <button type="button" onClick={() => exec('bold')} className="px-2 py-1 rounded border">B</button>
        <button type="button" onClick={() => exec('italic')} className="px-2 py-1 rounded border">I</button>
        <button type="button" onClick={() => exec('formatBlock','<H1>')} className="px-2 py-1 rounded border">H1</button>
        <button type="button" onClick={() => exec('formatBlock','<H2>')} className="px-2 py-1 rounded border">H2</button>
        <button type="button" onClick={() => exec('insertUnorderedList')} className="px-2 py-1 rounded border">• List</button>
        <button type="button" onClick={() => exec('insertOrderedList')} className="px-2 py-1 rounded border">1. List</button>
        <button type="button" onClick={handleLink} className="px-2 py-1 rounded border">Link</button>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="min-h-[200px] p-4 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-slate-800 prose max-w-none"
      />
    </div>
  )
}

export default RichEditor
