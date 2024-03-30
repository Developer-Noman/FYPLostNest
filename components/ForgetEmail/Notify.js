import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Heading } from "@react-email/heading";

function NotifyEmail(props) {
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };

  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };

  const logo = {
    margin: "0 auto",
  };

  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "justify",
  };

  const btnContainer = {
    textAlign: "center",
  };

  const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
  };

  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };

  const footer = {
    color: "#8898aa",
    fontSize: "12px",
    textAlign: "center",
  };

  const url = "https://www.lostnest.xyz";

  return (
    <Html>
      <Head />
      <Preview>LostNest Lost and Found Hub for University Students</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${url}/images/lost1.png`}
            width="170"
            height="170"
            alt="lostnest"
            style={logo}
          />
          <Heading
            as="h2"
            style={{
              color: "#311465",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              fontSize: "2.5rem",
            }}
          >
            LostNest
          </Heading>

          <Text style={paragraph}>Hi There!</Text>
          <Text style={paragraph}>
            The 🔍<b>{props.enteredType.toLowerCase()} </b> item, named
            <b> '{props.enteredTitle}' </b>, belonging to the category
            <b> '{props.enteredCategory}' </b>, was
            <b> {props.enteredType.toLowerCase()}</b> on 📅
            <b> {props.Date}</b>.<br />
            <br />
            📝 Description: {props.enteredDescription}.
          </Text>
          <Text style={paragraph}>
            If you have any information about the {props.enteredType} item,
            kindly visit the LostNest web application.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href="https://www.lostnest.xyz/">
              Visit LostNest
            </Button>
          </Section>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "20px",
              textAlign: "justify",
            }}
          >
            Thank you for being a valued member of our LostNest community. Your
            commitment to kindness and sincerity helps make our platform a safe
            and supportive space for all.
          </p>
          <Text style={paragraph}>
            Best,
            <br />
            The LostNest team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            LostNest, University of Engineering and Technology Taxila, Pakistan
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default NotifyEmail;
