"use client";

import React, { useState, useEffect } from "react";
import { useLayoutContext } from "@/components/Layout/ClientLayout";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "@/components/dashboard/MarkdownEditor";

export default function AddVideoPage() {
  const { isSidebarHidden } = useLayoutContext();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    videoUrl: "",
    command: "",
    codeSnippet: "",
    thumbnailUrl: "",
    content: "",
  });
  
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [configurations, setConfigurations] = useState<{ name: string; commands: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/categories?type=video");
        const data = await res.json();
        if (data.categories) {
          setDbCategories(data.categories);
          if (data.categories.length > 0) {
            setFormData(prev => ({ ...prev, category: data.categories[0].name }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCategories();
  }, []);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tags, configurations }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard/videos");
      } else {
        setError(data.error || "Failed to create video");
      }
    } catch (err: any) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col gap-8 min-h-[calc(100vh-100px)] relative z-10 ${
        isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
      }`}
    >
      <div className="p-gutter max-w-3xl mx-auto space-y-gutter w-full flex-grow flex flex-col">
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <span className="material-symbols-outlined text-primary text-[28px]">video_call</span>
            <div>
              <h2 className="font-headline-md text-xl text-primary leading-none">INITIALIZE NEW VIDEO</h2>
              <p className="font-label-mono text-xs text-outline mt-1 uppercase">Database Entry Creation Form</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-error/10 border border-error/50 text-error font-label-mono text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 flex-grow font-label-mono">
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-primary-container">VIDEO_TITLE *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-on-surface focus:border-primary outline-none transition-colors"
                  placeholder="e.g. Setting up BGP Peering"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-primary-container">CLASSIFICATION_CATEGORY *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-on-surface focus:border-primary outline-none transition-colors appearance-none"
                >
                  {dbCategories.length === 0 ? (
                    <option value="">No categories defined</option>
                  ) : (
                    dbCategories.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Media URLs Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-primary-container">VIDEO_URL *</label>
                <input
                  type="url"
                  required
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-on-surface focus:border-primary outline-none transition-colors"
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-primary-container">THUMBNAIL_IMAGE_URL (Optional)</label>
                <input
                  type="url"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-on-surface focus:border-primary outline-none transition-colors"
                  placeholder="https://example.com/thumb.jpg"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs text-primary-container flex justify-between">
                <span>DESCRIPTION_DATA (Markdown Support) *</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-black/40 border border-white/10 p-3 text-sm text-on-surface focus:border-primary outline-none transition-colors custom-scrollbar"
                placeholder="Enter detailed video specifications..."
              />
            </div>

            {/* Content Rich Editor */}
            <div className="space-y-2">
              <MarkdownEditor
                label="VIDEO_RICH_DETAILS_AND_LAB_STEPS"
                value={formData.content}
                onChange={(val) => setFormData({ ...formData, content: val })}
                placeholder="Enter rich details, step-by-step lab steps, CLI inputs/outputs, or notes..."
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-xs text-primary-container">SYSTEM_TAGS (Press Enter to add)</label>
              <div className="w-full bg-black/40 border border-white/10 p-2 flex flex-wrap gap-2 focus-within:border-primary transition-colors">
                {tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 bg-primary/20 text-primary text-xs px-2 py-1 rounded-sm border border-primary/30">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-white">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="flex-grow bg-transparent border-none outline-none text-sm text-on-surface min-w-[120px]"
                  placeholder={tags.length === 0 ? "e.g. Routing, BGP" : ""}
                />
              </div>
            </div>

            {/* Tech Specs Row */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-primary-container">EXECUTION_COMMAND (Optional)</label>
                <input
                  type="text"
                  value={formData.command}
                  onChange={(e) => setFormData({ ...formData, command: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-on-surface focus:border-primary outline-none transition-colors font-mono text-primary"
                  placeholder="e.g. docker run..."
                />
              </div>
            </div>

            {/* Code Snippet */}
            <div className="space-y-2">
              <label className="text-xs text-primary-container">CORE_ALGORITHM_SNIPPET (Optional)</label>
              <textarea
                rows={4}
                value={formData.codeSnippet}
                onChange={(e) => setFormData({ ...formData, codeSnippet: e.target.value })}
                className="w-full bg-black/40 border border-white/10 p-3 text-sm text-on-surface focus:border-primary outline-none transition-colors font-mono custom-scrollbar"
                placeholder="function init() { ... }"
              />
            </div>

            {/* Device Configurations Section */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-label-caps text-primary leading-none">DEVICE_CONFIGURATIONS</h3>
                  <p className="font-label-mono text-[10px] text-outline mt-1 uppercase">Router, Switch, Firewall configuration sets</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfigurations([...configurations, { name: "", commands: "" }])}
                  className="px-3 py-1.5 border border-primary/30 hover:border-primary text-primary hover:bg-primary/5 transition-all text-[11px] font-label-caps flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span> ADD_DEVICE
                </button>
              </div>

              {configurations.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-white/10 rounded font-label-mono text-[11px] text-outline uppercase">
                  No device configurations defined. Click ADD_DEVICE to initialize a set.
                </div>
              ) : (
                <div className="space-y-4">
                  {configurations.map((config, index) => (
                    <div key={index} className="border border-white/10 p-4 rounded bg-black/20 flex flex-col gap-3 relative">
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <label className="text-[10px] text-primary-container">DEVICE_NAME (e.g. R1, SW1, Firewall) *</label>
                          <input
                            type="text"
                            required
                            value={config.name}
                            onChange={(e) => {
                              const updated = [...configurations];
                              updated[index].name = e.target.value;
                              setConfigurations(updated);
                            }}
                            className="w-full bg-black/40 border border-white/10 p-2 text-xs text-on-surface focus:border-primary outline-none transition-colors"
                            placeholder="e.g. R1"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setConfigurations(configurations.filter((_, i) => i !== index));
                          }}
                          className="mt-5 p-2 hover:bg-error/10 border border-transparent hover:border-error/20 rounded transition-colors text-error flex items-center justify-center shrink-0"
                          title="Remove Device"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-primary-container">CONFIGURATION_COMMANDS *</label>
                        <textarea
                          required
                          rows={4}
                          value={config.commands}
                          onChange={(e) => {
                            const updated = [...configurations];
                            updated[index].commands = e.target.value;
                            setConfigurations(updated);
                          }}
                          className="w-full bg-black/40 border border-white/10 p-2 text-xs text-on-surface focus:border-primary outline-none transition-colors font-mono custom-scrollbar"
                          placeholder="e.g. enable&#10;configure terminal&#10;interface GigabitEthernet0/0&#10;ip address 192.168.1.1 255.255.255.0&#10;no shutdown"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-white/20 text-outline hover:text-white hover:bg-white/5 transition-colors font-label-caps tracking-widest text-sm"
              >
                ABORT
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary-container text-on-primary-container font-label-caps font-bold tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)] disabled:opacity-50"
              >
                {loading ? "PROCESSING..." : "COMMIT_ENTRY"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <DashboardFooter />
    </main>
  );
}
