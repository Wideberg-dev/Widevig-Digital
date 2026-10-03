import React, { createContext, useContext, useState, ReactNode } from "react";
import { DesignStyle, StyleId, SubPage, Project } from "../types";
import { DESIGN_STYLES, SIGNATURE_STYLE } from "../data/mockData";

interface DesignStyleContextType {
  activeStyle: DesignStyle;
  setStyleById: (id: StyleId) => void;
  currentSubPage: SubPage;
  setCurrentSubPage: (page: SubPage) => void;
  quoteModalOpen: boolean;
  setQuoteModalOpen: (open: boolean) => void;
  activeProjectModal: Project | null;
  setActiveProjectModal: (project: Project | null) => void;
  allStyles: DesignStyle[];
}

const DesignStyleContext = createContext<DesignStyleContextType | undefined>(undefined);

const loadShowcaseStyle = (): DesignStyle => {
  try {
    const saved = localStorage.getItem("ev_active_style");
    return DESIGN_STYLES.find((s) => s.id === saved) ?? DESIGN_STYLES[0];
  } catch {
    return DESIGN_STYLES[0];
  }
};

export const DesignStyleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showcaseStyle, setShowcaseStyle] = useState<DesignStyle>(loadShowcaseStyle);
  const [currentSubPage, setCurrentSubPage] = useState<SubPage>("home");
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  // The switchable styles only apply inside the Design Showcase; every other page uses the brand style
  const activeStyle = currentSubPage === "design-showcase" ? showcaseStyle : SIGNATURE_STYLE;

  const setStyleById = (id: StyleId) => {
    const found = DESIGN_STYLES.find((s) => s.id === id);
    if (found) {
      setShowcaseStyle(found);
      try {
        localStorage.setItem("ev_active_style", id);
      } catch {
        // Storage can be unavailable (private mode); the in-memory style still applies
      }
    }
  };

  const handleSetSubPage = (page: SubPage) => {
    setCurrentSubPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DesignStyleContext.Provider
      value={{
        activeStyle,
        setStyleById,
        currentSubPage,
        setCurrentSubPage: handleSetSubPage,
        quoteModalOpen,
        setQuoteModalOpen,
        activeProjectModal,
        setActiveProjectModal,
        allStyles: DESIGN_STYLES,
      }}
    >
      {children}
    </DesignStyleContext.Provider>
  );
};

export const useDesignStyle = () => {
  const context = useContext(DesignStyleContext);
  if (!context) {
    throw new Error("useDesignStyle must be used within a DesignStyleProvider");
  }
  return context;
};
