import React, { useState } from "react";
import { useDesignStyle } from "../../context/DesignStyleContext";
import { PROJECTS } from "../../data/mockData";
import { Project } from "../../types";
import { 
  Briefcase, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Send, 
  Quote, 
  Tag, 
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";

export const ProjectsView: React.FC = () => {
  const { 
    activeStyle, 
    setQuoteModalOpen, 
    activeProjectModal, 
    setActiveProjectModal 
  } = useDesignStyle();

  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");

  const categories = ["Alle", "Finans & Investering", "E-handel & Retail", "Helse & Biotek", "Energi & Bærekraft"];

  const filteredProjects = selectedCategory === "Alle" 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12 animate-fade-in" id="projects-view">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          Case Studies & Portefølje
        </span>
        <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${activeStyle.textPrimary}`}>
          Prosjekter Som Skaper Målbare Resultater
        </h1>
        <p className={`text-base ${activeStyle.textSecondary} leading-relaxed`}>
          Utforsk hvordan vi har hjulpet ledende norske og nordiske aktører med å fornye sine digitale plattformer og effektivisere driften.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2" id="project-category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`project-filter-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold ${activeStyle.buttonRadius} border transition-all ${
              selectedCategory === cat
                ? "border-indigo-500 bg-indigo-600 text-white shadow-md"
                : `${activeStyle.surfaceBorder} ${activeStyle.textSecondary} hover:${activeStyle.textPrimary}`
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            onClick={() => setActiveProjectModal(project)}
            className={`group cursor-pointer p-6 ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} ${activeStyle.shadowClass} space-y-5 hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-between`}
          >
            <div className="space-y-4">
              
              {/* Image Header */}
              <div className="relative h-56 rounded-xl overflow-hidden bg-slate-200">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full bg-black/70 text-white backdrop-blur-md">
                  {project.category}
                </span>

                <span className="absolute bottom-3 right-3 px-3 py-1 text-[11px] font-semibold rounded-full bg-indigo-600 text-white shadow-md">
                  Stil: {project.styleUsed}
                </span>
              </div>

              {/* Title & Meta */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Kunde: <strong className="text-slate-700 dark:text-slate-300">{project.client}</strong></span>
                  <span>{project.year}</span>
                </div>

                <h3 className={`text-2xl font-bold ${activeStyle.textPrimary} group-hover:text-indigo-500 transition-colors`}>
                  {project.title}
                </h3>

                <p className={`text-xs ${activeStyle.textSecondary} line-clamp-2 leading-relaxed`}>
                  {project.summary}
                </p>
              </div>

              {/* Key Results Badges */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Hovedresultat:
                </span>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{project.results[0]}</span>
                </p>
              </div>

            </div>

            {/* Tech Stack Tags & CTA */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>

              <span className="text-xs font-bold text-indigo-500 flex items-center gap-1 group-hover:underline shrink-0">
                Les Case Study <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto ${activeStyle.cardRadius} ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} shadow-2xl p-6 sm:p-8 space-y-6 relative`}>
            
            <button
              id="close-project-modal-btn"
              onClick={() => setActiveProjectModal(null)}
              className={`absolute top-4 right-4 p-2 ${activeStyle.buttonRadius} hover:bg-black/10 dark:hover:bg-white/10 ${activeStyle.textPrimary}`}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-200">
              <img 
                src={activeProjectModal.imageUrl} 
                alt={activeProjectModal.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-600 text-white">
                  {activeProjectModal.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  {activeProjectModal.title}
                </h2>
                <p className="text-xs text-slate-200">
                  Levert for {activeProjectModal.client} ({activeProjectModal.year}) • Designstil: {activeProjectModal.styleUsed}
                </p>
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider text-rose-500`}>
                  Utfordringen
                </h4>
                <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
                  {activeProjectModal.challenge}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider text-emerald-500`}>
                  Løsningen
                </h4>
                <p className={`text-xs ${activeStyle.textSecondary} leading-relaxed`}>
                  {activeProjectModal.solution}
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Oppnådde Resultater:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-200">
                {activeProjectModal.results.map((res, i) => (
                  <li key={i} className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial Quote if available */}
            {activeProjectModal.testimonial && (
              <div className={`p-4 rounded-xl ${activeStyle.surfaceClass} border ${activeStyle.surfaceBorder} space-y-2`}>
                <Quote className="w-6 h-6 text-indigo-500" />
                <p className={`text-xs italic ${activeStyle.textPrimary}`}>
                  "{activeProjectModal.testimonial.quote}"
                </p>
                <p className="text-[11px] font-bold text-slate-500">
                  — {activeProjectModal.testimonial.author}, {activeProjectModal.testimonial.role}
                </p>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-2">
              <h4 className={`text-xs font-bold uppercase text-slate-400`}>
                Benyttet Teknologistakk:
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProjectModal.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-mono rounded-lg bg-black/5 dark:bg-white/5 font-semibold text-slate-700 dark:text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
              <button
                onClick={() => setActiveProjectModal(null)}
                className={`py-2.5 px-4 text-xs font-semibold ${activeStyle.textSecondary}`}
              >
                Lukk Case Study
              </button>

              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  setQuoteModalOpen(true);
                }}
                className={`py-3 px-6 text-xs font-bold ${activeStyle.buttonRadius} ${activeStyle.accentBg} flex items-center gap-2`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ønsker Du Et Tilsvarende Prosjekt?</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
