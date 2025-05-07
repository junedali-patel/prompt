import { Outlet } from "react-router-dom";
import {Sidebar} from "@/components/ui/sidebar";

const ChatLayout = () => {
  return (
    <div className="fixed inset-0 flex h-screen w-screen overflow-hidden bg-[#343541]">
      <aside className="w-[260px] shrink-0 bg-[#202123] border-r border-[#4E4F60]/30 h-full overflow-y-auto">
        <Sidebar />
      </aside>
      <main className="flex-1 relative h-full w-full flex flex-col overflow-hidden items-center">
        <div className="flex-1 overflow-y-auto relative w-full">
          <div className="h-full dark:bg-[#343541] bg-white flex flex-col items-center">
            <div className="h-full w-full max-w-[960px] mx-auto px-4 py-4 md:py-6 flex flex-col items-center justify-center">
              <Outlet />
            </div>
          </div>
        </div>
        {/* ChatGPT-style footer */}
        <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent bg-gradient-to-t from-[#343541] via-[#343541] to-transparent pt-2">
          <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl justify-center">
            {/* Add your input component here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatLayout; 