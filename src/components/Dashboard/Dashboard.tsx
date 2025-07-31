"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Copy,
  Trash2,
  ExternalLink,
  User,
  LinkIcon,
  BarChart3,
  Calendar,
  X,
  Scissors,
  DoorOpen,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { error } from "console";
import { useRouter } from "next/navigation";

interface LinkData {
  id: string;
  long_url: string;
  short_code: string;
  clicks: number;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<LinkData[]>([]);
  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch("/api/links");
      const { links } = await res.json();
      console.log(links);

      setLinks(links);
    };
    fetchLinks();
  }, []);

  const handleAddLink = async () => {
    if (!newUrl.trim()) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("api/splink", {
        method: "POST",
        body: JSON.stringify({ long_url: newUrl }),
        headers: { "Content-Type": "application/json" },
      });

      const resData = await res.json();

      if (!res.ok) throw new Error(resData.error || "Error shortening URL");
      setIsModalOpen(false);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(`https://short.ly/${text}`);
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const totalLinks = links.length;

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error);
      }

      router.push("/login");
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  //    bg-gradient-to-br from-purple-50 via-blue-50 to-green-50

  return (
    <div className="min-h-screen p-4 sm:p-6 mt-6">
      {/* Header */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 items-center justify-center md:justify-between bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-black">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 overflow-hidden rounded-full border-4 border-black flex items-center justify-center">
              <Image src="/pfp.jpg" width={70} height={40} alt="pfp" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">
                Welcome back, John!
              </h1>
              <p className="text-gray-600">Manage your shortened links</p>
            </div>
          </div>
          <div className="flex space-x-2 justify-center md:justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative flex items-center gap-2 bg-green-300 hover:bg-green-400 border-2 border-black px-6 py-3 rounded-xl shadow-[2px_4px_0px_black] hover:shadow-[4px_6px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Link
            </button>
            <button
              onClick={handleLogOut}
              className="group relative flex items-center gap-2 bg-red-300 hover:bg-red-400 border-2 border-black px-3 py-1 rounded-xl shadow-[2px_4px_0px_black] hover:shadow-[4px_6px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 font-semibold"
            >
              <DoorOpen size={30} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-yellow-200 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_black]"
          whileHover={{ scale: 1.02, rotate: 1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black font-medium">Total Links</p>
              <p className="text-3xl font-bold text-black">{totalLinks}</p>
            </div>
            <LinkIcon className="w-8 h-8 text-black" />
          </div>
        </motion.div>

        <motion.div
          className="bg-green-200 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_black]"
          whileHover={{ scale: 1.02, rotate: -1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black font-medium">Total Clicks</p>
              <p className="text-3xl font-bold text-black">{totalClicks}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-black" />
          </div>
        </motion.div>

        <motion.div
          className="bg-blue-200 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_black]"
          whileHover={{ scale: 1.02, rotate: 1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black font-medium">This Month</p>
              <p className="text-3xl font-bold text-black">
                {Math.floor(totalClicks * 0.3)}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-black" />
          </div>
        </motion.div>

        <motion.div
          className="bg-purple-200 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_black]"
          whileHover={{ scale: 1.02, rotate: -1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black font-medium">Avg. Clicks</p>
              <p className="text-3xl font-bold text-black">
                {Math.floor(totalClicks / totalLinks) || 0}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-black" />
          </div>
        </motion.div>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-2xl border-2 border-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
        <div className="p-6 border-b-2 border-black">
          <h2 className="text-2xl font-bold text-black">Your Links</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-black">
              <tr>
                <th className="text-left p-4 font-bold text-black">
                  Original URL
                </th>
                <th className="text-left p-4 font-bold text-black">
                  Short Code
                </th>
                <th className="text-left p-4 font-bold text-black">Clicks</th>
                <th className="text-left p-4 font-bold text-black">Created</th>
                <th className="text-left p-4 font-bold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, index) => (
                <motion.tr
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                      <span className="truncate max-w-xs" title={link.long_url}>
                        {link.long_url}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <code className="bg-yellow-100 px-2 py-1 rounded border border-black font-mono">
                        {link.short_code}
                      </code>
                      <button
                        onClick={() => copyToClipboard(link.short_code)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Copy short link"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 px-3 py-1 rounded-full border border-black font-semibold">
                      {link.clicks}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{link.created_at}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border-2 border-transparent hover:border-red-300"
                      title="Delete link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl border-4 border-black shadow-[0_20px_50px_rgb(0,0,0,0.3)] p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black flex items-center gap-2">
                  <Scissors className="w-6 h-6" />
                  Shorten URL
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-black mb-2">
                    Enter URL to shorten
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com/very-long-url"
                    className="w-full p-4 border-2 border-black rounded-xl shadow-[2px_3px_0px_black] focus:shadow-[3px_4px_0px_black] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200 outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-4 border-2 border-black rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddLink}
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-green-300 hover:bg-green-400 border-2 border-black rounded-xl font-semibold shadow-[2px_4px_0px_black] hover:shadow-[4px_6px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                  >
                    Shorten
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
