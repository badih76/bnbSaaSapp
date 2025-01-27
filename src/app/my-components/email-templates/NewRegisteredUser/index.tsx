import {
    Body,
    Container,
    Button,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  const baseUrl = process.env.KINDE_SITE_URL
                ? `https://${process.env.KINDE_SITE_URL}`
                : "";
  const businessName = process.env.BUSINESS_NAME
                ? `https://${process.env.BUSINESS_NAME}`
                : "";
  const businessAddress = process.env.BUSINESS_ADDRESS
  ? `https://${process.env.BUSINESS_ADDRESS}`
  : "";              
  // 'https://demo.react.email'
  
  export const NewRegisteredUser = ({ userFirstname}: {
    userFirstname: string
  }) => (
    <Html>
    <Head />
    <Preview>
      The Bed & Breakfast platform for all your home reservations.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/Logo3.png`}
          width="42"
          height="42"
          alt="Compan Logo"
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          {`Welcome to ${businessName}, your preferred B&B platform for 
          all your reservations.`}
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={baseUrl}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best Regards,
          <br />
          {businessName}
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          {businessAddress}
        </Text>
      </Container>
    </Body>
  </Html>
  );
  
  export default NewRegisteredUser;
  
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
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
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
  };