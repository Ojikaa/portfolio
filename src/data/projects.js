export const projects = [
  {
    id: 'photomaton-magic',
    title: ['Photomaton', 'Magic'],
    description:
      "Photomaton IA événementiel : l'utilisateur dicte un prompt à voix haute et obtient en quelques secondes un avatar stylisé (anime, cartoon…), généré en respectant sa pose et son identité. Architecture microservices : analyse visage/silhouette (DeepFace, MediaPipe), transcription et émotion vocale (Whisper, w2v2), génération SDXL sur serveur GPU dédié.",
    tags: ['React', 'Spring Boot', 'Python', 'Stable Diffusion XL'],
    theme: 'light',
    images: ['/photomaton-magic/photomaton-magic.png'],
  },
  {
    id: 'job-research',
    title: ['Job', 'Research'],
    description:
      "Agrégateur personnel d'offres d'emploi (LinkedIn, Indeed…) : extraction et scoring automatiques depuis les alertes email, dédoublonnage, dashboard de suivi des candidatures et statistiques de taux de réponse. La collecte et la génération des candidatures (lettre, CV, message RH) tournent via des routines Claude Code, sans envoi automatique.",
    tags: ['React · TypeScript', 'FastAPI', 'PostgreSQL'],
    theme: 'accent',
    images: ['/job-research/dashboard.jpeg', '/job-research/stats.jpeg'],
  },
];
