
/*
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker to load PDFs properly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFViewer extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file="sample_resume(1).pdf" // Replace with the path to your PDF file
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

export default PDFViewer;
*/

//It works! & same display as with the obj method
export default function PDFViewer(){
 return (
  <div>
    <iframe src="http://africau.edu/images/default/sample.pdf" width="100%" height="700px" />
  </div>
 );
};

/*
class ImageButton extends React.Component {
  handleClick = () => {
    // Define the action you want to perform when the image button is clicked
    console.log('Button clicked!'); // For example, log a message to the console
    // You can also navigate to a different page, trigger a function, etc.
  };

  render() {
    return (
      <>
      <div className="resume-container">
      <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="500" height="700">
        <p>Alternative text - Link to the <a href="http://africau.edu/images/default/sample.pdf">resume!</a></p>
      </object>
      <button onClick={this.handleClick}> This one! </button>
      </div>
      </>
    );
  }
}

function Page() {
  return (
    <div className="page">
      <div className="content">{props.content}</div>
    </div>
  );
}

export default ImageButton;
*/
