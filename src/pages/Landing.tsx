// Remove the Spline import at the top
import { categories } from '../data/categories';
import { trendingPrompts } from '../data/trending';
import OptimizedImage from '../components/ui/OptimizedImage';
import { motion } from 'framer-motion';
import { AnimatedContainer, AnimatedSection } from '../components/ui/AnimatedContainer';
import Navbar from '../components/ui/Navbar';
import SearchBar from '../components/ui/SearchBar';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../services/auth.service';
import { auth } from '../config/firebase';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import heroImage from '../images/computer-program-coding-screen.jpg';
import { AnimatedBox } from '../components/ui/AnimatedBox';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import LandingSearch from '../components/LandingSearch';
import VoiceAssistant from '../components/ui/VoiceAssistant';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { saveSearchHistory } from '../services/search.service';

const features = [
  {
    icon: "🎯",
    title: "AI-Powered Prompt Generation",
    description: "Advanced algorithms create unique, context-aware prompts tailored to your needs",
    link: "/generate"
  },
  {
    icon: "🔄",
    title: "Cross-Platform Integration",
    description: "Seamlessly works with ChatGPT, DALL-E, Midjourney, and other AI platforms",
    link: "/integrations"
  },
  {
    icon: "💡",
    title: "Smart Categories",
    description: "Organized prompts by industry, use-case, and AI model compatibility",
    link: "/categories"
  },
  {
    icon: "🌟",
    title: "Community Curated",
    description: "Access top-rated prompts from our global community of AI enthusiasts",
    link: "/community"
  },
  {
    icon: "🔒",
    title: "Prompt Version Control",
    description: "Track changes and improvements to your prompts over time",
    link: "/dashboard"
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    description: "Measure and optimize your prompt effectiveness with detailed insights",
    link: "/analytics"
  }
];

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/auth');
    } catch (error: any) {
      toast.error('Error signing out');
    }
  };

  const handlePromptGenerated = (prompt: string) => {
    console.log('Generated prompt:', prompt);
  };

  const handleSearch = async (searchQuery: string) => {
    if (user) {
      await saveSearchHistory(user.uid, searchQuery);
    }
    // Continue with existing search logic
  };

  return (    <div className="h-screen w-screen overflow-x-hidden bg-[#1a1b23] relative">
      {/* Remove the centered Spline Scene */}
      
      {/* Existing Content with adjusted z-index */}
      <div className="relative z-10">
        <Navbar />
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Background"
              className="w-full h-full object-cover filter brightness-[0.3] opacity-60"
            />
            <div className="absolute inset-0 bg-[#1a1b23]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b23] via-[#1a1b23]/60 to-transparent" />
          </div>

          {/* Content Layer */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center lg:text-left"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Create Amazing Prompts with
                    <span className="text-[#10A37F]"> AI</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-[#ECECF1] mb-8 max-w-2xl mx-auto lg:mx-0">
                    Generate professional, context-aware prompts for any AI model. Perfect for writers, developers, and creative professionals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    {!user ? (
                      <Link
                        to="/auth"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#10A37F] hover:bg-[#0D8A6C] transition-colors"
                      >
                        Get Started
                      </Link>
                    ) : (
                      <button
                        onClick={handleSignOut}
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#10A37F] hover:bg-[#0D8A6C] transition-colors"
                      >
                        Sign Out
                      </button>
                    )}
                    <Link
                      to="/#features"
                      className="inline-flex items-center justify-center px-8 py-3 border border-[#10A37F] text-base font-medium rounded-md text-[#10A37F] hover:bg-[#10A37F]/10 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                  <div className="mt-12">
                    <SearchBar onSearch={handleSearch} />
                  </div>
                </motion.div>

                {/* Right Content - Spacing */}
                <div className="hidden lg:block" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white"
              >
                Explore Categories
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <AnimatedBox key={category.title} delay={index * 0.2}>
                  <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10
                                hover:border-[#10A37F]/50 transition-all">
                    <span className="text-4xl mb-4 block">{category.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-white/70">{category.desc}</p>
                  </div>
                </AnimatedBox>
              ))}
            </div>
          </div>
        </section>

        {/* Popular by Category */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-6"
            >
              Popular by Category
            </motion.h2>
            {categories.map((category) => (
              <div key={category.id} className="mb-8">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-xl text-white mb-4 flex items-center"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.title}
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.prompts.map((prompt, index) => (
                    <AnimatedBox key={prompt.id} delay={index * 0.1}>
                      <div className="bg-[#202123] rounded-lg p-4 hover:bg-[#343541]/50 
                                   transition-colors cursor-pointer">
                        <h4 className="text-white font-medium mb-2">{prompt.title}</h4>
                        <p className="text-sm text-[#ECECF1]/70 line-clamp-2">{prompt.text}</p>
                      </div>
                    </AnimatedBox>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="py-6 bg-[#202123]/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-6">Recently Added</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add recent prompts */}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trendingPrompts.map((prompt) => (
                <motion.div
                  key={prompt.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#202123] rounded-lg overflow-hidden hover:shadow-lg
                           transition-all duration-300 border border-[#343541]/50"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-[#343541]">
                    {/* Prompt preview or icon */}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2">{prompt.title}</h3>
                    <p className="text-sm text-[#ECECF1]/70 mb-3 line-clamp-2">
                      {prompt.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#10A37F]">{prompt.uses} uses</span>
                      <div className="flex space-x-2">
                        {prompt.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-[#343541]
                                     text-[#ECECF1]/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-[#ECECF1]/80 max-w-2xl mx-auto">
                Discover how our unique features revolutionize the way you interact with AI
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <AnimatedBox key={feature.title} delay={index * 0.1}>
                  <motion.a
                    href={feature.link}
                    className="block p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10
                               hover:border-[#10A37F]/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-4xl mb-6 block">{feature.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-[#ECECF1]/70 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-[#10A37F] font-medium">
                      Learn more
                      <svg 
                        className="w-4 h-4 ml-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </motion.a>
                </AnimatedBox>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <AnimatedButton
                className="bg-[#10A37F] hover:bg-[#0D8E6C] text-white 
                         px-8 py-3 rounded-full text-lg font-medium"
              >
                Start Exploring
              </AnimatedButton>
            </motion.div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add featured collections */}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 bg-[#202123]/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {/* Footer content */}
            </motion.div>
          </div>
        </footer>

        {/* Voice Assistant */}
        <VoiceAssistant onPromptGenerated={handlePromptGenerated} />
      </div>
    </div>
  );
};

export default Landing;