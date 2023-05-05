import React, { ReactNode } from "react"
import Head from "next/head"
import Footer from "./Footer"
import { Container } from "@chakra-ui/react"

type Props = {
  children?: ReactNode
  title: string
}

const Layout = ({ children, title }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container my={4}>{children}</Container>
    <Footer />
  </div>
)

export default Layout