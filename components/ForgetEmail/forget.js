import React from "react";
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Hr } from "@react-email/hr";

function Forget(props) {
  return (
    <Html>
      <Heading
        as="h2"
        style={{ color: "#333", fontFamily: "Arial, sans-serif" }}
      >
        Hi, {props.senderName}
      </Heading>
      <Text style={{ color: "#555", fontFamily: "Arial, sans-serif" }}>
        We received the reset password request. If it's not you, please ignore
        it.
      </Text>
      <Button
        href={props.url}
        style={{
          background: "#311465",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          display: "inline-block",
          fontSize: "16px",
          margin: "20px 0",
          padding: "10px 20px",
          padding: "15px 20px",
        }}
      >
        Click Me
      </Button>
      <Hr style={{ margin: "20px 0" }} />
      <table>
        <tbody>
          <tr>
            <td style={{ padding: "16px 0 16px" }}>
              <span
                style={{
                  display: "block",
                  width: "117px",
                  borderBottom: "1px solid #8b949f",
                }}
              ></span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontSize: "14px",
                lineHeight: "170%",
                fontWeight: 400,
                color: "#000000",
                letterSpacing: "0.01em",
              }}
            >
              Best regards, <br />
              <strong>LostNest UETTaxila</strong>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontFamily: "Oxanium, sans-serif",
                fontSize: "12px",
                fontWeight: "normal",
                margin: "0",
                marginTop: "16px",
                marginBottom: "16px",
                textAlign: "justify",
              }}
            >
              Thank you for being a valued member of our Lost Nest community.
              Your commitment to kindness and sincerity helps make our platform
              a safe and supportive space for all.
            </td>
          </tr>
        </tbody>
      </table>

      <div
        className="footer"
        style={{
          clear: "both",
          paddingTop: "24px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <table
          role="presentation"
          border="0"
          cellPadding="0"
          cellSpacing="0"
          style={{
            borderCollapse: "separate",
            msoTableLspace: "0pt",
            msoTableRspace: "0pt",
            width: "100%",
          }}
          width="100%"
        >
          <tr>
            <td
              className="content-block"
              style={{
                fontFamily: "Oxanium, sans-serif",
                verticalAlign: "top",
                color: "#9a9ea6",
                fontSize: "16px",
                textAlign: "center",
              }}
              valign="top"
              align="center"
            >
              <span
                className="apple-link"
                style={{
                  color: "#9a9ea6",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                University of Engineering and Technology, Taxila
              </span>
              <br />
              Don't like these emails?&nbsp;
              <a href="__unsubscribe_url__">unsubscribe</a>.
            </td>
          </tr>
          <tr>
            <td
              className="content-block powered-by"
              style={{
                fontFamily: "Oxanium, sans-serif",
                verticalAlign: "top",
                color: "#9a9ea6",
                fontSize: "16px",
                textAlign: "center",
              }}
              valign="top"
              align="center"
            >
              Powered by &nbsp;
              <a
                href="https://www.lostnest.xyz/"
                style={{
                  color: "#311465",
                  fontSize: "16px",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                LostNest
              </a>
            </td>
          </tr>
        </table>
      </div>
    </Html>
  );
}

export default Forget;
