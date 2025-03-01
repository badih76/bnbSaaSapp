import { IReceiptEmailParams } from "@/lib/emailsInterfaces";
import {
    Body,
    Container,
    Column,
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
  
    const baseUrl = process.env.BUSINESS_URL ? `https://${process.env.BUSINESS_URL}` : "";
    const businessName = process.env.BUSINESS_NAME ? process.env.BUSINESS_NAME : "";
    const businessAddress = process.env.BUSINESS_ADDRESS ? process.env.BUSINESS_ADDRESS : "";              
    const currentDate = new Date().toLocaleDateString();

  const ReceiptEmail = ({ 
        nightsCount, 
        clientName, 
        rate, 
        totalCharge,
        fromDate, 
        toDate,
        homeTitle,
        homeAddress,
        orderId,
        // cardLast4Digits
    }: IReceiptEmailParams
  ) => (
    <Html>
      <Head />
      <Preview>{`${businessName} Receipt`}</Preview>
  
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row>
              <Column>
                <Img
                    src={`${baseUrl}/Logo3.png`}
                    width="62"
                    // height="62"
                    alt="Compan Logo"
                />
              </Column>
  
              <Column align="right" style={tableCell}>
                <Text style={heading}>Receipt</Text>
              </Column>
            </Row>
          </Section>
          {/* <Section>
            <Text style={cupomText}>
              Save 3% on all your Apple purchases with Apple Card.
              <sup style={supStyle}>1</sup>{" "}
              <Link href="https://www.apple.com/apple-card">
                Apply and use in minutes
              </Link>
              <sup style={supStyle}>2</sup>
            </Text>
          </Section> */}
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Section>
                    <Row>
                        <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>ORDER ID</Text>
                        <Text
                            style={{
                            ...informationTableValue,
                            color: "#15c",
                            textDecoration: "underline",
                            }}
                        >
                            { orderId }
                        </Text>
                        </Column>
                        {/* <Column style={informationTableColumn}>
                            <Text style={informationTableLabel}>DOCUMENT NO.</Text>
                            <Text style={informationTableValue}>186623754793</Text>
                        </Column> */}
                  </Row>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>INVOICE DATE</Text>
                      <Text style={informationTableValue}>{ currentDate }</Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
              <Column style={informationTableColumn} colSpan={2}>
                <Text style={informationTableLabel}>BILLED TO</Text>
                {/* <Text style={informationTableValue}>
                  Card .... { cardLast4Digits }
                </Text> */}
                <Text style={informationTableValue}>{ clientName }</Text>
                {/* <Text style={informationTableValue}>2125 Chestnut St</Text>
                <Text style={informationTableValue}>San Francisco, CA 94123</Text>
                <Text style={informationTableValue}>USA</Text> */}
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
            <Text style={productsTitle}>App Store</Text>
          </Section>
          <Section>
            <Row>
                <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>{`${nightsCount} nights reservation`}</Text>
                    <Text style={informationTableLabel}>{`from ${new Date(fromDate).toLocaleDateString()}`}</Text>
                    <Text style={informationTableLabel}>{`to ${new Date(toDate).toLocaleDateString()}`}</Text>
                    <Text style={informationTableLabel}>{`at ${homeTitle}`}</Text>
                    <Text style={informationTableLabel}>{`from ${homeAddress}`}</Text>
                    <Text style={informationTableLabel}>{`at rate of $${rate} per night.`}</Text>
                </Column>
                <Column>{`$${totalCharge}`}</Column>
            </Row>
          </Section>
          <Hr style={productPriceLine} />
          <Section align="right">
            <Row>
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal}>TOTAL</Text>
              </Column>
              <Column style={productPriceVerticalLine} />
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>{ `$${totalCharge}` }</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={productPriceLineBottom} />
          
          <Hr style={walletBottomLine} />
          <Text style={footerLinksWrapper}>
            <Link href="#">
              Terms of Sale
            </Link>{" "}
            •{" "}
            <Link href="#">
              Privacy Policy{" "}
            </Link>
          </Text>
          <Text style={footerCopyright}>
            {`Copyright © 2025 ${businessName}. `}<br />{" "}
            All rights reserved
          </Text>
          <Text style={footerCopyright}>{ businessAddress }</Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default ReceiptEmail;
  
  const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    backgroundColor: "#ffffff",
  };
  
  const resetText = {
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "660px",
    maxWidth: "100%",
  };
  
  const tableCell = { display: "table-cell" };
  
  const heading = {
    fontSize: "32px",
    fontWeight: "300",
    color: "#888888",
  };
  
  const informationTable = {
    borderCollapse: "collapse" as const,
    borderSpacing: "0px",
    color: "rgb(51,51,51)",
    backgroundColor: "rgb(250,250,250)",
    borderRadius: "3px",
    fontSize: "12px",
  };
  
  const informationTableRow = {
    height: "46px",
  };
  
  const informationTableColumn = {
    paddingLeft: "20px",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: "0px 1px 1px 0px",
    height: "44px",
  };
  
  const informationTableLabel = {
    ...resetText,
    color: "rgb(102,102,102)",
    fontSize: "10px",
  };
  
  const informationTableValue = {
    fontSize: "12px",
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
  };
  
  const productTitleTable = {
    ...informationTable,
    margin: "30px 0 15px 0",
    height: "24px",
  };
  
  const productsTitle = {
    background: "#fafafa",
    paddingLeft: "10px",
    fontSize: "14px",
    fontWeight: "500",
    margin: "0",
  };
  
  const productPriceTotal = {
    margin: "0",
    color: "rgb(102,102,102)",
    fontSize: "10px",
    fontWeight: "600",
    padding: "0px 30px 0px 0px",
    textAlign: "right" as const,
  };
  
  const productPriceLarge = {
    margin: "0px 20px 0px 0px",
    fontSize: "16px",
    fontWeight: "600",
    whiteSpace: "nowrap" as const,
    textAlign: "right" as const,
  };
  
  const productPriceLine = { margin: "30px 0 0 0" };
  
  const productPriceVerticalLine = {
    height: "48px",
    borderLeft: "1px solid",
    borderColor: "rgb(238,238,238)",
  };
  
  const productPriceLargeWrapper = { display: "table-cell", width: "90px" };
  
  const productPriceLineBottom = { margin: "0 0 75px 0" };
  
  const walletBottomLine = { margin: "65px 0 20px 0" };
  
  const footerLinksWrapper = {
    margin: "8px 0 0 0",
    textAlign: "center" as const,
    fontSize: "12px",
    color: "rgb(102,102,102)",
  };
  
  const footerCopyright = {
    margin: "25px 0 0 0",
    textAlign: "center" as const,
    fontSize: "12px",
    color: "rgb(102,102,102)",
  };
  