// Import React
import React from "react";
import "prismjs/themes/prism-coy.css";
import "./codeslide.css";
import CodeSlide from "spectacle-code-slide";
import PropTypes from "prop-types";


// Import Spectacle Core tags
import {
  Appear,
  Cite,
  CodePane,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#1F2022",
  quarternary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

class ClearCodePaneContext extends React.Component {
  getChildContext() {
    return {
      styles: {
        components: {
          codePane: null,
          syntax: null
        },
        prism: {
          light: null
        }
      }
    };
  }

  render() {
    return this.props.children;
  }
}

ClearCodePaneContext.childContextTypes = {
  styles: PropTypes.object
};

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transitionDuration={500} theme={theme}>
        <Slide>
          <Heading size={1} fit caps>
            100% Asynchrone
          </Heading>
          <Heading size={1} fit caps>
            0% Callback
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Moi</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Asynchrone ?</Heading>
        </Slide>
        <Slide>
          <Heading fit size={1}>Parallèle != Asynchrone</Heading>
          <Heading fit size={1}>Multi-Process != Asynchrone</Heading>
          <Heading fit size={1}>Multi-Thread != Asynchrone</Heading>
        </Slide>
        <Slide>
          <Heading fit size={1}>Async = Non-Bloquant</Heading>
          <Text size={6}>
            On ne veut pas attendre la réponse pour continuer à travailler.
          </Text>
        </Slide>
        <Slide>
          <Heading fit size={1}>Event Loop</Heading>
          <Text size={6}>
            Capture les appels asynchrone et envoie un evenement lors de leurs resolution.
          </Text>
        </Slide>
        <Slide>
          <Heading fit size={1}>Javascript n'est pas asynchrone</Heading>
          <Appear endValue order={1}><Heading fit size={1}>Mais NodeJS oui</Heading></Appear>
        </Slide>
        <Slide>
          <Heading size={2}>En PHP ?</Heading>
          <List start={2}>
            <ListItem>stream_set_blocking</ListItem>
            <ListItem>stream_select</ListItem>
            <ListItem>pcntl_async_signals (>= 7.1)</ListItem>
            <ListItem>Workers : RabbitMQ / Gearman / ...</ListItem>
            <ListItem>Ajax</ListItem>
            <ListItem>proc_exec (ou pas)</ListItem>
            <ListItem>No Event Loop</ListItem>
          </List>
        </Slide>
        <CodeSlide
          transition={[]}
          lang="php"
          fill
          className="codeslide"
          color="black"
          textSize="20"
          code={require("raw-loader!./event-loop.php")}
          ranges={[
            { loc: [0, 270], title: "PHP Event Loop" },
            { loc: [2, 3], title: "Registre" },
            { loc: [4, 5], title: "Function Asynchrone" },
            { loc: [5, 8], title: "Stream non bloquant" },
            { loc: [9, 15], title: "Watcher" },
            { loc: [17, 18], title: "Dispatch" },
            { loc: [18, 25], title: "Evenements" },
            { loc: [26, 32], title: "Dispatch" },
            { loc: [33, 36], title: "Loop" },
            { loc: [38, 46], title: "Utilisation" },
            // ...
          ]}
        />
        <Slide>
          <Heading size={1} fit caps>
            100% Asynchrone
          </Heading>
          <Heading size={1} fit caps>
            100% Callback
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Callback Hell</Heading>
          <ClearCodePaneContext>
            <CodePane
              textSize="20"
              lang="php"
              theme="external"
              source={`
<?php

sendRequestAsync($fooRequest, function ($response) {
    $barRequest = $response->data;

    sendRequestAsync($barRequest, function ($response) {
        $bazRequest = $response->data;

        sendRequestAsync($bazRequest, function ($response) {
            ...
        });
    });
});
          `}
            />
          </ClearCodePaneContext>
        </Slide>
        <Slide>
          <Heading size={2}>ReactPHP</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Promise</Heading>
        </Slide>
        <Slide>
          <Heading size={1} fit caps>
            100% Asynchrone
          </Heading>
          <Heading size={1} fit caps>
            50% Callback
          </Heading>
          <Heading size={1} fit caps>
            50% Promise
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Promise Hell</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Async / Await</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>AMP</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Yield</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Promise</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Librairies</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>HTTP-Server</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Benchmark</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Asynit</Heading>
        </Slide>
        <Slide>
          <Heading size={1} fit caps>
            100% Asynchrone
          </Heading>
          <Heading size={1} fit caps>
            0% Callback
          </Heading>
        </Slide>
        <Slide>
          <Heading size={1} fit caps>
            100% Asynchrone
          </Heading>
          <Heading size={1} fit caps>
            0% Callback
          </Heading>
          <Heading size={1} fit caps>
            50% Promise
          </Heading>
          <Heading size={1} fit caps>
            50% Yield
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Sync / Async API pas compatible</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>PSR7 Exemple</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Fiber : RFC PHP</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Coroutine LUA</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>No Callback / No Promise / No Await</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Sync / Async API Compatible</Heading>
        </Slide>
        <Slide>
          <Heading size={2}>PSR7 Exemple</Heading>
        </Slide>
        <Slide>
          <Heading size={1} fit caps>
            100% Asynchrone
          </Heading>
          <Heading size={1} fit caps>
            0% Callback
          </Heading>
          <Heading size={1} fit caps>
            0% Promise
          </Heading>
          <Heading size={1} fit caps>
            0% Yield
          </Heading>
        </Slide>
        <Slide>
          <Heading size={1} fit caps>
            100% Asynchrone
          </Heading>
          <Heading size={1} fit caps>
            100% Bonheur
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2}>Merci</Heading>
        </Slide>
      </Deck>
    );
  }
}
