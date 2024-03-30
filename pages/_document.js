import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="Questions"></div>
          <div id="Answers"></div>
          <div id="Notification"></div>
          <div id="Loading"></div>
         
          
        </body>
      </Html>
    );
  }
}
export default MyDocument;
