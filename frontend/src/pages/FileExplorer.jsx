import React, { useState, useRef, useEffect } from "react";
import {
  Folder, FileText, ChevronRight, ChevronDown, Upload, FolderPlus,
  FileCode, FileVideo, FileAudio, File, Info, Trash2, Edit, Download, Copy
} from "lucide-react";

const FileExplorer = () => {
  // Enhanced state management
  const [contents, setContents] = useState({
    folders: [],
    files: []
  });
  const [currentPath, setCurrentPath] = useState([]); // Track current location
  const [selectedFile, setSelectedFile] = useState(null);
//   const [expandedFolders, setExpandedFolders] = useState({}); // Track expanded state
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    type: null,
    item: null
  });

  const fileInputRef = useRef(null);
  const contextMenuRef = useRef(null);

  /* ---------------- NAVIGATION ---------------- */
  const navigateToFolder = (folder) => {
    setCurrentPath(prev => [...prev, folder]);
    // In a real app, you'd fetch folder contents here
  };

  const goBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const navigateToRoot = () => {
    setCurrentPath([]);
  };

  /* ---------------- CONTEXT MENU ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setContextMenu(prev => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleContextMenu = (e, item, type) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type,
      item
    });
  };

  /* ---------------- ICON HELPER ---------------- */
  const getFileIcon = (type, name) => {
    const iconClass = "w-6 h-6";
    if (type?.startsWith("image/")) return <File className={`${iconClass} text-pink-500`} />;
    if (type?.startsWith("video/")) return <FileVideo className={`${iconClass} text-purple-500`} />;
    if (type?.startsWith("audio/")) return <FileAudio className={`${iconClass} text-amber-500`} />;
    if (/\.(js|py|java|c|cpp|json|html|css)$/i.test(name))
      return <FileCode className={`${iconClass} text-yellow-500`} />;
    if (type === "application/pdf") return <FileText className={`${iconClass} text-red-500`} />;
    return <File className={`${iconClass} text-gray-500`} />;
  };

  /* ---------------- CRUD OPERATIONS ---------------- */
  const handleCreateFolder = () => {
    const name = prompt("Enter folder name");
    if (!name) return;

    const newFolder = {
      _id: Date.now().toString(),
      name,
      parentId: currentPath.length > 0 ? currentPath[currentPath.length - 1]._id : null,
      createdAt: new Date().toISOString()
    };

    setContents(prev => ({
      ...prev,
      folders: [...prev.folders, newFolder]
    }));
  };

  const handleDeleteItem = (item, type) => {
    if (!window.confirm(`Are you sure you want to delete ${item.name}?`)) return;
    
    if (type === "folder") {
      setContents(prev => ({
        ...prev,
        folders: prev.folders.filter(f => f._id !== item._id)
      }));
    } else {
      setContents(prev => ({
        ...prev,
        files: prev.files.filter(f => f._id !== item._id)
      }));
      if (selectedFile?._id === item._id) {
        setSelectedFile(null);
      }
    }
  };

  const handleRenameItem = (item, type) => {
    const newName = prompt("Enter new name", item.name);
    if (!newName || newName === item.name) return;

    if (type === "folder") {
      setContents(prev => ({
        ...prev,
        folders: prev.folders.map(f => 
          f._id === item._id ? { ...f, name: newName } : f
        )
      }));
    } else {
      setContents(prev => ({
        ...prev,
        files: prev.files.map(f => 
          f._id === item._id ? { ...f, name: newName } : f
        )
      }));
      if (selectedFile?._id === item._id) {
        setSelectedFile(prev => ({ ...prev, name: newName }));
      }
    }
  };

  const handleDownloadFile = (file) => {
    const url = URL.createObjectURL(file.fileObject);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /* ---------------- ENHANCED PREVIEW ---------------- */
  const renderPreview = () => {
    if (!selectedFile) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
          <Info size={60} className="mb-4 opacity-50" />
          <p className="text-sm text-gray-500 text-center">Select a file to preview its contents</p>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        <div className="mb-4 pb-4 border-b">
          <h4 className="font-semibold text-lg truncate">{selectedFile.name}</h4>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>{selectedFile.size}</span>
            <span>{selectedFile.type || "Unknown type"}</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {selectedFile.readOnly && selectedFile.content ? (
            <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm overflow-auto h-full">
              {selectedFile.content}
            </pre>
          ) : selectedFile.type?.startsWith("image/") ? (
            <div className="h-full flex items-center justify-center">
              <img 
                src={URL.createObjectURL(selectedFile.fileObject)} 
                className="max-h-full max-w-full rounded-lg object-contain"
                alt={selectedFile.name}
              />
            </div>
          ) : selectedFile.type?.startsWith("video/") ? (
            <video 
              src={URL.createObjectURL(selectedFile.fileObject)} 
              controls 
              className="w-full h-auto rounded-lg"
            />
          ) : selectedFile.type?.startsWith("audio/") ? (
            <div className="flex items-center justify-center h-full">
              <audio 
                src={URL.createObjectURL(selectedFile.fileObject)} 
                controls 
                className="w-full"
              />
            </div>
          ) : selectedFile.type === "application/pdf" ? (
            <div className="h-full flex flex-col items-center justify-center p-4">
              <FileText size={80} className="text-red-500 mb-4" />
              <p className="text-gray-600 text-sm">PDF preview not available</p>
              <button 
                onClick={() => handleDownloadFile(selectedFile)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                Download PDF
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4">
              <File size={80} className="text-gray-400 mb-4" />
              <p className="text-gray-600 text-sm">Preview not available</p>
              <p className="text-gray-400 text-xs mt-2">Download to view the file</p>
            </div>
          )}
        </div>

        {/* Preview Actions */}
        <div className="mt-4 pt-4 border-t flex gap-2">
          <button
            onClick={() => handleDownloadFile(selectedFile)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            <Download size={14} /> Download
          </button>
          <button
            onClick={() => handleRenameItem(selectedFile, "file")}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
          >
            <Edit size={14} /> Rename
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[750px] bg-white border rounded-xl shadow-xl overflow-hidden">
      {/* MAIN SECTION */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-16 border-b flex items-center justify-between px-6 bg-gray-50">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-lg">File Explorer</h2>
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center text-sm">
              <button
                onClick={navigateToRoot}
                className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-gray-200"
              >
                Root
              </button>
              {currentPath.map((folder, index) => (
                <div key={folder._id} className="flex items-center">
                  <ChevronRight size={16} className="text-gray-400 mx-1" />
                  <button
                    onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                    className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-gray-200 truncate max-w-[100px]"
                    title={folder.name}
                  >
                    {folder.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {currentPath.length > 0 && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
              >
                ← Back
              </button>
            )}
            <button
              onClick={handleCreateFolder}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <FolderPlus size={16} /> New Folder
            </button>
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Upload size={16} /> Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Folders Section */}
          {contents.folders.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-gray-700">Folders</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {contents.folders
                  .filter(folder => 
                    currentPath.length === 0 || 
                    folder.parentId === currentPath[currentPath.length - 1]?._id
                  )
                  .map(folder => (
                    <div
                      key={folder._id}
                      onContextMenu={(e) => handleContextMenu(e, folder, "folder")}
                      onClick={() => navigateToFolder(folder)}
                      className="group relative flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-md"
                    >
                      <div className="relative">
                        <Folder size={48} className="text-yellow-500" />
                        <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-10 rounded-full transition-opacity" />
                      </div>
                      <span className="text-sm mt-2 font-medium truncate w-full text-center" title={folder.name}>
                        {folder.name}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-1">
                        Created: {new Date(folder.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Files Section */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-700">Files</h3>
            {contents.files.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">No files uploaded yet</p>
                <p className="text-gray-400 text-sm mb-4">Upload files or create folders to get started</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Upload your first file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {contents.files.map(file => (
                  <div
                    key={file._id}
                    onContextMenu={(e) => handleContextMenu(e, file, "file")}
                    onClick={() => setSelectedFile(file)}
                    className={`group flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedFile?._id === file._id
                        ? "bg-blue-50 border border-blue-400 shadow-sm"
                        : "hover:bg-gray-50 hover:shadow-sm"
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center mr-3">
                      {getFileIcon(file.type, file.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" title={file.name}>
                        {file.name}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.type || "Unknown"}</span>
                      </div>
                    </div>
                    {file.readOnly && (
                      <span className="text-[10px] px-2 py-1 bg-gray-200 rounded-full mr-3">
                        READ-ONLY
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadFile(file);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-200 rounded-lg transition-opacity"
                      title="Download"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-8 border-t px-6 flex items-center justify-between text-xs text-gray-500 bg-gray-50">
          <span>{contents.files.length} file(s), {contents.folders.length} folder(s)</span>
          <span>Total: {contents.files.reduce((acc, file) => acc + parseFloat(file.size), 0).toFixed(1)} KB</span>
        </div>
      </div>

      {/* PREVIEW PANEL */}
      <div className="w-96 border-l p-6 bg-gray-50 flex flex-col">
        <h3 className="font-bold mb-4 text-gray-800">Preview</h3>
        <div className="flex-1 bg-white border rounded-lg p-4 overflow-hidden">
          {renderPreview()}
        </div>
      </div>

      {/* CONTEXT MENU */}
      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          className="fixed z-50 bg-white border rounded-lg shadow-xl py-2 min-w-[180px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          {contextMenu.type === "folder" && (
            <>
              <button
                onClick={() => {
                  navigateToFolder(contextMenu.item);
                  setContextMenu({ ...contextMenu, visible: false });
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <ChevronRight size={14} /> Open
              </button>
              <button
                onClick={() => {
                  handleRenameItem(contextMenu.item, "folder");
                  setContextMenu({ ...contextMenu, visible: false });
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <Edit size={14} /> Rename
              </button>
            </>
          )}
          {contextMenu.type === "file" && (
            <button
              onClick={() => {
                handleDownloadFile(contextMenu.item);
                setContextMenu({ ...contextMenu, visible: false });
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <Download size={14} /> Download
            </button>
          )}
          <hr className="my-1" />
          <button
            onClick={() => {
              handleDeleteItem(contextMenu.item, contextMenu.type);
              setContextMenu({ ...contextMenu, visible: false });
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
