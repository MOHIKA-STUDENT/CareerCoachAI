// RoadmapPDFExport.jsx
import html2pdf from 'html2pdf.js';

const downloadRoadmapPDF = (elementRef, filename = 'Career_Roadmap.pdf') => {
  if (!elementRef || !elementRef.current) return;

  const roadmapEl = elementRef.current;
  roadmapEl.classList.add('no-animation');

  const opt = {
    margin: 0.5,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  html2pdf()
    .set(opt)
    .from(roadmapEl)
    .save()
    .then(() => roadmapEl.classList.remove('no-animation'))
    .catch(() => {
      roadmapEl.classList.remove('no-animation');
      console.error('PDF download failed');
    });
};

export default downloadRoadmapPDF;
