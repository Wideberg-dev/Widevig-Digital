import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DesignStyle, StyleId, SubPage, Project } from "../types";
import { DESIGN_STYLES } from "../data/mockData";

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

export const DesignStyleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeStyle, setActiveStyle] = useState<DesignStyle>(DESIGN_STYLES[0]);
  const [currentSubPage, setCurrentSubPage] = useState<SubPage>("home");
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const setStyleById = (id: StyleId) => {
    const found = DESIGN_STYLES.find((s) => s.id === id);
    if (found) {
      setActiveStyle(found);
      localStorage.setItem("ev_active_style", id);
    }
  };

  useEffect(() => {
    if (currentSubPage === "design-showcase") {
      const saved = localStorage.getItem("ev_active_style") as StyleId | null;
      if (saved) {
        const found = DESIGN_STYLES.find((s) => s.id === saved);
        if (found) {
          setActiveStyle(found);
        }
      }
    } else {
      setActiveStyle(DESIGN_STYLES[0]);
    }
  }, [currentSubPage]);

  const handleSetSubPage = (page: SubPage) => {
    setCurrentSubPage(page);
    if (page !== "design-showcase") {
      const defaultStyle = DESIGN_STYLES[0]; // Nordisk Minimalisme
      setActiveStyle(defaultStyle);
      localStorage.setItem("ev_active_style", defaultStyle.id);
    }
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
