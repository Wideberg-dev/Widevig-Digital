import React from "react";
import { DesignStyleProvider, useDesignStyle } from "./context/DesignStyleContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { QuoteModal } from "./components/QuoteModal";
import { HomeView } from "./components/views/HomeView";
import { DesignStudioView } from "./components/views/DesignStudioView";
import { AboutView } from "./components/views/AboutView";
import { ContactView } from "./components/views/ContactView";

const MainContent: React.FC = () => {
  const { activeStyle, currentSubPage } = useDesignStyle();

  const renderSubPage = () => {
    switch (currentSubPage) {
      case "home":
        return <HomeView />;
      case "about":
        return <AboutView />;
      case "contact":
        return <ContactView />;
      case "design-showcase":
        return <DesignStudioView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${activeStyle.bgClass} ${activeStyle.fontFamily}`}>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {renderSubPage()}
      </main>

      <Footer />
      <QuoteModal />
    </div>
  );
};

export default function App() {
  return (
    <DesignStyleProvider>
      <MainContent />
    </DesignStyleProvider>
  );
}
