import React, { useRef, useState, useEffect } from 'react';
import { PenTool, RotateCcw, Upload, Check, Image as ImageIcon } from 'lucide-react';

export default function SignaturePad({ title, subtitle, signatureUrl, onSignatureChange, role = 'Candidate' }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [mode, setMode] = useState(signatureUrl ? 'preview' : 'draw'); // 'draw' | 'upload' | 'preview'

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#0f2b59'; // Deep Navy ink
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [mode]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureChange(dataUrl);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onSignatureChange('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file of the signature.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      onSignatureChange(event.target.result);
      setMode('preview');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-100/60 px-2 py-0.5 rounded">
            {role} Verification
          </span>
          <h4 className="text-xs font-bold text-slate-900 uppercase mt-0.5">{title}</h4>
          {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
        </div>

        <div className="flex items-center space-x-1.5 text-xs">
          <button
            type="button"
            onClick={() => setMode('draw')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              mode === 'draw' ? 'bg-blue-900 text-white shadow-xs' : 'bg-white text-slate-600 border hover:bg-slate-100'
            }`}
          >
            Sign on Screen
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              mode === 'upload' ? 'bg-blue-900 text-white shadow-xs' : 'bg-white text-slate-600 border hover:bg-slate-100'
            }`}
          >
            Upload Image
          </button>
          {signatureUrl && (
            <button
              type="button"
              onClick={() => setMode('preview')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                mode === 'preview' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-600 border hover:bg-slate-100'
              }`}
            >
              Saved ✓
            </button>
          )}
        </div>
      </div>

      {mode === 'draw' && (
        <div className="space-y-2">
          <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-white overflow-hidden shadow-inner flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={420}
              height={140}
              className="touch-none cursor-crosshair w-full max-w-[420px] h-[140px]"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            {!hasDrawn && !signatureUrl && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-300 text-xs font-medium">
                <PenTool className="w-4 h-4 mr-1.5 text-slate-300" />
                Draw physical signature with mouse or finger
              </div>
            )}
            <div className="w-11/12 border-b border-slate-200 mb-2"></div>
            <span className="text-[10px] text-slate-400 pb-1 uppercase font-semibold tracking-wider">
              Signature Line • Rajalakshmi Medical College
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-[11px] text-slate-500">Draw clearly within the box.</span>
            <button
              type="button"
              onClick={clearCanvas}
              className="px-2.5 py-1 text-slate-600 hover:text-red-600 text-xs font-medium flex items-center space-x-1 hover:bg-slate-100 rounded"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Signature</span>
            </button>
          </div>
        </div>
      )}

      {mode === 'upload' && (
        <div className="border-2 border-dashed border-slate-300 rounded-xl bg-white p-6 text-center space-y-3">
          <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
          <div>
            <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all">
              <Upload className="w-3.5 h-3.5" />
              <span>Choose Scanned Signature</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-slate-400 mt-2">Supports JPG, PNG, WEBP (Max 2MB)</p>
          </div>
        </div>
      )}

      {mode === 'preview' && signatureUrl && (
        <div className="border border-emerald-200 rounded-xl bg-emerald-50/40 p-4 text-center space-y-2">
          <div className="h-28 flex items-center justify-center bg-white rounded-lg border border-slate-200 max-w-sm mx-auto shadow-xs p-2">
            <img src={signatureUrl} alt="Signature Preview" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex justify-center items-center space-x-3 text-xs">
            <span className="text-emerald-700 font-bold flex items-center">
              <Check className="w-3.5 h-3.5 mr-1" /> Signature Recorded
            </span>
            <button
              type="button"
              onClick={() => setMode('draw')}
              className="text-blue-900 font-bold hover:underline"
            >
              Re-sign / Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
