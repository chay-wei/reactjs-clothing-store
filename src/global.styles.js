import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
	body {
        margin: 0;
        padding: 20px 40px;
        font-family: "Open Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        font-variation-settings: "wdth" 75;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }

    a {
        text-decoration: none;
        color: black;
    }

    * {
        box-sizing: border-box;
    }
`
