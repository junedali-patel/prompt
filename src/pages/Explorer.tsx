import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Search, BookOpen } from "lucide-react";
import { 
  PromptItem, 
  PromptCategory, 
  promptCategories, 
  samplePrompts, 
  copyToClipboard 
} from '@/utils/promptUtils';
import { AppSidebar } from '@/components/AppSidebar';

const fontCategories = [
  "Serif",
  "Sans-serif",
  "Display",
  "Handwriting",
  "Monospace",
  "Decorative"
];

const Explorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(fontCategories[0]);
  const [filteredPrompts, setFilteredPrompts] = useState<PromptItem[]>([]);
  const { toast } = useToast();

  // Apply filters whenever search or category changes
  useEffect(() => {
    let results = [...samplePrompts];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        prompt => 
          prompt.text.toLowerCase().includes(query) || 
          prompt.suggestions.some(s => s.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(prompt => prompt.category === selectedCategory);
    }
    
    setFilteredPrompts(results);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto animate-fade-in items-center">
      <div className="border-b border-[#4E4F60]/30 backdrop-blur-sm bg-[#343541]/30 sticky top-0 z-10 w-full">
        <div className="flex gap-2 p-2 overflow-x-auto chatgpt-scrollbar justify-center items-center">
          {fontCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-center ${
                selectedCategory === category
                  ? "bg-[#202123] text-[#ECECF1] shadow-lg font-medium"
                  : "bg-[#40414F] text-[#ECECF1]/90 hover:bg-[#202123]/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto chatgpt-scrollbar p-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full place-items-center">
          {/* Font suggestion cards */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-[#4E4F60]/30 bg-[#40414F] 
                         hover:bg-[#202123] transition-all duration-200 
                         cursor-pointer animate-scale w-full max-w-sm"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold mb-3 text-[#ECECF1]">
                  Font Example {i + 1}
                </h3>
                <p className="text-[#ECECF1]/75 mb-4">
                  Sample text preview for this font family
                </p>
                <div className="w-full flex flex-col items-center gap-2">
                  <span className="text-[#ECECF1]/60 text-sm">
                    Style: Regular 400
                  </span>
                  <button className="mt-2 px-4 py-2 rounded-md bg-[#10A37F] hover:bg-[#1A7F64] 
                                   text-[#ECECF1] text-sm font-medium transition-colors
                                   w-full max-w-[200px] flex items-center justify-center gap-2">
                    Try this font
                    <span className="text-[#ECECF1]/80">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
