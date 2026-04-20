import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import WindowWrapper from "#hoc/WindowWrapper";

import WindowControls from "./WindowControls";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2> Resume.pdf</h2>
        <a
          href="/files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className="icon" />
        </a>
      </div>
      <Document file="/files/resume.pdf">
        <Page pageNumber={1} renderAnnotationLayer renderTextLayer />
      </Document>
    </>
  );
};

const WrappedResume = WindowWrapper(Resume, "resume");

export default WrappedResume;
