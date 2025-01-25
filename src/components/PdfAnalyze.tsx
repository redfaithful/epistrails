import {useEffect, useState} from 'react';
import {PdfHighlighter, Tip, Highlight} from 'react-pdf-highlighter';
import {Dialog, DialogActions, DialogContent, Button} from '@mui/material'; // Assuming you're using Material UI
import {Document, Page} from 'react-pdf'; // Ensure react-pdf is imported for rendering PDFs

const PdfAnalyzer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null); // To store the number of pages

  useEffect(() => {
    console.log("useEffect", pdfFile);
    if (pdfFile) {
      const fileUrl = URL.createObjectURL(pdfFile);
      setPdfUrl(fileUrl); // Set the Blob URL for the PDF
      console.log(fileUrl);
    }
  }, [pdfFile])

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a Blob URL for the selected file
      setPdfFile(file); // Store the file object
      setOpenDialog(false); // Close the file dialog
      console.log("handleFileSelect", file);
    }
  };

  const handleSelectPdfClick = () => {
    setOpenDialog(true); // Open the dialog when the PDF selection button is clicked
  };

  // Callback to handle the loaded document and set numPages
  const onLoadSuccess = ({numPages}) => {
    console.log("PDF loaded, number of pages:", numPages);
    setNumPages(numPages); // Store number of pages after the document is loaded
  };

  return (
    <div>
      {/* Button to trigger file selection */}
      <Button variant="contained" color="primary" onClick={handleSelectPdfClick}>
        {pdfFile ? "Change PDF" : "Analyze PDF"}
      </Button>

      {/* Dialog for file selection */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            style={{width: '100%'}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display the PDF content using react-pdf-highlighter */}
      {/* Display the PDF content using react-pdf-highlighter */}
      {pdfUrl && numPages && (
        <PdfHighlighter
          pdfUrl={pdfUrl}
          highlights={[]} // You can manage highlights here if needed
          onHighlight={(highlight) => console.log(highlight)} // Handle new highlights
        />
      )}

      {/* Render the PDF using react-pdf to show the number of pages */}
      {pdfUrl && (
        <Document
          file={pdfUrl}
          onLoadSuccess={onLoadSuccess} // Set the number of pages when the document is loaded
        >
          {/* Render pages dynamically */}
          {[...Array(numPages)].map((_, index) => (
            <Page key={index} pageNumber={index + 1}/>
          ))}
        </Document>
      )}
    </div>
  );
};

export default PdfAnalyzer;
